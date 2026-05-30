package com.Autorent.backend.controller;

import com.Autorent.backend.dto.FavoriteDTO;
import com.Autorent.backend.model.Favorite;
import com.Autorent.backend.service.FavoriteService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/favorites")
@CrossOrigin(origins = "http://localhost:3000")
public class FavoriteController {

    private final FavoriteService service;

    public FavoriteController(
            FavoriteService service
    ) {
        this.service = service;
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<FavoriteDTO>>
    getFavorites(
            @PathVariable Long userId
    ) {

        return ResponseEntity.ok(
                service.getByUser(userId)
        );

    }
    @PostMapping
    public ResponseEntity<?> save(
            @RequestBody Favorite favorite
    ) {

        System.out.println(favorite.getUser());
        System.out.println(favorite.getProduct());

        return ResponseEntity.ok(
                service.save(favorite)
        );

    }
    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(
            @PathVariable Long id
    ) {

        service.delete(id);

        return ResponseEntity.ok(
                "Favorito eliminado"
        );

    }



}