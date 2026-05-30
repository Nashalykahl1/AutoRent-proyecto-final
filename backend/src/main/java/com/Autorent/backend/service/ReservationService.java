package com.Autorent.backend.service;

import com.Autorent.backend.dto.ReservationDTO;
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

    private ReservationDTO toDTO(
            Reservation reservation
    ) {

        return new ReservationDTO(

                reservation.getId(),

                reservation.getStartDate(),

                reservation.getEndDate(),

                reservation.getUser().getId(),

                reservation.getProduct().getId()

        );

    }

    public List<ReservationDTO> getByUser(
            Long userId
    ) {

        return repository.findByUserId(userId)
                .stream()

                .filter(reservation ->

                        reservation.getProduct() != null &&

                                reservation.getUser() != null

                )

                .map(this::toDTO)

                .toList();

    }

    public List<ReservationDTO> getByProduct(
            Long id
    ) {

        return repository.findByProduct_Id(id)
                .stream()

                .filter(reservation ->

                        reservation.getProduct() != null &&

                                reservation.getUser() != null

                )

                .map(this::toDTO)

                .toList();

    }

    public ReservationDTO save(
            Reservation reservation
    ) {

        if (
                reservation.getStartDate() == null
        ) {

            throw new IllegalArgumentException(
                    "La fecha de inicio es obligatoria"
            );

        }

        if (
                reservation.getEndDate() == null
        ) {

            throw new IllegalArgumentException(
                    "La fecha de fin es obligatoria"
            );

        }

        Reservation saved =
                repository.save(reservation);

        return toDTO(saved);

    }

}