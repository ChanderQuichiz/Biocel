package com.biocel.ecommerce.entities;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderTransaction {
    private String paymentMethod;
    private List<OrderDetail> details;
    private Order order;
}
