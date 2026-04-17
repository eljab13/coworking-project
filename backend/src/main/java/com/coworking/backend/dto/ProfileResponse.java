package com.coworking.backend.dto;

import com.coworking.backend.enums.Role;

import java.time.LocalDateTime;

/**
 * DTO utilisé pour renvoyer les informations du profil
 * de l'utilisateur connecté.
 */
public class ProfileResponse {

    /**
     * Identifiant unique
     */
    private Long id;

    /**
     * Prénom
     */
    private String firstName;

    /**
     * Nom
     */
    private String lastName;

    /**
     * Email
     */
    private String email;

    /**
     * Rôle
     */
    private Role role;

    /**
     * Statut du compte
     */
    private Boolean active;

    /**
     * Date de création du compte
     */
    private LocalDateTime createdAt;

    public ProfileResponse() {
    }

    public Long getId() {
        return id;
    }

    /**
     * Setter de l'id
     */
    public void setId(Long id) {
        this.id = id;
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

    public Role getRole() {
        return role;
    }

    /**
     * Setter du rôle
     */
    public void setRole(Role role) {
        this.role = role;
    }

    public Boolean getActive() {
        return active;
    }

    /**
     * Setter du statut actif
     */
    public void setActive(Boolean active) {
        this.active = active;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    /**
     * Setter de la date de création
     */
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}