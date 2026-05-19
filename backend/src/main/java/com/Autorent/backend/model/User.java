package com.Autorent.backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "El nombre es obligatorio")
    private String name;

    @NotBlank(message = "El apellido es obligatorio")
    private String lastname;

    @Email(message = "Email inválido")
    @NotBlank(message = "El email es obligatorio")
    @Column(unique = true)
    private String email;

    @Size(
            min = 6,
            message = "La contraseña debe tener mínimo 6 caracteres"
    )
    private String password;

    private Boolean admin = false;

}