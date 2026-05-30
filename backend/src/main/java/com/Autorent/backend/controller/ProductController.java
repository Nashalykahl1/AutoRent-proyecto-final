package com.Autorent.backend.controller;

import com.Autorent.backend.dto.ProductDTO;
import com.Autorent.backend.model.Product;
import com.Autorent.backend.service.ProductService;
import jakarta.validation.Valid;
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
    public ResponseEntity<List<ProductDTO>>
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
    public ResponseEntity<ProductDTO> getById(
            @PathVariable Long id
    ) {

        return ResponseEntity.ok(
                service.findById(id)
        );

    }

    @GetMapping("/recommended")
    public ResponseEntity<List<Product>>
    getRecommended() {

        return ResponseEntity.ok(
                service.getRecommended()
        );

    }

    @PostMapping
    public ResponseEntity<Product> create(
            @Valid @RequestBody Product p
    ) {

        return ResponseEntity.ok(
                service.save(p)
        );

    }

    @PutMapping("/{id}")
    public ResponseEntity<Product> update(

            @PathVariable Long id,

            @Valid @RequestBody Product p

    ) {

        p.setId(id);

        return ResponseEntity.ok(
                service.save(p)
        );

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(
            @PathVariable Long id
    ) {

        service.delete(id);

        return ResponseEntity.ok(
                "Producto eliminado"
        );

    }

}