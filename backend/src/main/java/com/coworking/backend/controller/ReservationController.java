package com.coworking.backend.controller;

import com.coworking.backend.dto.ReservationRequest;
import com.coworking.backend.dto.ReservationResponse;
import com.coworking.backend.service.ReservationService;
import jakarta.validation.Valid;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Contrôleur REST pour la gestion des réservations.
 */
@RestController
@RequestMapping("/api/reservations")
public class ReservationController {

    private final ReservationService reservationService;

    public ReservationController(ReservationService reservationService) {
        this.reservationService = reservationService;
    }

    /**
     * Créer une réservation.
     */
    @PostMapping
    public ReservationResponse createReservation(
            @Valid @RequestBody ReservationRequest request,
            Authentication authentication
    ) {
        return reservationService.createReservation(request, authentication.getName());
    }

    /**
     * Récupérer mes réservations.
     */
    @GetMapping("/me")
    public List<ReservationResponse> getMyReservations(Authentication authentication) {
        return reservationService.getMyReservations(authentication.getName());
    }

    /**
     * Annuler une réservation.
     */
    @PutMapping("/{id}/cancel")
    public String cancelReservation(@PathVariable Long id, Authentication authentication) {
        return reservationService.cancelReservation(id, authentication.getName());
    }
}