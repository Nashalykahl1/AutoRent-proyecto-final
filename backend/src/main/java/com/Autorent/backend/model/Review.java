package com.Autorent.backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "El nombre es obligatorio")
    private String userName;

    @NotNull(message = "La puntuación es obligatoria")
    @Min(value = 1, message = "La puntuación mínima es 1")
    @Max(value = 5, message = "La puntuación máxima es 5")
    private Integer rating;

    @Column(columnDefinition = "TEXT")
    @NotBlank(message = "El comentario es obligatorio")
    @Size(min = 5, max = 500,
            message = "El comentario debe tener entre 5 y 500 caracteres")
    private String comment;

    @NotBlank(message = "La fecha es obligatoria")
    private String date;

    @ManyToOne
    @NotNull(message = "El producto es obligatorio")
    private Product product;

}