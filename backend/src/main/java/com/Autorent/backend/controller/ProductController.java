package com.Autorent.backend.controller;

import com.Autorent.backend.model.Product;
import com.Autorent.backend.service.ProductService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/products")
@CrossOrigin(origins = "*")
public class ProductController {

    private final ProductService service;

    public ProductController(ProductService service) {
        this.service = service;
    }

    @GetMapping
    public List<Product> getAll() {
        return service.getAll();
    }

    @GetMapping("/random")
    public List<Product> getRandom() {
        return service.getRandom();
    }

    @GetMapping("/{id}") // ✅ ESTE ES EL IMPORTANTE
    public Product getById(@PathVariable Long id) {
        return service.findById(id);
    }
    @GetMapping("/recommended")
    public List<Product> getRecommended() {
        return service.getRecommended();
    }

    @PostMapping
    public Product create(@RequestBody Product p) {
        return service.save(p);
    }

    @PutMapping("/{id}")
    public Product update(@PathVariable Long id, @RequestBody Product p) {
        p.setId(id);
        return service.save(p);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }

}