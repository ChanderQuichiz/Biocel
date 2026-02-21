package com.biocel.ecommerce.services;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.common.PDRectangle;
import org.apache.pdfbox.pdmodel.font.PDFont;
import org.apache.pdfbox.pdmodel.font.PDType1Font;
import org.apache.pdfbox.pdmodel.font.Standard14Fonts;
import org.springframework.stereotype.Service;

import java.awt.Color;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.math.BigDecimal;
import java.text.DecimalFormat;
import java.text.DecimalFormatSymbols;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

@Service
public class OrderPdfService {

    @PersistenceContext
    private EntityManager em;

    // ====== Layout A4 ======
    private static final float PAGE_W = PDRectangle.A4.getWidth();
    private static final float PAGE_H = PDRectangle.A4.getHeight();
    private static final float MARGIN = 28f;
    private static final float CONTENT_W = PAGE_W - (MARGIN * 2f);

    // ====== Colores (usar java.awt.Color evita error 0..1 de PDFBox) ======
    private static final Color C_BG = new Color(250, 250, 252);
    private static final Color C_BORDER = new Color(210, 214, 220);
    private static final Color C_TEXT = new Color(40, 40, 40);
    private static final Color C_MUTED = new Color(108, 117, 134);
    private static final Color C_BLUE = new Color(30, 82, 145);
    private static final Color C_HEADER_ROW = new Color(238, 241, 246);

    // ====== Formato moneda ======
    private static final DecimalFormat MONEY_FMT;
    static {
        DecimalFormatSymbols sym = new DecimalFormatSymbols(Locale.US);
        sym.setDecimalSeparator('.');
        sym.setGroupingSeparator(',');
        MONEY_FMT = new DecimalFormat("#,##0.00", sym);
    }

    public byte[] buildOrderPdf(int orderId) throws Exception {
        OrderHeader header = fetchOrderHeader(orderId);
        List<OrderItem> items = fetchOrderItems(orderId);

        int totalItems = items.stream().mapToInt(i -> i.quantity).sum();

        try (PDDocument doc = new PDDocument()) {
            PDPage page = new PDPage(PDRectangle.A4);
            doc.addPage(page);

            try (PDPageContentStream cs = new PDPageContentStream(doc, page)) {
                // Fondo blanco suave
                fillRect(cs, 0, 0, PAGE_W, PAGE_H, C_BG);

                PDFont fontRegular = new PDType1Font(Standard14Fonts.FontName.HELVETICA);
                PDFont fontBold = new PDType1Font(Standard14Fonts.FontName.HELVETICA_BOLD);

                float topY = PAGE_H - MARGIN; // top reference

                // 1) Header principal
                float headerH = 78f;
                drawMainHeader(cs, fontRegular, fontBold, MARGIN, topY, CONTENT_W, headerH, header.orderId);
                topY -= (headerH + 14f);

                // 2) Panel info
                float infoH = 128f;
                drawInfoPanel(cs, fontRegular, fontBold, MARGIN, topY, CONTENT_W, infoH, header, totalItems);
                topY -= (infoH + 18f);

                // 3) Tabla de items
                float rowH = 40f;
                int maxRows = 9; // simple y seguro para una sola página
                List<OrderItem> renderItems = items;
                if (items.size() > maxRows) {
                    renderItems = items.subList(0, maxRows);
                }

                float tableH = 32f + (renderItems.size() * rowH);
                drawItemsTable(cs, fontRegular, fontBold, MARGIN, topY, CONTENT_W, tableH, rowH, renderItems);
                topY -= (tableH + 16f);

                // 4) Caja total (alineada a la derecha)
                float totalsW = 250f;
                float totalsH = 82f;
                float totalsX = MARGIN + CONTENT_W - totalsW;
                drawTotalsBox(cs, fontRegular, fontBold, totalsX, topY, totalsW, totalsH, header.total);

                // Nota opcional si se truncaron filas
                if (items.size() > maxRows) {
                    text(cs, fontRegular, 9, C_MUTED, MARGIN, topY - totalsH - 14f,
                            "Nota: Se muestran los primeros " + maxRows + " ítems de " + items.size() + ".");
                }
            }

            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            doc.save(baos);
            return baos.toByteArray();
        }
    }

