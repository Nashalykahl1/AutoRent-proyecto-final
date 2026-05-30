package com.Autorent.backend.dto;

public class ReviewDTO {

    private Long id;

    private String userName;

    private Integer rating;

    private String comment;

    private String date;

    private Long productId;

    public ReviewDTO() {
    }

    public ReviewDTO(
            Long id,
            String userName,
            Integer rating,
            String comment,
            String date,
            Long productId
    ) {

        this.id = id;
        this.userName = userName;
        this.rating = rating;
        this.comment = comment;
        this.date = date;
        this.productId = productId;

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(
            String userName
    ) {
        this.userName = userName;
    }

    public Integer getRating() {
        return rating;
    }

    public void setRating(
            Integer rating
    ) {
        this.rating = rating;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(
            String comment
    ) {
        this.comment = comment;
    }

    public String getDate() {
        return date;
    }

    public void setDate(
            String date
    ) {
        this.date = date;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(
            Long productId
    ) {
        this.productId = productId;
    }

}