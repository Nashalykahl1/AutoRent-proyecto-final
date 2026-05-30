package com.Autorent.backend.dto;

import com.Autorent.backend.model.Feature;

import java.util.List;

public class ProductDTO {


    private Long id;

    private String name;

    private String description;

    private Double price;

    private String image;

    private String location;

    private List<String> images;

    private List<Feature> features;

    private String categoryName;

    private Long categoryId;

    private String longDescription;

    public ProductDTO() {
    }

    public ProductDTO(
            Long id,
            String name,
            String description,
            Double price,
            String image,
            String location,
            List<String> images,
             List<Feature> features,
            Long categoryId,
            String categoryName,
            String longDescription
    ) {

        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.image = image;
        this.location = location;
        this.images = images;
        this.features = features;
        this.categoryId = categoryId;
        this.categoryName = categoryName;
        this.longDescription = longDescription;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(
            String description
    ) {
        this.description = description;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(
            String location
    ) {
        this.location = location;
    }

    public List<String> getImages() {
        return images;
    }

    public void setImages(List<String> images) {
        this.images = images;
    }

    public List<Feature> getFeatures() {
        return features;
    }

    public void setFeatures(List<Feature> features) {
        this.features = features;
    }

    public Long getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Long categoryId) {
        this.categoryId = categoryId;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public String getLongDescription() {
        return longDescription;
    }

    public void setLongDescription(String longDescription) {
        this.longDescription = longDescription;
    }

}