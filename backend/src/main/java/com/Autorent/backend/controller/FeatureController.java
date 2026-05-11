package com.Autorent.backend.controller;

import com.Autorent.backend.model.Feature;
import com.Autorent.backend.service.FeatureService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/features")
@CrossOrigin("*")
public class FeatureController {

    private final FeatureService service;

    public FeatureController(
            FeatureService service
    ) {
        this.service = service;
    }

    @GetMapping
    public List<Feature> getAll() {
        return service.getAll();
    }

    @PostMapping
    public Feature save(
            @RequestBody Feature feature
    ) {
        return service.save(feature);
    }

    @DeleteMapping("/{id}")
    public void delete(
            @PathVariable Long id
    ) {

        service.delete(id);

    }

    @PutMapping("/{id}")
    public Feature update(

            @PathVariable Long id,

            @RequestBody Feature feature

    ) {

        return service.update(id, feature);

    }
}