package com.Autorent.backend.controller;

import com.Autorent.backend.model.Review;
import com.Autorent.backend.service.ReviewService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reviews")
@CrossOrigin(origins = "http://localhost:3000")
public class ReviewController {

    private final ReviewService service;

    public ReviewController(
            ReviewService service
    ) {
        this.service = service;
    }

    @GetMapping("/{productId}")
    public ResponseEntity<List<Review>>
    getReviews(
            @PathVariable Long productId
    ) {

        return ResponseEntity.ok(
                service.getByProduct(productId)
        );

    }

    @PostMapping
    public ResponseEntity<?> saveReview(
            @RequestBody Review review
    ) {

        try {

            return ResponseEntity.ok(
                    service.save(review)
            );

        } catch (RuntimeException e) {

            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());

        }

    }

}