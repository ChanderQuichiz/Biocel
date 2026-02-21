package com.biocel.ecommerce.controllers;

import com.biocel.ecommerce.services.OrderPdfService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/orders")
@CrossOrigin(origins = "http://localhost:5173")
public class OrderPdfController {

    private final OrderPdfService pdfService;

    public OrderPdfController(OrderPdfService pdfService) {
        this.pdfService = pdfService;
    }

    @GetMapping(value = "/{orderId}/pdf", produces = MediaType.APPLICATION_PDF_VALUE)
    public ResponseEntity<byte[]> downloadOrderPdf(@PathVariable int orderId) throws Exception {
        byte[] pdf = pdfService.buildOrderPdf(orderId);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=orden-" + orderId + ".pdf")
                .contentType(MediaType.APPLICATION_PDF)
                .body(pdf);
    }
}