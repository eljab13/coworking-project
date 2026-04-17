package com.coworking.backend.controller;

import com.coworking.backend.dto.AuthenticationRequest;
import com.coworking.backend.dto.AuthenticationResponse;
import com.coworking.backend.dto.ChangePasswordRequest;
import com.coworking.backend.dto.ForgotPasswordRequest;
import com.coworking.backend.dto.ProfileResponse;
import com.coworking.backend.dto.RefreshTokenRequest;
import com.coworking.backend.dto.RegisterRequest;
import com.coworking.backend.dto.UpdateProfileRequest;
import com.coworking.backend.service.AuthenticationService;
import jakarta.validation.Valid;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

/**
 * Contrôleur REST dédié à l'authentification.
 *
 * Il expose :
 * - /api/auth/register
 * - /api/auth/login
 * - /api/auth/refresh
 * - /api/auth/profile
 * - /api/auth/change-password
 * - /api/auth/forgot-password
 */
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthenticationService authenticationService;

    /**
     * Injection du service d'authentification.
     */
    public AuthController(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    /**
     * Endpoint d'inscription.
     */
    @PostMapping("/register")
    public AuthenticationResponse register(@Valid @RequestBody RegisterRequest request) {
        return authenticationService.register(request);
    }

    /**
     * Endpoint de connexion.
     */
    @PostMapping("/login")
    public AuthenticationResponse login(@Valid @RequestBody AuthenticationRequest request) {
        return authenticationService.authenticate(request);
    }

    /**
     * Génère un nouvel access token à partir d'un refresh token valide.
     */
    @PostMapping("/refresh")
    public AuthenticationResponse refreshToken(@Valid @RequestBody RefreshTokenRequest request) {
        return authenticationService.refreshToken(request);
    }

    /**
     * Retourne le profil de l'utilisateur connecté.
     */
    @GetMapping("/profile")
    public ProfileResponse getProfile(Authentication authentication) {
        return authenticationService.getProfile(authentication.getName());
    }

    /**
     * Met à jour le profil de l'utilisateur connecté.
     */
    @PutMapping("/profile")
    public ProfileResponse updateProfile(
            Authentication authentication,
            @Valid @RequestBody UpdateProfileRequest request
    ) {
        return authenticationService.updateProfile(authentication.getName(), request);
    }

    /**
     * Change le mot de passe de l'utilisateur connecté.
     */
    @PutMapping("/change-password")
    public String changePassword(
            Authentication authentication,
            @Valid @RequestBody ChangePasswordRequest request
    ) {
        authenticationService.changePassword(authentication.getName(), request);
        return "Mot de passe modifié avec succès";
    }

    /**
     * Gère la demande de réinitialisation du mot de passe.
     */
    @PostMapping("/forgot-password")
    public String forgotPassword(@Valid @RequestBody ForgotPasswordRequest request) {
        return authenticationService.forgotPassword(request);
    }
}