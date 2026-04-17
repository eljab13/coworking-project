package com.coworking.backend.controller;

import com.coworking.backend.dto.UserRequestDto;
import com.coworking.backend.dto.UserResponseDto;
import com.coworking.backend.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Contrôleur REST pour la gestion des utilisateurs.
 *
 * Cette classe expose les endpoints HTTP liés aux utilisateurs.
 */
@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    /**
     * Injection du service via constructeur.
     */
    public UserController(UserService userService) {
        this.userService = userService;
    }

    /**
     * GET /api/users
     * Retourne tous les utilisateurs sans exposer le mot de passe.
     */
    @GetMapping
    public List<UserResponseDto> getAllUsers() {
        return userService.getAllUsers();
    }

    /**
     * POST /api/users
     * Crée un utilisateur à partir des données reçues.
     */
    @PostMapping
    public UserResponseDto createUser(@RequestBody UserRequestDto userRequestDto) {
        return userService.saveUser(userRequestDto);
    }
}