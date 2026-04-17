package com.coworking.backend.dto;

/**
 * DTO retourné après un register, un login
 * ou un refresh token réussi.
 *
 * Il contient :
 * - accessToken : utilisé pour accéder aux routes sécurisées
 * - refreshToken : utilisé pour obtenir un nouveau access token
 */
public class AuthenticationResponse {

    /**
     * Token d'accès JWT
     */
    private String accessToken;

    /**
     * Token de rafraîchissement JWT
     */
    private String refreshToken;

    public AuthenticationResponse() {
    }

    public AuthenticationResponse(String accessToken, String refreshToken) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
    }

    public String getAccessToken() {
        return accessToken;
    }

    /**
     * Setter de l'access token
     */
    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
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