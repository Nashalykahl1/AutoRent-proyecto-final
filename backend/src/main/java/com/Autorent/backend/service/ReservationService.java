package com.Autorent.backend.service;

import com.Autorent.backend.model.Reservation;

import com.Autorent.backend.repository.ReservationRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReservationService {

    private final ReservationRepository repository;

    public ReservationService(
            ReservationRepository repository
    ) {

        this.repository = repository;

    }

    public List<Reservation> getByUser(
            Long userId
    ) {

        return repository.findByUserId(
                userId
        );

    }

    public Reservation save(
            Reservation reservation
    ) {

        return repository.save(
                reservation
        );

    }

}