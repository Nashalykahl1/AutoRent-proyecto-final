package com.Autorent.backend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String userName;

    private Integer rating;

    @Column(columnDefinition = "TEXT")
    private String comment;

    private String date;

    @ManyToOne
    private Product product;
}