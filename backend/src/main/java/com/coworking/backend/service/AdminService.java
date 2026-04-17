package com.coworking.backend.service;

import com.coworking.backend.dto.DashboardStatsResponse;

/**
 * Interface de service pour les fonctionnalités admin.
 */
public interface AdminService {

    /**
     * Retourne les statistiques du dashboard admin.
     */
    DashboardStatsResponse getDashboardStats();
}