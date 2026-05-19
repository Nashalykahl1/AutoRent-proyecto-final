package com.Autorent.backend.controller;

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
    public ResponseEntity<List<Favorite>>
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

        try {

            return ResponseEntity.ok(
                    service.save(favorite)
            );

        } catch (RuntimeException e) {

            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());

        }

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(
            @PathVariable Long id
    ) {

        try {

            service.delete(id);

            return ResponseEntity.ok(
                    "Favorito eliminado"
            );

        } catch (RuntimeException e) {

            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());

        }

    }

}