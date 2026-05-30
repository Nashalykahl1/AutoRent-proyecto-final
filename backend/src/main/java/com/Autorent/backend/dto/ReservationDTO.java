package com.Autorent.backend.dto;

public class ReservationDTO {

    private Long id;

    private String startDate;

    private String endDate;

    private Long userId;

    private Long productId;

    public ReservationDTO() {
    }

    public ReservationDTO(
            Long id,
            String startDate,
            String endDate,
            Long userId,
            Long productId
    ) {

        this.id = id;
        this.startDate = startDate;
        this.endDate = endDate;
        this.userId = userId;
        this.productId = productId;

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getStartDate() {
        return startDate;
    }

    public void setStartDate(
            String startDate
    ) {
        this.startDate = startDate;
    }

    public String getEndDate() {
        return endDate;
    }

    public void setEndDate(
            String endDate
    ) {
        this.endDate = endDate;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
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
