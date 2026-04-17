package com.coworking.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

/**
 * DTO utilisé pour le changement du mot de passe
 * de l'utilisateur connecté.
 */
public class ChangePasswordRequest {

    /**
     * Ancien mot de passe obligatoire
     */
    @NotBlank(message = "L'ancien mot de passe est obligatoire")
    private String currentPassword;

    /**
     * Nouveau mot de passe obligatoire
     */
    @NotBlank(message = "Le nouveau mot de passe est obligatoire")
    @Size(min = 6, message = "Le nouveau mot de passe doit contenir au moins 6 caractères")
    private String newPassword;

    public ChangePasswordRequest() {
    }

    public String getCurrentPassword() {
        return currentPassword;
    }

    /**
     * Setter de l'ancien mot de passe
     */
    public void setCurrentPassword(String currentPassword) {
        this.currentPassword = currentPassword;
    }

    public String getNewPassword() {
        return newPassword;
    }

    /**
     * Setter du nouveau mot de passe
     */
    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }
}