    // =========================================================
    // ====================== QUERIES ==========================
    // =========================================================

    private OrderHeader fetchOrderHeader(int orderId) {
        @SuppressWarnings("unchecked")
        List<Object[]> rows = em.createNativeQuery(
                "SELECT order_id, created_at, status, delivery_method, total " +
                "FROM orders WHERE order_id = ?"
        ).setParameter(1, orderId).getResultList();

        if (rows.isEmpty()) {
            throw new RuntimeException("Orden no encontrada: " + orderId);
        }

        Object[] r = rows.get(0);

        int id = toInt(r[0], 0);
        String createdAt = toText(r[1], "-");
        String status = toText(r[2], "-");
        String deliveryMethod = toText(r[3], "-");
        BigDecimal total = toBigDecimal(r[4]);

        return new OrderHeader(id, createdAt, status, deliveryMethod, total);
    }

    private List<OrderItem> fetchOrderItems(int orderId) {
        @SuppressWarnings("unchecked")
        List<Object[]> rows = em.createNativeQuery(
                "SELECT p.name, od.quantity, od.price, od.subtotal " +
                "FROM order_details od " +
                "JOIN products p ON p.product_id = od.product_id " +
                "WHERE od.order_id = ?"
        ).setParameter(1, orderId).getResultList();

        List<OrderItem> out = new ArrayList<>();
        for (Object[] r : rows) {
            String name = toText(r[0], "-");
            int qty = toInt(r[1], 0);
            BigDecimal price = toBigDecimal(r[2]);
            BigDecimal subtotal = toBigDecimal(r[3]);
            out.add(new OrderItem(name, qty, price, subtotal));
        }
        return out;
    }

    // =========================================================
    // ===================== DIBUJO PDF ========================
    // =========================================================

    private void drawMainHeader(PDPageContentStream cs, PDFont font, PDFont fontBold,
                                float x, float topY, float w, float h, int orderId) throws IOException {
        float y = topY - h;

        // Caja principal
        strokeRect(cs, x, y, w, h, C_BORDER, 1f);

        // Barra azul lateral
        fillRect(cs, x, y, 8f, h, C_BLUE);

        // Textos izquierda
        text(cs, fontBold, 20, C_TEXT, x + 16f, y + h - 30f, "BIOCEL - BOLETA DE COMPRA");
        text(cs, font, 10, C_MUTED, x + 16f, y + h - 52f, "Comprobante generado por el sistema");

        // Textos derecha (alineados a la derecha)
        String t1 = "Orden #" + orderId;
        String t2 = "Boleta de compra";

        rightText(cs, fontBold, 16, C_TEXT, x + w - 16f, y + h - 30f, t1);
        rightText(cs, font, 10, C_MUTED, x + w - 16f, y + h - 52f, t2);
    }

    private void drawInfoPanel(PDPageContentStream cs, PDFont font, PDFont fontBold,
                               float x, float topY, float w, float h,
                               OrderHeader header, int totalItems) throws IOException {
        float y = topY - h;

        strokeRect(cs, x, y, w, h, C_BORDER, 1f);

        float leftX = x + 20f;
        float leftValX = x + 120f;

        float rightX = x + (w / 2f) + 10f;
        float rightValX = rightX + 98f;

        float row1 = y + h - 32f;
        float row2 = y + h - 72f;
        float row3 = y + h - 112f;

        // Columna izquierda
        labelValue(cs, font, fontBold, leftX, leftValX, row1, "Fecha:", header.createdAt);
        labelValue(cs, font, fontBold, leftX, leftValX, row2, "Estado:", header.status);
        labelValue(cs, font, fontBold, leftX, leftValX, row3, "Método:", header.deliveryMethod);

        // Columna derecha
        labelValue(cs, font, fontBold, rightX, rightValX, row1, "Moneda:", "PEN");
        labelValue(cs, font, fontBold, rightX, rightValX, row2, "Ítems:", String.valueOf(totalItems));
        labelValue(cs, font, fontBold, rightX, rightValX, row3, "Total:", "S/ " + fmtMoney(header.total));
    }

