package com.biocel.ecommerce.services;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class ReportService {

    @PersistenceContext
    private EntityManager em;

    public Summary summary() {
        BigDecimal totalRevenue = (BigDecimal) em.createNativeQuery(
                "SELECT COALESCE(SUM(o.total), 0) FROM orders o"
        ).getSingleResult();

        Number totalOrdersN = (Number) em.createNativeQuery(
                "SELECT COUNT(*) FROM orders"
        ).getSingleResult();
        long totalOrders = totalOrdersN.longValue();

        Number totalItemsN = (Number) em.createNativeQuery(
                "SELECT COALESCE(SUM(od.quantity), 0) FROM order_details od"
        ).getSingleResult();
        long totalItems = totalItemsN.longValue();

        Number totalCustomersN = (Number) em.createNativeQuery(
                "SELECT COALESCE(COUNT(DISTINCT o.user_id), 0) FROM orders o"
        ).getSingleResult();
        long totalCustomers = totalCustomersN.longValue();

        BigDecimal avgTicket = BigDecimal.ZERO;
        if (totalOrders > 0) {
            avgTicket = totalRevenue.divide(BigDecimal.valueOf(totalOrders), 2, RoundingMode.HALF_UP);
        }

        return new Summary(totalRevenue, totalOrders, totalItems, totalCustomers, avgTicket);
    }

    public List<TopProduct> topProducts(int limit) {
        @SuppressWarnings("unchecked")
        List<Object[]> rows = em.createNativeQuery(
                "SELECT p.product_id, p.name, " +
                        "COALESCE(SUM(od.quantity), 0) AS units, " +
                        "COALESCE(SUM(od.subtotal), 0) AS revenue " +
                        "FROM order_details od " +
                        "JOIN products p ON p.product_id = od.product_id " +
                        "GROUP BY p.product_id, p.name " +
                        "ORDER BY SUM(od.quantity) DESC"
        ).setMaxResults(limit).getResultList();

        List<TopProduct> out = new ArrayList<>();
        for (Object[] r : rows) {
            Integer productId = ((Number) r[0]).intValue();
            String name = String.valueOf(r[1]);
            long units = ((Number) r[2]).longValue();
            BigDecimal revenue = (r[3] instanceof BigDecimal)
                    ? (BigDecimal) r[3]
                    : new BigDecimal(String.valueOf(r[3]));
            out.add(new TopProduct(productId, name, units, revenue));
        }
        return out;
    }

    public List<SalesPoint> salesLastDays(int days) {
        int safeDays = Math.max(1, Math.min(days, 365));

        // OJO: evitamos parameter en INTERVAL por compatibilidad => insertamos safeDays (controlado)
        String sql =
                "SELECT DATE(o.created_at) AS day, COALESCE(SUM(o.total), 0) AS total " +
                        "FROM orders o " +
                        "WHERE o.created_at >= DATE_SUB(CURDATE(), INTERVAL " + safeDays + " DAY) " +
                        "GROUP BY DATE(o.created_at) " +
                        "ORDER BY day ASC";

        @SuppressWarnings("unchecked")
        List<Object[]> rows = em.createNativeQuery(sql).getResultList();

        List<SalesPoint> out = new ArrayList<>();
        for (Object[] r : rows) {

            //  soporta LocalDate / java.sql.Date / Timestamp (evita ClassCastException)
            Object dayObj = r[0];
            LocalDate day;
            if (dayObj instanceof LocalDate ld) {
                day = ld;
            } else if (dayObj instanceof java.sql.Date d) {
                day = d.toLocalDate();
            } else if (dayObj instanceof java.sql.Timestamp ts) {
                day = ts.toLocalDateTime().toLocalDate();
            } else {
                day = LocalDate.parse(String.valueOf(dayObj)); // fallback
            }

            BigDecimal total = (r[1] instanceof BigDecimal)
                    ? (BigDecimal) r[1]
                    : new BigDecimal(String.valueOf(r[1]));

            out.add(new SalesPoint(day.toString(), total));
        }
        return out;
    }

    public record Summary(
            BigDecimal totalRevenue,
            long totalOrders,
            long totalItems,
            long totalCustomers,
            BigDecimal avgTicket
    ) {}

    public record TopProduct(
            Integer productId,
            String name,
            long units,
            BigDecimal revenue
    ) {}

    public record SalesPoint(
            String day,
            BigDecimal total
    ) {}
}