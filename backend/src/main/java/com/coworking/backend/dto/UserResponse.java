package com.coworking.backend.dto;

/**
 * DTO de réponse pour un utilisateur.
 */
public class UserResponse {

    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String role;
    private Boolean active;
    private String createdAt;

    public UserResponse() {
    }

    public Long getId() {
        return id;
    }

    /**
     * Setter id
     */
    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    /**
     * Setter prénom
     */
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    /**
     * Setter nom
     */
    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    /**
     * Setter email
     */
    public void setEmail(String email) {
        this.email = email;
    }

    public String getRole() {
        return role;
    }

    /**
     * Setter rôle
     */
    public void setRole(String role) {
        this.role = role;
    }

    public Boolean getActive() {
        return active;
    }

    /**
     * Setter actif
     */
    public void setActive(Boolean active) {
        this.active = active;
    }

    public String getCreatedAt() {
        return createdAt;
    }

    /**
     * Setter date création
     */
    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }
}