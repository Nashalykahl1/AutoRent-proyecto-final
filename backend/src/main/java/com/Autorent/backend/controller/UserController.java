package com.Autorent.backend.controller;

import com.Autorent.backend.dto.UserDTO;
import com.Autorent.backend.model.User;
import com.Autorent.backend.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    private final UserService service;

    public UserController(
            UserService service
    ) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<User>>
    getAll() {

        return ResponseEntity.ok(
                service.getAll()
        );

    }

    @PostMapping("/register")
    public ResponseEntity<?> register(
            @Valid @RequestBody User user
    ) {

        try {

            UserDTO dto =
                    service.register(user);

            return ResponseEntity.ok(dto);

        } catch (RuntimeException e) {

            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());

        }

    }

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody Map<String, String> body
    ) {

        try {

            UserDTO dto =
                    service.login(
                            body.get("email"),
                            body.get("password")
                    );

            return ResponseEntity.ok(dto);

        } catch (RuntimeException e) {

            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());

        }

    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(

            @PathVariable Long id,

            @Valid @RequestBody User user

    ) {

        try {

            UserDTO dto =
                    service.update(id, user);

            return ResponseEntity.ok(dto);

        } catch (RuntimeException e) {

            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());

        }

    }

}