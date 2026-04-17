package com.coworking.backend.dto;

import com.coworking.backend.enums.Role;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

/**
 * DTO utilisé pour l'inscription d'un utilisateur.
 *
 * Cette classe contient les données envoyées par le client
 * lors de la création d'un compte.
 */
public class RegisterRequest {

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

    /**
     * Mot de passe obligatoire avec taille minimale
     */
    @NotBlank(message = "Le mot de passe est obligatoire")
    @Size(min = 6, message = "Le mot de passe doit contenir au moins 6 caractères")
    private String password;

    /**
     * Rôle obligatoire
     */
    @NotNull(message = "Le rôle est obligatoire")
    private Role role;

    public RegisterRequest() {
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

    public String getPassword() {
        return password;
    }

    /**
     * Setter du mot de passe
     */
    public void setPassword(String password) {
        this.password = password;
    }

    public Role getRole() {
        return role;
    }

    /**
     * Setter du rôle
     */
    public void setRole(Role role) {
        this.role = role;
    }
}