package com.Autorent.backend.repository;

import com.Autorent.backend.model.Favorite;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FavoriteRepository
        extends JpaRepository<Favorite, Long> {

    List<Favorite> findByUser_Id(Long userId);

}