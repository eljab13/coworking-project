package com.coworking.backend.service;

import com.coworking.backend.dto.UserResponse;
import com.coworking.backend.dto.UserRoleUpdateRequest;

import java.util.List;

/**
 * Service pour la gestion des utilisateurs côté admin.
 */
public interface AdminUserService {

    /**
     * Lister tous les utilisateurs
     */
    List<UserResponse> getAllUsers();

    /**
     * Modifier le rôle d'un utilisateur
     */
    UserResponse updateUserRole(Long userId, UserRoleUpdateRequest request);

    /**
     * Activer / désactiver un utilisateur
     */
    UserResponse toggleUserStatus(Long userId);
}