    private void drawItemsTable(PDPageContentStream cs, PDFont font, PDFont fontBold,
                                float x, float topY, float w, float h, float rowH,
                                List<OrderItem> items) throws IOException {
        float y = topY - h;

        // Columnas
        float col1 = 330f; // Producto
        float col2 = 60f;  // Cant.
        float col3 = 95f;  // Precio
        float col4 = w - col1 - col2 - col3; // Subtotal

        // Caja externa
        strokeRect(cs, x, y, w, h, C_BORDER, 1f);

        // Header de tabla
        float headerH = 32f;
        fillRect(cs, x, y + h - headerH, w, headerH, C_HEADER_ROW);
        strokeLine(cs, x, y + h - headerH, x + w, y + h - headerH, C_BORDER, 1f);

        // Líneas verticales
        float x1 = x + col1;
        float x2 = x1 + col2;
        float x3 = x2 + col3;

        strokeLine(cs, x1, y, x1, y + h, C_BORDER, 1f);
        strokeLine(cs, x2, y, x2, y + h, C_BORDER, 1f);
        strokeLine(cs, x3, y, x3, y + h, C_BORDER, 1f);

        // Header texts
        text(cs, fontBold, 10, C_TEXT, x + 12f, y + h - 22f, "Producto");
        text(cs, fontBold, 10, C_TEXT, x1 + 12f, y + h - 22f, "Cant.");
        text(cs, fontBold, 10, C_TEXT, x2 + 12f, y + h - 22f, "Precio");
        text(cs, fontBold, 10, C_TEXT, x3 + 12f, y + h - 22f, "Subtotal");

        // Filas
        float currentTop = y + h - headerH;
        for (int i = 0; i < items.size(); i++) {
            OrderItem item = items.get(i);

            float rowTop = currentTop - (i * rowH);
            float rowBottom = rowTop - rowH;

            // Línea horizontal de fila
            strokeLine(cs, x, rowBottom, x + w, rowBottom, C_BORDER, 1f);

            String product = truncateToWidth(item.name, font, 9, col1 - 18f);
            text(cs, font, 9, C_TEXT, x + 12f, rowBottom + 14f, product);

            // Cantidad (left)
            text(cs, font, 9, C_TEXT, x1 + 12f, rowBottom + 14f, String.valueOf(item.quantity));

            // Precio y subtotal (right aligned)
            rightText(cs, font, 9, C_TEXT, x2 + col3 - 12f, rowBottom + 14f, fmtMoney(item.price));
            rightText(cs, fontBold, 9, C_TEXT, x3 + col4 - 12f, rowBottom + 14f, fmtMoney(item.subtotal));
        }
    }

    private void drawTotalsBox(PDPageContentStream cs, PDFont font, PDFont fontBold,
                               float x, float topY, float w, float h, BigDecimal total) throws IOException {
        float y = topY - h;

        strokeRect(cs, x, y, w, h, C_BORDER, 1f);

        float midY = y + (h / 2f);
        strokeLine(cs, x, midY, x + w, midY, C_BORDER, 1f);

        // Fila subtotal
        text(cs, font, 10, C_MUTED, x + 16f, y + h - 32f, "Subtotal");
        rightText(cs, font, 10, C_TEXT, x + w - 16f, y + h - 32f, "S/ " + fmtMoney(total));

        // Fila total
        text(cs, fontBold, 12, C_TEXT, x + 16f, y + 16f, "TOTAL");
        rightText(cs, fontBold, 12, C_TEXT, x + w - 16f, y + 16f, "S/ " + fmtMoney(total));
    }

    // =========================================================
    // =================== HELPERS DIBUJO ======================
    // =========================================================

    private void labelValue(PDPageContentStream cs, PDFont font, PDFont fontBold,
                            float labelX, float valueX, float y, String label, String value) throws IOException {
        text(cs, fontBold, 10, C_MUTED, labelX, y, label);
        text(cs, font, 10, C_TEXT, valueX, y, value == null ? "-" : value);
    }

