package com.coworking.backend.service;

import com.coworking.backend.dto.AuthenticationRequest;
import com.coworking.backend.dto.AuthenticationResponse;
import com.coworking.backend.dto.ChangePasswordRequest;
import com.coworking.backend.dto.ForgotPasswordRequest;
import com.coworking.backend.dto.ProfileResponse;
import com.coworking.backend.dto.RefreshTokenRequest;
import com.coworking.backend.dto.RegisterRequest;
import com.coworking.backend.dto.UpdateProfileRequest;

/**
 * Interface définissant les opérations d'authentification.
 */
public interface AuthenticationService {

    /**
     * Inscrit un nouvel utilisateur puis retourne
     * un access token et un refresh token.
     */
    AuthenticationResponse register(RegisterRequest request);

    /**
     * Authentifie un utilisateur existant puis retourne
     * un access token et un refresh token.
     */
    AuthenticationResponse authenticate(AuthenticationRequest request);

    /**
     * Génère un nouvel access token à partir d'un refresh token valide.
     */
    AuthenticationResponse refreshToken(RefreshTokenRequest request);

    /**
     * Retourne le profil de l'utilisateur connecté.
     */
    ProfileResponse getProfile(String userEmail);

    /**
     * Met à jour le profil de l'utilisateur connecté.
     */
    ProfileResponse updateProfile(String userEmail, UpdateProfileRequest request);

    /**
     * Change le mot de passe de l'utilisateur connecté.
     */
    void changePassword(String userEmail, ChangePasswordRequest request);

    /**
     * Gère la demande de réinitialisation du mot de passe.
     */
    String forgotPassword(ForgotPasswordRequest request);
}