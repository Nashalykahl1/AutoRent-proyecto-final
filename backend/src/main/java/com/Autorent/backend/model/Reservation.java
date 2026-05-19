package com.Autorent.backend.model;

import jakarta.persistence.*;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String startDate;

    private String endDate;

    @ManyToOne
    private User user;

    @ManyToOne
    private Product product;

}
