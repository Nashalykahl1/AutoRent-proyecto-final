package com.Autorent.backend.controller;

import com.Autorent.backend.model.Reservation;

import com.Autorent.backend.service.ReservationService;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reservations")
@CrossOrigin(origins = "http://localhost:3000")
public class ReservationController {

    private final ReservationService service;

    public ReservationController(
            ReservationService service
    ) {

        this.service = service;

    }

    @GetMapping("/{userId}")
    public List<Reservation> getReservations(
            @PathVariable Long userId
    ) {

        return service.getByUser(
                userId
        );

    }

    @PostMapping
    public Reservation save(
            @RequestBody Reservation reservation
    ) {

        return service.save(
                reservation
        );

    }

}