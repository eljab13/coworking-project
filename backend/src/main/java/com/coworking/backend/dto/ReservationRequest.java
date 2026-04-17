package com.coworking.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

/**
 * DTO de requête pour créer une réservation.
 */
public class ReservationRequest {

    @NotNull(message = "L'identifiant de l'espace est obligatoire")
    private Long spaceId;

    @NotBlank(message = "La date de début est obligatoire")
    private String startDate;

    @NotBlank(message = "La date de fin est obligatoire")
    private String endDate;

    @NotBlank(message = "Le créneau horaire est obligatoire")
    private String timeSlot;

    public ReservationRequest() {
    }

    public Long getSpaceId() {
        return spaceId;
    }

    public void setSpaceId(Long spaceId) {
        this.spaceId = spaceId;
    }

    public String getStartDate() {
        return startDate;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

    public String getEndDate() {
        return endDate;
    }

    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }

    public String getTimeSlot() {
        return timeSlot;
    }

    public void setTimeSlot(String timeSlot) {
        this.timeSlot = timeSlot;
    }
}