package com.biocel.ecommerce.services;

import com.biocel.ecommerce.repositories.OrderRepository;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.sf.jasperreports.engine.JasperCompileManager;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

@Service
public class OrderPdfService {
    @Autowired
    private OrderRepository orderRepository;

    public byte[] buildOrderPdf(int orderId) throws Exception {
        OrderHeaderData header = fetchOrderHeader(orderId);
        List<OrderItemData> items = fetchOrderItems(orderId);

        InputStream template = getClass().getResourceAsStream("/order-invoice.jrxml");
        JasperReport report = JasperCompileManager.compileReport(template);

        Map<String, Object> params = new HashMap<>();
        params.put("orderId", header.getOrderId());
        params.put("createdAt", header.getCreatedAt());
        params.put("status", header.getStatus());
        params.put("deliveryMethod", header.getDeliveryMethod());
        params.put("total", String.format(Locale.US, "S/ %,.2f", header.getTotal()));
        
        int totalItems = 0;
        for(OrderItemData item : items) {
            totalItems += item.getQuantity();
        }
        params.put("totalItems", totalItems);
        params.put("moneda", "PEN");

        JasperPrint print = JasperFillManager.fillReport(report, params, new JRBeanCollectionDataSource(items));

        ByteArrayOutputStream out = new ByteArrayOutputStream();
        JasperExportManager.exportReportToPdfStream(print, out);
        return out.toByteArray();
    }

    private OrderHeaderData fetchOrderHeader(int orderId) {
        List<Object[]> rows = orderRepository.findOrderHeaderById(orderId);
        if(rows.isEmpty()) {
            throw new RuntimeException("Orden no encontrada: " + orderId);
        }

        Object[] r = rows.get(0);
        return new OrderHeaderData(
                ((Number) r[0]).intValue(),
                String.valueOf(r[1]),
                String.valueOf(r[2]),
                String.valueOf(r[3]),
                (BigDecimal) r[4]
        );
    }

    private List<OrderItemData> fetchOrderItems(int orderId) {
        List<Object[]> rows = orderRepository.findOrderItemsByOrderId(orderId);
        List<OrderItemData> result = new ArrayList<>();
        for(Object[] r : rows) {
            result.add(new OrderItemData(
                    String.valueOf(r[0]),
                    ((Number) r[1]).intValue(),
                    (BigDecimal) r[2],
                    (BigDecimal) r[3]
            ));
        }
        return result;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class OrderHeaderData {
        private Integer orderId;
        private String createdAt;
        private String status;
        private String deliveryMethod;
        private BigDecimal total;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class OrderItemData {
        private String name;
        private Integer quantity;
        private BigDecimal price;
        private BigDecimal subtotal;

        public String getPriceFormatted() {
            return String.format(Locale.US, "S/ %,.2f", price);
        }

        public String getSubtotalFormatted() {
            return String.format(Locale.US, "S/ %,.2f", subtotal);
        }
    }
}