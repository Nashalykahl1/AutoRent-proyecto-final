package com.Autorent.backend.repository;

import com.Autorent.backend.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewRepository
        extends JpaRepository<Review, Long> {

    List<Review> findByProductId(Long productId);

}