    private void text(PDPageContentStream cs, PDFont font, float size, Color color,
                      float x, float y, String value) throws IOException {
        cs.beginText();
        cs.setFont(font, size);
        cs.setNonStrokingColor(color);
        cs.newLineAtOffset(x, y);
        cs.showText(safeText(value));
        cs.endText();
    }

    private void rightText(PDPageContentStream cs, PDFont font, float size, Color color,
                           float rightX, float y, String value) throws IOException {
        String txt = safeText(value);
        float width = stringWidth(font, size, txt);
        text(cs, font, size, color, rightX - width, y, txt);
    }

    private void fillRect(PDPageContentStream cs, float x, float y, float w, float h, Color color) throws IOException {
        cs.setNonStrokingColor(color);
        cs.addRect(x, y, w, h);
        cs.fill();
    }

    private void strokeRect(PDPageContentStream cs, float x, float y, float w, float h,
                            Color color, float lineWidth) throws IOException {
        cs.setStrokingColor(color);
        cs.setLineWidth(lineWidth);
        cs.addRect(x, y, w, h);
        cs.stroke();
    }

    private void strokeLine(PDPageContentStream cs, float x1, float y1, float x2, float y2,
                            Color color, float lineWidth) throws IOException {
        cs.setStrokingColor(color);
        cs.setLineWidth(lineWidth);
        cs.moveTo(x1, y1);
        cs.lineTo(x2, y2);
        cs.stroke();
    }

    // =========================================================
    // =================== HELPERS DATA ========================
    // =========================================================

    private String truncateToWidth(String text, PDFont font, float size, float maxWidth) throws IOException {
        if (text == null) return "-";
        String clean = safeText(text);

        if (stringWidth(font, size, clean) <= maxWidth) {
            return clean;
        }

        String ellipsis = "...";
        float ellipsisW = stringWidth(font, size, ellipsis);

        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < clean.length(); i++) {
            String candidate = sb.toString() + clean.charAt(i);
            float w = stringWidth(font, size, candidate);
            if (w + ellipsisW > maxWidth) {
                break;
            }
            sb.append(clean.charAt(i));
        }
        return sb + ellipsis;
    }

    private float stringWidth(PDFont font, float size, String text) throws IOException {
        if (text == null || text.isEmpty()) return 0f;
        return (font.getStringWidth(text) / 1000f) * size;
    }

    private String safeText(String s) {
        if (s == null) return "-";
        // Evita caracteres raros que rompen fuentes standard
        return s.replace("\n", " ")
                .replace("\r", " ")
                .replace("\t", " ")
                .trim();
    }

    private String toText(Object o, String fallback) {
        if (o == null) return fallback;
        String s = String.valueOf(o).trim();
        return s.isEmpty() ? fallback : s;
    }

    private int toInt(Object o, int fallback) {
        if (o == null) return fallback;
        if (o instanceof Number n) return n.intValue();
        try {
            return Integer.parseInt(String.valueOf(o));
        } catch (Exception e) {
            return fallback;
        }
    }

    private BigDecimal toBigDecimal(Object o) {
        if (o == null) return BigDecimal.ZERO;
        if (o instanceof BigDecimal bd) return bd;
        if (o instanceof Number n) return BigDecimal.valueOf(n.doubleValue());
        return new BigDecimal(String.valueOf(o));
    }

    private String fmtMoney(BigDecimal value) {
        if (value == null) return "0.00";
        return MONEY_FMT.format(value);
    }

    // =========================================================
    // ===================== DTO internos ======================
    // =========================================================

    private static class OrderHeader {
        final int orderId;
        final String createdAt;
        final String status;
        final String deliveryMethod;
        final BigDecimal total;

        OrderHeader(int orderId, String createdAt, String status, String deliveryMethod, BigDecimal total) {
            this.orderId = orderId;
            this.createdAt = createdAt;
            this.status = status;
            this.deliveryMethod = deliveryMethod;
            this.total = total;
        }
    }

    private static class OrderItem {
        final String name;
        final int quantity;
        final BigDecimal price;
        final BigDecimal subtotal;

        OrderItem(String name, int quantity, BigDecimal price, BigDecimal subtotal) {
            this.name = name;
            this.quantity = quantity;
            this.price = price;
            this.subtotal = subtotal;
        }
    }
}