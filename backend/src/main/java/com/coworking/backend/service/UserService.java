package com.coworking.backend.service;

import com.coworking.backend.dto.UserRequestDto;
import com.coworking.backend.dto.UserResponseDto;

import java.util.List;
import java.util.Optional;

/**
 * Interface de service pour la gestion des utilisateurs.
 */
public interface UserService {

    /**
     * Enregistre un nouvel utilisateur à partir d'un DTO d'entrée
     * et retourne un DTO de sortie.
     */
    UserResponseDto saveUser(UserRequestDto userRequestDto);

    /**
     * Retourne tous les utilisateurs sous forme de DTO de sortie.
     */
    List<UserResponseDto> getAllUsers();

    /**
     * Recherche un utilisateur par son id.
     */
    Optional<UserResponseDto> getUserById(Long id);

    /**
     * Recherche un utilisateur par son email.
     */
    Optional<UserResponseDto> getUserByEmail(String email);

    /**
     * Supprime un utilisateur par son id.
     */
    void deleteUser(Long id);
}