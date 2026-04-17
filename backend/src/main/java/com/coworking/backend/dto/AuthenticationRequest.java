package com.coworking.backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

/**
 * DTO utilisé pour la connexion d'un utilisateur.
 */
public class AuthenticationRequest {

    /**
     * Email obligatoire et valide
     */
    @NotBlank(message = "L'email est obligatoire")
    @Email(message = "Format d'email invalide")
    private String email;

    /**
     * Mot de passe obligatoire
     */
    @NotBlank(message = "Le mot de passe est obligatoire")
    private String password;

    public AuthenticationRequest() {
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

    public String getPassword() {
        return password;
    }

    /**
     * Setter du mot de passe
     */
    public void setPassword(String password) {
        this.password = password;
    }
}