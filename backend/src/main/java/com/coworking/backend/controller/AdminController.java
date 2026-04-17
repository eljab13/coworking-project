package com.coworking.backend.controller;

import com.coworking.backend.dto.DashboardStatsResponse;
import com.coworking.backend.dto.ReservationResponse;
import com.coworking.backend.dto.UserResponse;
import com.coworking.backend.dto.UserRoleUpdateRequest;
import com.coworking.backend.service.AdminService;
import com.coworking.backend.service.AdminUserService;
import com.coworking.backend.service.ReservationService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Contrôleur REST pour les fonctionnalités admin.
 */
@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final AdminService adminService;
    private final AdminUserService adminUserService;
    private final ReservationService reservationService;

    public AdminController(
            AdminService adminService,
            AdminUserService adminUserService,
            ReservationService reservationService
    ) {
        this.adminService = adminService;
        this.adminUserService = adminUserService;
        this.reservationService = reservationService;
    }

    /**
     * Dashboard admin
     */
    @GetMapping("/stats/dashboard")
    public DashboardStatsResponse getDashboardStats() {
        return adminService.getDashboardStats();
    }

    /**
     * Liste des utilisateurs
     */
    @GetMapping("/users")
    public List<UserResponse> getAllUsers() {
        return adminUserService.getAllUsers();
    }

    /**
     * Modifier le rôle d'un utilisateur
     */
    @PutMapping("/users/{id}/role")
    public UserResponse updateUserRole(
            @PathVariable Long id,
            @Valid @RequestBody UserRoleUpdateRequest request
    ) {
        return adminUserService.updateUserRole(id, request);
    }

    /**
     * Activer / désactiver un utilisateur
     * Endpoint attendu par le frontend
     */
    @PutMapping("/users/{id}/toggle")
    public UserResponse toggleUserStatus(@PathVariable Long id) {
        return adminUserService.toggleUserStatus(id);
    }

    /**
     * Voir toutes les réservations côté admin
     * Endpoint attendu par le frontend
     */
    @GetMapping("/reservations")
    public List<ReservationResponse> getAllReservations() {
        return reservationService.getAllReservations();
    }
}