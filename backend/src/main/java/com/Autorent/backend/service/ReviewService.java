package com.Autorent.backend.service;

import com.Autorent.backend.dto.ReviewDTO;
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

    private ReviewDTO toDTO(
            Review review
    ) {

        return new ReviewDTO(

                review.getId(),

                review.getUserName(),

                review.getRating(),

                review.getComment(),

                review.getDate(),

                review.getProduct().getId()

        );

    }
    public List<ReviewDTO> getByProduct(
            Long productId
    ) {

        return repository.findByProductId(
                productId)
                .stream()
                .map(this::toDTO)
                .toList();

    }

    public ReviewDTO save(
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

        Review saved =
                repository.save(review);

        return toDTO(saved);

    }

}

