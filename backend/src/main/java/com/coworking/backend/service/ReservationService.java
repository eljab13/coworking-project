package com.coworking.backend.service;

import com.coworking.backend.dto.ReservationRequest;
import com.coworking.backend.dto.ReservationResponse;

import java.util.List;

/**
 * Interface de service pour la gestion des réservations.
 */
public interface ReservationService {

    /**
     * Crée une nouvelle réservation
     */
    ReservationResponse createReservation(ReservationRequest reservationRequest, String userEmail);

    /**
     * Retourne les réservations de l'utilisateur connecté
     */
    List<ReservationResponse> getMyReservations(String userEmail);

    /**
     * Retourne toutes les réservations
     */
    List<ReservationResponse> getAllReservations();

    /**
     * Annule une réservation
     */
    String cancelReservation(Long reservationId, String userEmail);
}