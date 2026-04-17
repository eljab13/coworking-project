package com.coworking.backend.dto;

import com.coworking.backend.enums.Role;

import java.time.LocalDateTime;

/**
 * DTO utilisé pour recevoir les données envoyées par le client
 * lors de la création d'un utilisateur.
 *
 * Ce DTO représente les données d'entrée (request).
 */
public class UserRequestDto {

    /**
     * Prénom de l'utilisateur
     */
    private String firstName;

    /**
     * Nom de l'utilisateur
     */
    private String lastName;

    /**
     * Email de l'utilisateur
     */
    private String email;

    /**
     * Mot de passe envoyé par le client
     */
    private String password;

    /**
     * Rôle de l'utilisateur
     */
    private Role role;

    /**
     * Statut actif ou non
     */
    private Boolean active;

    /**
     * Date de création
     */
    private LocalDateTime createdAt;

    /**
     * Constructeur vide obligatoire pour Jackson
     */
    public UserRequestDto() {
    }

    public UserRequestDto(String firstName, String lastName, String email, String password, Role role, Boolean active, LocalDateTime createdAt) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.role = role;
        this.active = active;
        this.createdAt = createdAt;
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