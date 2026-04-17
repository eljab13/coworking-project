package com.coworking.backend.service.impl;

import com.coworking.backend.dto.AuthenticationRequest;
import com.coworking.backend.dto.AuthenticationResponse;
import com.coworking.backend.dto.ChangePasswordRequest;
import com.coworking.backend.dto.ForgotPasswordRequest;
import com.coworking.backend.dto.ProfileResponse;
import com.coworking.backend.dto.RefreshTokenRequest;
import com.coworking.backend.dto.RegisterRequest;
import com.coworking.backend.dto.UpdateProfileRequest;
import com.coworking.backend.entity.User;
import com.coworking.backend.repository.UserRepository;
import com.coworking.backend.security.JwtService;
import com.coworking.backend.service.AuthenticationService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

/**
 * Implémentation du service d'authentification.
 *
 * Cette classe gère :
 * - l'inscription
 * - la connexion
 * - le refresh token
 * - la consultation du profil
 * - la mise à jour du profil
 * - le changement de mot de passe
 * - la demande de réinitialisation du mot de passe
 */
@Service
public class AuthenticationServiceImpl implements AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    /**
     * Injection des dépendances nécessaires.
     */
    public AuthenticationServiceImpl(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService,
            AuthenticationManager authenticationManager
    ) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }

    /**
     * Inscription d'un nouvel utilisateur.
     */
    @Override
    public AuthenticationResponse register(RegisterRequest request) {

        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Cet email est déjà utilisé");
        }

        User user = new User();
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(request.getRole());
        user.setActive(true);
        user.setCreatedAt(LocalDateTime.now());

        userRepository.save(user);

        String accessToken = jwtService.generateToken(user);
        String refreshToken = jwtService.generateRefreshToken(user);

        return new AuthenticationResponse(accessToken, refreshToken);
    }

    /**
     * Connexion d'un utilisateur existant.
     */
    @Override
    public AuthenticationResponse authenticate(AuthenticationRequest request) {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Utilisateur introuvable"));

        String accessToken = jwtService.generateToken(user);
        String refreshToken = jwtService.generateRefreshToken(user);

        return new AuthenticationResponse(accessToken, refreshToken);
    }

    /**
     * Génère un nouvel access token à partir d'un refresh token valide.
     */
    @Override
    public AuthenticationResponse refreshToken(RefreshTokenRequest request) {

        String userEmail = jwtService.extractUsername(request.getRefreshToken());

        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("Utilisateur introuvable"));

        if (!jwtService.isTokenValid(request.getRefreshToken(), user)) {
            throw new RuntimeException("Refresh token invalide ou expiré");
        }

        String newAccessToken = jwtService.generateToken(user);

        return new AuthenticationResponse(newAccessToken, request.getRefreshToken());
    }

    /**
     * Retourne le profil de l'utilisateur connecté.
     */
    @Override
    public ProfileResponse getProfile(String userEmail) {

        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("Utilisateur introuvable"));

        return mapToProfileResponse(user);
    }

    /**
     * Met à jour le profil de l'utilisateur connecté.
     */
    @Override
    public ProfileResponse updateProfile(String userEmail, UpdateProfileRequest request) {

        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("Utilisateur introuvable"));

        if (!user.getEmail().equals(request.getEmail())
                && userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Cet email est déjà utilisé");
        }

        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setEmail(request.getEmail());

        User updatedUser = userRepository.save(user);

        return mapToProfileResponse(updatedUser);
    }

    /**
     * Change le mot de passe de l'utilisateur connecté.
     */
    @Override
    public void changePassword(String userEmail, ChangePasswordRequest request) {

        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("Utilisateur introuvable"));

        if (!passwordEncoder.matches(request.getCurrentPassword(), user.getPassword())) {
            throw new RuntimeException("Ancien mot de passe incorrect");
        }

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));

        userRepository.save(user);
    }

    /**
     * Gère la demande de réinitialisation du mot de passe.
     *
     * Version professionnelle :
     * - ne révèle pas si l'email existe ou non
     * - retourne toujours le même message
     *
     * Plus tard, on pourra ici :
     * - générer un token de reset
     * - envoyer un email
     */
    @Override
    public String forgotPassword(ForgotPasswordRequest request) {

        userRepository.findByEmail(request.getEmail())
                .ifPresent(user -> {
                    // Ici on pourra envoyer un email plus tard
                });

        return "Si un compte existe, un email de réinitialisation a été envoyé";
    }

    /**
     * Conversion User -> ProfileResponse
     */
    private ProfileResponse mapToProfileResponse(User user) {
        ProfileResponse response = new ProfileResponse();
        response.setId(user.getId());
        response.setFirstName(user.getFirstName());
        response.setLastName(user.getLastName());
        response.setEmail(user.getEmail());
        response.setRole(user.getRole());
        response.setActive(user.getActive());
        response.setCreatedAt(user.getCreatedAt());
        return response;
    }
}