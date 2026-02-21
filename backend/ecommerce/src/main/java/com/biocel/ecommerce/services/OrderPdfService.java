package com.biocel.ecommerce.services;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.common.PDRectangle;
import org.apache.pdfbox.pdmodel.font.PDType1Font;
import org.apache.pdfbox.pdmodel.font.Standard14Fonts;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.math.BigDecimal;
import java.text.DecimalFormat;
import java.util.List;

@Service
public class OrderPdfService {

    @PersistenceContext
    private EntityManager em;

    public byte[] buildOrderPdf(int orderId) throws Exception {

        // CABECERA (orders) - ARREGLO MINIMO: evitar NoResultException
        @SuppressWarnings("unchecked")
        List<Object[]> orderRows = em.createNativeQuery(
                "SELECT order_id, created_at, status, delivery_method, total " +
                "FROM orders WHERE order_id = ?"
        ).setParameter(1, orderId).getResultList();

        if (orderRows.isEmpty()) {
            throw new RuntimeException("Orden no encontrada: " + orderId);
        }

        Object[] orderRow = orderRows.get(0);

        int id = ((Number) orderRow[0]).intValue();
        String createdAtText = (orderRow[1] == null) ? "-" : String.valueOf(orderRow[1]);
        String status = (orderRow[2] == null) ? "-" : String.valueOf(orderRow[2]);
        String deliveryMethod = (orderRow[3] == null) ? "-" : String.valueOf(orderRow[3]);

        BigDecimal total = (orderRow[4] instanceof BigDecimal)
                ? (BigDecimal) orderRow[4]
                : new BigDecimal(String.valueOf(orderRow[4]));

        // DETALLES (order_details + products) -> SOLO esa orden
        @SuppressWarnings("unchecked")
        List<Object[]> details = em.createNativeQuery(
                "SELECT p.name, od.quantity, od.price, od.subtotal " +
                "FROM order_details od " +
                "JOIN products p ON p.product_id = od.product_id " +
                "WHERE od.order_id = ?"
        ).setParameter(1, orderId).getResultList();

        DecimalFormat df = new DecimalFormat("0.00");

        // Fuentes PDFBox 3
        PDType1Font fontTitle = new PDType1Font(Standard14Fonts.FontName.HELVETICA_BOLD);
        PDType1Font fontBold  = new PDType1Font(Standard14Fonts.FontName.HELVETICA_BOLD);
        PDType1Font font      = new PDType1Font(Standard14Fonts.FontName.HELVETICA);

        try (PDDocument doc = new PDDocument()) {
            PDPage page = new PDPage(PDRectangle.A4);
            doc.addPage(page);

            try (PDPageContentStream cs = new PDPageContentStream(doc, page)) {
                float x = 50;
                float y = 780;

                cs.setFont(fontTitle, 16);
                y = line(cs, x, y, "BIOCEL - ORDEN DE COMPRA");

                cs.setFont(font, 11);
                y -= 10;

                y = line(cs, x, y, "Order ID: " + id);
                y = line(cs, x, y, "Fecha: " + createdAtText);
                y = line(cs, x, y, "Estado: " + status);
                y = line(cs, x, y, "Metodo: " + deliveryMethod);
                y = line(cs, x, y, "Total: PEN " + df.format(total));

                y -= 10;
                y = line(cs, x, y, "------------------------------------------------------------");

                cs.setFont(fontBold, 11);
                y = line(cs, x, y, "Producto                       Cant     Precio     Subtotal");

                cs.setFont(font, 11);

                for (Object[] d : details) {
                    String name = (d[0] == null) ? "-" : String.valueOf(d[0]);
                    int qty = ((Number) d[1]).intValue();

                    BigDecimal price = (d[2] instanceof BigDecimal) ? (BigDecimal) d[2] : new BigDecimal(String.valueOf(d[2]));
                    BigDecimal subtotal = (d[3] instanceof BigDecimal) ? (BigDecimal) d[3] : new BigDecimal(String.valueOf(d[3]));

                    if (name.length() > 28) name = name.substring(0, 28) + "...";

                    String row = String.format("%-30s %4d %10s %11s",
                            name, qty, df.format(price), df.format(subtotal)
                    );

                    y = line(cs, x, y, row);

                    if (y < 80) break; // simple para no complicar con multipágina
                }
            }

            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            doc.save(baos);
            return baos.toByteArray();
        }
    }

    private float line(PDPageContentStream cs, float x, float y, String text) throws Exception {
        cs.beginText();
        cs.newLineAtOffset(x, y);
        cs.showText(text);
        cs.endText();
        return y - 18;
    }
}