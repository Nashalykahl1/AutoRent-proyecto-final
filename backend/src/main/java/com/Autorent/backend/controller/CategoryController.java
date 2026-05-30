package com.Autorent.backend.controller;

import com.Autorent.backend.model.Category;
import com.Autorent.backend.service.CategoryService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categories")
@CrossOrigin(origins = "http://localhost:3000")
public class CategoryController {

    private final CategoryService service;

    public CategoryController(
            CategoryService service
    ) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<Category>> getAll() {

        return ResponseEntity.ok(
                service.getAll()
        );

    }

    @PostMapping
    public ResponseEntity<Category> save(
            @Valid @RequestBody Category category
    ) {

        return ResponseEntity.ok(
                service.save(category)
        );

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(
            @PathVariable Long id
    ) {

        service.delete(id);

        return ResponseEntity.ok(
                "Categoría eliminada"
        );

    }

}