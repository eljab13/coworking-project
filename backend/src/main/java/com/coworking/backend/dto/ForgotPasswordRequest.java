package com.coworking.backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

/**
 * DTO utilisé pour la demande de réinitialisation
 * du mot de passe à partir d'un email.
 */
public class ForgotPasswordRequest {

    /**
     * Email obligatoire et valide
     */
    @NotBlank(message = "L'email est obligatoire")
    @Email(message = "Format d'email invalide")
    private String email;

    public ForgotPasswordRequest() {
    }

    public String getEmail() {
        return email;
    }

    /**
     * Setter de l'email
     */
    public void setEmail(String email) {
        this.email = email;
    }
}