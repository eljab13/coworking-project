package com.coworking.backend.dto;

/**
 * DTO utilisé pour retourner les statistiques
 * du dashboard admin.
 */
public class DashboardStatsResponse {

    /**
     * Nombre total d'utilisateurs
     */
    private long totalUsers;

    /**
     * Nombre total d'espaces
     */
    private long totalSpaces;

    /**
     * Nombre total de réservations
     */
    private long totalReservations;

    public DashboardStatsResponse() {
    }

    public DashboardStatsResponse(long totalUsers, long totalSpaces, long totalReservations) {
        this.totalUsers = totalUsers;
        this.totalSpaces = totalSpaces;
        this.totalReservations = totalReservations;
    }

    public long getTotalUsers() {
        return totalUsers;
    }

    /**
     * Setter total users
     */
    public void setTotalUsers(long totalUsers) {
        this.totalUsers = totalUsers;
    }

    public long getTotalSpaces() {
        return totalSpaces;
    }

    /**
     * Setter total spaces
     */
    public void setTotalSpaces(long totalSpaces) {
        this.totalSpaces = totalSpaces;
    }

    public long getTotalReservations() {
        return totalReservations;
    }

    /**
     * Setter total reservations
     */
    public void setTotalReservations(long totalReservations) {
        this.totalReservations = totalReservations;
    }
}