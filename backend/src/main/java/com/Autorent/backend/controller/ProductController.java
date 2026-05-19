package com.Autorent.backend.controller;

import com.Autorent.backend.model.Product;
import com.Autorent.backend.service.ProductService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/products")
@CrossOrigin(origins = "http://localhost:3000")
public class ProductController {

    private final ProductService service;

    public ProductController(
            ProductService service
    ) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<Product>>
    getAll() {

        return ResponseEntity.ok(
                service.getAll()
        );

    }

    @GetMapping("/random")
    public ResponseEntity<List<Product>>
    getRandom() {

        return ResponseEntity.ok(
                service.getRandom()
        );

    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(
            @PathVariable Long id
    ) {

        try {

            return ResponseEntity.ok(
                    service.findById(id)
            );

        } catch (RuntimeException e) {

            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());

        }

    }

    @GetMapping("/recommended")
    public ResponseEntity<List<Product>>
    getRecommended() {

        return ResponseEntity.ok(
                service.getRecommended()
        );

    }

    @PostMapping
    public ResponseEntity<?> create(
            @RequestBody Product p
    ) {

        try {

            return ResponseEntity.ok(
                    service.save(p)
            );

        } catch (RuntimeException e) {

            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());

        }

    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(

            @PathVariable Long id,

            @RequestBody Product p

    ) {

        try {

            p.setId(id);

            return ResponseEntity.ok(
                    service.save(p)
            );

        } catch (RuntimeException e) {

            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());

        }

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(
            @PathVariable Long id
    ) {

        try {

            service.delete(id);

            return ResponseEntity.ok(
                    "Producto eliminado"
            );

        } catch (RuntimeException e) {

            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());

        }

    }

}