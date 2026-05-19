package com.Autorent.backend.service;

import com.Autorent.backend.dto.UserDTO;
import com.Autorent.backend.model.User;
import com.Autorent.backend.repository.UserRepository;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserRepository repository;

    private final BCryptPasswordEncoder passwordEncoder;

    public UserService(
            UserRepository repository,
            BCryptPasswordEncoder passwordEncoder
    ) {

        this.repository = repository;

        this.passwordEncoder = passwordEncoder;

    }

    private UserDTO toDTO(
            User user
    ) {

        UserDTO dto = new UserDTO();

        dto.setId(user.getId());

        dto.setName(user.getName());

        dto.setLastname(user.getLastname());

        dto.setEmail(user.getEmail());

        dto.setAdmin(user.getAdmin());

        return dto;

    }

    public List<User> getAll() {

        return repository.findAll();

    }

    public UserDTO register(
            User user
    ) {

        if(
                repository.findByEmail(
                        user.getEmail()
                ).isPresent()
        ) {

            throw new RuntimeException(
                    "El email ya está registrado"
            );

        }

        user.setPassword(
                passwordEncoder.encode(
                        user.getPassword()
                )
        );

        return toDTO(
                repository.save(user)
        );

    }

    public UserDTO login(
            String email,
            String password
    ) {

        User user =
                repository.findByEmail(email)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Usuario no encontrado"
                                )
                        );

        if(
                !passwordEncoder.matches(
                        password,
                        user.getPassword()
                )
        ) {

            throw new RuntimeException(
                    "Contraseña incorrecta"
            );

        }

        return toDTO(user);

    }

    public UserDTO update(
            Long id,
            User updatedUser
    ) {

        User user =
                repository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Usuario no encontrado"
                                )
                        );

        user.setName(
                updatedUser.getName()
        );

        user.setLastname(
                updatedUser.getLastname()
        );

        user.setEmail(
                updatedUser.getEmail()
        );

        user.setPassword(
                passwordEncoder.encode(
                        updatedUser.getPassword()
                )
        );

        user.setAdmin(
                updatedUser.getAdmin()
        );

        return toDTO(
                repository.save(user)
        );

    }

}