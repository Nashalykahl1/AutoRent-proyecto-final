package com.Autorent.backend.controller;

import com.Autorent.backend.dto.FeatureDTO;
import com.Autorent.backend.model.Feature;
import com.Autorent.backend.service.FeatureService;
import jakarta.validation.Valid;
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
    public ResponseEntity<List<FeatureDTO>>
    getAll() {

        return ResponseEntity.ok(
                service.getAll()
        );

    }

    @PostMapping
    public ResponseEntity<FeatureDTO> save(
          @Valid @RequestBody Feature feature
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
    public ResponseEntity<FeatureDTO> update(

            @PathVariable Long id,

          @Valid  @RequestBody Feature feature

    ) {

        return ResponseEntity.ok(
                service.update(id, feature)
        );

    }

}