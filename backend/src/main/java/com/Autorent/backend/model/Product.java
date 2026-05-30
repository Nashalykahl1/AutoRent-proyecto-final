package com.Autorent.backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
@Entity
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "El nombre es obligatorio")
    @Size(min = 2, max = 50,
            message = "El nombre debe tener entre 2 y 50 caracteres")
    private String name;

    @NotBlank(message = "La descripción es obligatoria")
    private String description;

    @NotBlank(message = "La imagen es obligatoria")
    private String image;

    @NotNull(message = "El precio es obligatorio")
    @Positive(message = "El precio debe ser positivo")
    private Double price;

    @NotBlank(message = "La ubicación es obligatoria")
    private String location;

    @Column(columnDefinition = "TEXT")
    @NotBlank(message = "La descripción larga es obligatoria")
    private String longDescription;

    @ElementCollection
    private List<String> images;

    private Boolean recommended;

    @ManyToMany
    private List<Feature> features;

    @ManyToOne
    @JoinColumn(name = "category_id")
    @NotNull(message = "La categoría es obligatoria")
    private Category category;

}