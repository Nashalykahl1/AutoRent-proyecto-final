package com.Autorent.backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "La fecha de inicio es obligatoria")
    private String startDate;

    @NotBlank(message = "La fecha de fin es obligatoria")
    private String endDate;

    @ManyToOne
    @NotNull(message = "El usuario es obligatorio")
    private User user;

    @ManyToOne
    @NotNull(message = "El producto es obligatorio")
    @JoinColumn(name = "product_id")
    private Product product;
}