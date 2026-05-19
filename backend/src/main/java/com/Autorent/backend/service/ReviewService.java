package com.Autorent.backend.service;

import com.Autorent.backend.model.Review;
import com.Autorent.backend.repository.ReviewRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewService {

    private final ReviewRepository repository;

    public ReviewService(
            ReviewRepository repository
    ) {
        this.repository = repository;
    }

    public List<Review> getByProduct(
            Long productId
    ) {

        return repository.findByProductId(
                productId
        );

    }

    public Review save(
            Review review
    ) {

        if(
                review.getComment() == null ||
                        review.getComment().isBlank()
        ) {

            throw new RuntimeException(
                    "La reseña no puede estar vacía"
            );

        }

        return repository.save(
                review
        );

    }

}