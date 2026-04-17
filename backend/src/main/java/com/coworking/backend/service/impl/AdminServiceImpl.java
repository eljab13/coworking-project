package com.coworking.backend.service.impl;

import com.coworking.backend.dto.DashboardStatsResponse;
import com.coworking.backend.repository.ReservationRepository;
import com.coworking.backend.repository.SpaceRepository;
import com.coworking.backend.repository.UserRepository;
import com.coworking.backend.service.AdminService;
import org.springframework.stereotype.Service;

/**
 * Implémentation du service admin.
 */
@Service
public class AdminServiceImpl implements AdminService {

    private final UserRepository userRepository;
    private final SpaceRepository spaceRepository;
    private final ReservationRepository reservationRepository;

    /**
     * Injection des repositories nécessaires.
     */
    public AdminServiceImpl(
            UserRepository userRepository,
            SpaceRepository spaceRepository,
            ReservationRepository reservationRepository
    ) {
        this.userRepository = userRepository;
        this.spaceRepository = spaceRepository;
        this.reservationRepository = reservationRepository;
    }

    /**
     * Retourne les statistiques du dashboard admin.
     */
    @Override
    public DashboardStatsResponse getDashboardStats() {

        long totalUsers = userRepository.count();
        long totalSpaces = spaceRepository.count();
        long totalReservations = reservationRepository.count();

        return new DashboardStatsResponse(
                totalUsers,
                totalSpaces,
                totalReservations
        );
    }
}