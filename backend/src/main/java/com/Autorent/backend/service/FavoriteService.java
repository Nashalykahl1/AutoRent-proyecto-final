package com.Autorent.backend.service;

import com.Autorent.backend.model.Favorite;
import com.Autorent.backend.repository.FavoriteRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FavoriteService {

    private final FavoriteRepository repository;

    public FavoriteService(
            FavoriteRepository repository
    ) {
        this.repository = repository;
    }

    public List<Favorite> getByUser(
            Long userId
    ) {

        return repository.findByUserId(
                userId
        );

    }

    public Favorite save(
            Favorite favorite
    ) {

        return repository.save(
                favorite
        );

    }

    public void delete(Long id) {

        Favorite favorite =
                repository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Favorito no encontrado"
                                )
                        );

        repository.delete(favorite);

    }

}