package com.coworking.backend.dto;

import jakarta.validation.constraints.NotBlank;

/**
 * DTO utilisé pour modifier le rôle d'un utilisateur.
 */
public class UserRoleUpdateRequest {

    @NotBlank(message = "Le rôle est obligatoire")
    private String role;

    public UserRoleUpdateRequest() {
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
}