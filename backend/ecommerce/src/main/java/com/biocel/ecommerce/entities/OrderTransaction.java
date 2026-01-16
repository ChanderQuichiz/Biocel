package com.biocel.ecommerce.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderTransaction {
    private String paymentMethod;
    private String details;
    private Order order;
}
