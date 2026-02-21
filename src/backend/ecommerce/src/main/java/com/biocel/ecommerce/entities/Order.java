package com.biocel.ecommerce.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "orders")
public class Order {

    public enum Status { pending, preparing, out_for_delivery, delivered, postponed }
    public enum DeliveryMethod { pickup, delivery }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_id")
    private Integer orderId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", length = 30, insertable = false)
    private Status status = Status.pending;

    @Enumerated(EnumType.STRING)
    @Column(name = "delivery_method", length = 20)
    private DeliveryMethod deliveryMethod = DeliveryMethod.pickup;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "address_id")
    private Address address;

    @Column(name = "total", nullable = false)
    private Double total;

    @Column(name = "discount")
    private Double discount = 0.0;

    @Column(name = "estimated_delivery")
    private LocalDateTime estimatedDelivery;

    @Column(name = "created_at", insertable = false, updatable = false)
    private LocalDateTime createdAt;

}
