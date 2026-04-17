package com.coworking.backend.service.impl;

import com.coworking.backend.dto.UserResponse;
import com.coworking.backend.dto.UserRoleUpdateRequest;
import com.coworking.backend.entity.User;
import com.coworking.backend.enums.Role;
import com.coworking.backend.repository.UserRepository;
import com.coworking.backend.service.AdminUserService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Implémentation du service admin pour les utilisateurs.
 */
@Service
public class AdminUserServiceImpl implements AdminUserService {

    private final UserRepository userRepository;

    public AdminUserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public List<UserResponse> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public UserResponse updateUserRole(Long userId, UserRoleUpdateRequest request) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Utilisateur introuvable"));

        try {
            user.setRole(Role.valueOf(request.getRole().toUpperCase()));
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Rôle invalide : " + request.getRole());
        }

        User updatedUser = userRepository.save(user);

        return mapToResponse(updatedUser);
    }

    @Override
    public UserResponse toggleUserStatus(Long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Utilisateur introuvable"));

        user.setActive(!Boolean.TRUE.equals(user.getActive()));

        User updatedUser = userRepository.save(user);

        return mapToResponse(updatedUser);
    }

    /**
     * Mapping Entity -> DTO
     */
    private UserResponse mapToResponse(User user) {
        UserResponse dto = new UserResponse();
        dto.setId(user.getId());
        dto.setFirstName(user.getFirstName());
        dto.setLastName(user.getLastName());
        dto.setEmail(user.getEmail());
        dto.setRole(user.getRole().name());
        dto.setActive(user.getActive());
        dto.setCreatedAt(user.getCreatedAt().toString());
        return dto;
    }
}