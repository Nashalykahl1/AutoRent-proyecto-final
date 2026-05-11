package com.Autorent.backend.repository;

import com.Autorent.backend.model.Feature;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FeatureRepository
        extends JpaRepository<Feature, Long> {
}