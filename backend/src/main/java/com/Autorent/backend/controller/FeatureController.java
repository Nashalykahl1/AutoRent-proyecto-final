package com.Autorent.backend.controller;

import com.Autorent.backend.model.Feature;
import com.Autorent.backend.service.FeatureService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/features")
@CrossOrigin(origins = "http://localhost:3000")
public class FeatureController {

    private final FeatureService service;

    public FeatureController(
            FeatureService service
    ) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<Feature>>
    getAll() {

        return ResponseEntity.ok(
                service.getAll()
        );

    }

    @PostMapping
    public ResponseEntity<?> save(
            @RequestBody Feature feature
    ) {

        try {

            return ResponseEntity.ok(
                    service.save(feature)
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
                    "Característica eliminada"
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

            @RequestBody Feature feature

    ) {

        try {

            return ResponseEntity.ok(
                    service.update(id, feature)
            );

        } catch (RuntimeException e) {

            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());

        }

    }

}