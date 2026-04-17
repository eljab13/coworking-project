package com.coworking.backend.dto;

import jakarta.validation.constraints.NotBlank;

/**
 * DTO utilisé pour demander un nouveau access token
 * à partir d'un refresh token valide.
 */
public class RefreshTokenRequest {

    /**
     * Refresh token obligatoire
     */
    @NotBlank(message = "Le refresh token est obligatoire")
    private String refreshToken;

    public RefreshTokenRequest() {
    }

    public String getRefreshToken() {
        return refreshToken;
    }

    /**
     * Setter du refresh token
     */
    public void setRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }
}