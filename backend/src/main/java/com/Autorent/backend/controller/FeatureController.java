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
    public ResponseEntity<Feature> save(
            @RequestBody Feature feature
    ) {

        return ResponseEntity.ok(
                service.save(feature)
        );

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(
            @PathVariable Long id
    ) {

        service.delete(id);

        return ResponseEntity.ok(
                "Característica eliminada"
        );

    }
    @PutMapping("/{id}")
    public ResponseEntity<Feature> update(

            @PathVariable Long id,

            @RequestBody Feature feature

    ) {

        return ResponseEntity.ok(
                service.update(id, feature)
        );

    }

}