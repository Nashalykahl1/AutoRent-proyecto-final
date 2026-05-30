package com.Autorent.backend.service;

import com.Autorent.backend.dto.FavoriteDTO;
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
    private FavoriteDTO toDTO(
            Favorite favorite
    ) {

        return new FavoriteDTO(

                favorite.getId(),

                favorite.getUser().getId(),

                favorite.getProduct().getId()

        );

    }

    public List<FavoriteDTO> getByUser(Long userId) {

        List<Favorite> favorites =
                repository.findByUser_Id(userId);

        favorites.forEach(f -> {
            System.out.println("FAVORITO " + f.getId());

            if (f.getProduct() == null) {
                System.out.println("PRODUCTO NULL");
            } else {
                System.out.println("PRODUCTO ID = "
                        + f.getProduct().getId());
            }
        });
        return favorites.stream()
                .map(this::toDTO)
                .toList();
    }

    public FavoriteDTO save(
            Favorite favorite
    ) {
        System.out.println(favorite.getProduct());
        System.out.println(favorite.getUser());
        Favorite saved =
                repository.save(favorite);

        return toDTO(saved);

    }public void delete(Long id) {

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