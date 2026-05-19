package com.Autorent.backend.model;

import jakarta.persistence.*;
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

    private String name;

    private String description;

    private String image;

    private Double price;

    private String location;

    @Column(columnDefinition = "TEXT")
    private String longDescription;

    @ElementCollection
    private List<String> images;

    private Boolean recommended;

    @ManyToMany
    private List<Feature> features;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

}
