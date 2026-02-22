package com.biocel.ecommerce.services;

import com.biocel.ecommerce.repositories.OrderDetailRepository;
import com.biocel.ecommerce.repositories.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ReportService {
    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private OrderDetailRepository orderDetailRepository;

    public Map<String, Object> summary() {
        BigDecimal revenue = orderRepository.getTotalRevenue();
        long orders = orderRepository.count();
        long items = orderDetailRepository.getTotalItemsCount();
        long customers = orderRepository.countDistinctCustomers();
        
        BigDecimal avg = BigDecimal.ZERO;
        if(orders > 0) {
            avg = revenue.divide(BigDecimal.valueOf(orders), 2, RoundingMode.HALF_UP);
        }
        
        Map<String, Object> result = new HashMap<>();
        result.put("totalRevenue", revenue);
        result.put("totalOrders", orders);
        result.put("totalItems", items);
        result.put("totalCustomers", customers);
        result.put("avgTicket", avg);
        return result;
    }

    public List<Map<String, Object>> topProducts(int limit) {
        List<Object[]> rows = orderRepository.findTopProducts(limit);
        List<Map<String, Object>> result = new ArrayList<>();
        for(Object[] r : rows) {
            Map<String, Object> product = new HashMap<>();
            product.put("productId", ((Number) r[0]).intValue());
            product.put("name", String.valueOf(r[1]));
            product.put("units", ((Number) r[2]).longValue());
            product.put("revenue", (BigDecimal) r[3]);
            result.add(product);
        }
        return result;
    }

    public List<Map<String, Object>> salesLastDays(int days) {
        int d = Math.max(1, Math.min(days, 365));
        List<Object[]> rows = orderRepository.findSalesLastDays(d);
        List<Map<String, Object>> result = new ArrayList<>();
        for(Object[] r : rows) {
            Map<String, Object> point = new HashMap<>();
            if(r[0] instanceof java.sql.Date) {
                point.put("day", ((java.sql.Date) r[0]).toLocalDate().toString());
            } else {
                point.put("day", LocalDate.parse(String.valueOf(r[0])).toString());
            }
            point.put("total", (BigDecimal) r[1]);
            result.add(point);
        }
        return result;
    }
}