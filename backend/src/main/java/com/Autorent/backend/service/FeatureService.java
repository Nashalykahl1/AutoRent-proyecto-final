package com.Autorent.backend.service;

import com.Autorent.backend.model.Feature;
import com.Autorent.backend.repository.FeatureRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FeatureService {

    private final FeatureRepository repository;

    public FeatureService(
            FeatureRepository repository
    ) {
        this.repository = repository;
    }

    public List<Feature> getAll() {

        return repository.findAll();

    }

    public Feature save(
            Feature feature
    ) {

        return repository.save(feature);

    }

    public void delete(Long id) {

        Feature feature =
                repository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Característica no encontrada"
                                )
                        );

        repository.delete(feature);

    }

    public Feature update(
            Long id,
            Feature updatedFeature
    ) {

        Feature feature =
                repository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Característica no encontrada"
                                )
                        );

        feature.setName(
                updatedFeature.getName()
        );

        feature.setIcon(
                updatedFeature.getIcon()
        );

        return repository.save(feature);

    }

}