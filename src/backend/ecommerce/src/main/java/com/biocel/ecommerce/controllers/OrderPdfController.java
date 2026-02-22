package com.biocel.ecommerce.controllers;

import com.biocel.ecommerce.services.OrderPdfService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.charset.StandardCharsets;

@RestController
@RequestMapping("/orders")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
public class OrderPdfController {

    private final OrderPdfService pdfService;

    public OrderPdfController(OrderPdfService pdfService) {
        this.pdfService = pdfService;
    }

    @GetMapping(value = "/{orderId}/pdf")
    public ResponseEntity<?> downloadOrderPdf(@PathVariable int orderId) {
        try {
            byte[] pdf = pdfService.buildOrderPdf(orderId);

            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=orden-" + orderId + ".pdf")
                    .contentType(MediaType.APPLICATION_PDF)
                    .body(pdf);

        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                    .contentType(new MediaType("text", "plain", StandardCharsets.UTF_8))
                    .body("No se pudo generar el PDF: " + e.getMessage());

        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .contentType(new MediaType("text", "plain", StandardCharsets.UTF_8))
                    .body("Error interno al generar PDF: " + e.getMessage());
        }
    }
}