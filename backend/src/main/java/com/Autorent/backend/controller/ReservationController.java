package com.Autorent.backend.controller;

import com.Autorent.backend.dto.ReservationDTO;
import com.Autorent.backend.model.Reservation;
import com.Autorent.backend.service.ReservationService;
import jakarta.validation.Valid;
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
    public List<ReservationDTO> getReservations(
            @PathVariable Long userId
    ) {

        return service.getByUser(
                userId
        );

    }

    @GetMapping("/product/{id}")
    public List<ReservationDTO> getByProduct(
            @PathVariable Long id
    ) {
        return service.getByProduct(id);
    }

    @PostMapping
    public ReservationDTO save(
            @Valid @RequestBody Reservation reservation
    ) {

        return service.save(reservation);

    }

}