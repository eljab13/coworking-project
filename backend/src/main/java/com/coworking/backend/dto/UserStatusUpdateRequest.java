package com.coworking.backend.dto;

import jakarta.validation.constraints.NotNull;

/**
 * DTO pour activer / désactiver un utilisateur.
 */
public class UserStatusUpdateRequest {

    @NotNull(message = "Le statut est obligatoire")
    private Boolean active;

    public UserStatusUpdateRequest() {
    }

    public Boolean getActive() {
        return active;
    }

    /**
     * Setter statut actif
     */
    public void setActive(Boolean active) {
        this.active = active;
    }
}