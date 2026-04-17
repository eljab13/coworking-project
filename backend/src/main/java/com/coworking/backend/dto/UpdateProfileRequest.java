package com.coworking.backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

/**
 * DTO utilisé pour modifier le profil de l'utilisateur connecté.
 */
public class UpdateProfileRequest {

    /**
     * Prénom obligatoire
     */
    @NotBlank(message = "Le prénom est obligatoire")
    private String firstName;

    /**
     * Nom obligatoire
     */
    @NotBlank(message = "Le nom est obligatoire")
    private String lastName;

    /**
     * Email obligatoire et valide
     */
    @NotBlank(message = "L'email est obligatoire")
    @Email(message = "Format d'email invalide")
    private String email;

    public UpdateProfileRequest() {
    }

    public String getFirstName() {
        return firstName;
    }

    /**
     * Setter du prénom
     */
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    /**
     * Setter du nom
     */
    public void setLastName(String lastName) {
        this.lastName = lastName;
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