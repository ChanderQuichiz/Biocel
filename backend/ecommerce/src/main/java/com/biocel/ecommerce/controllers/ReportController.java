package com.biocel.ecommerce.controllers;

import com.biocel.ecommerce.services.ReportService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reports")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
public class ReportController {

    private final ReportService reportService;

    public ReportController(ReportService reportService) {
        this.reportService = reportService;
    }

    @GetMapping("/summary")
    public ReportService.Summary summary() {
        return reportService.summary();
    }

    @GetMapping("/top-products")
    public List<ReportService.TopProduct> topProducts(
            @RequestParam(defaultValue = "5") int limit
    ) {
        int safeLimit = Math.max(1, Math.min(limit, 20));
        return reportService.topProducts(safeLimit);
    }

    @GetMapping("/sales")
    public List<ReportService.SalesPoint> sales(
            @RequestParam(defaultValue = "30") int days
    ) {
        return reportService.salesLastDays(days);
    }
}