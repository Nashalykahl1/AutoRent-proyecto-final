package com.Autorent.backend.repository;

import com.Autorent.backend.model.Reservation;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReservationRepository
        extends JpaRepository<Reservation, Long> {

    List<Reservation> findByUserId(
            Long userId
    );

}