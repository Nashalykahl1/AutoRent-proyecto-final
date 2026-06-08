package com.Autorent.backend.service;

import com.Autorent.backend.dto.FeatureDTO;
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

    private FeatureDTO toDTO(
            Feature feature
    ) {

        return new FeatureDTO(
                feature.getId(),
                feature.getName(),
                feature.getIcon()
        );

    }

    public List<FeatureDTO> getAll() {

        return repository.findAll()
                .stream()
                .map(this::toDTO)
                .toList();

    }

    public FeatureDTO save(
            Feature feature
    ) {

        return toDTO(
                repository.save(feature)
);
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

    public FeatureDTO update(
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

        return  toDTO (repository.save(feature)
);
    }

}