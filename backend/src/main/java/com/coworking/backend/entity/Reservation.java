package com.coworking.backend.entity;

import com.coworking.backend.enums.ReservationStatus;
import com.coworking.backend.enums.ReservationTimeSlot;
import jakarta.persistence.*;

import java.time.LocalDate;

/**
 * Entité représentant une réservation d'espace.
 */
@Entity
@Table(name = "reservations")
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * Date de début
     */
    @Column(nullable = false)
    private LocalDate startDate;

    /**
     * Date de fin
     */
    @Column(nullable = false)
    private LocalDate endDate;

    /**
     * Prix total
     */
    @Column(nullable = false)
    private Double totalPrice;

    /**
     * Statut de la réservation
     */
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ReservationStatus status;

    /**
     * Créneau horaire
     */
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ReservationTimeSlot timeSlot;

    /**
     * Utilisateur qui réserve
     */
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    /**
     * Espace réservé
     */
    @ManyToOne
    @JoinColumn(name = "space_id")
    private Space space;

    public Reservation() {
    }

    public Long getId() {
        return id;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public Double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(Double totalPrice) {
        this.totalPrice = totalPrice;
    }

    public ReservationStatus getStatus() {
        return status;
    }

    public void setStatus(ReservationStatus status) {
        this.status = status;
    }

    public ReservationTimeSlot getTimeSlot() {
        return timeSlot;
    }

    public void setTimeSlot(ReservationTimeSlot timeSlot) {
        this.timeSlot = timeSlot;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Space getSpace() {
        return space;
    }

    public void setSpace(Space space) {
        this.space = space;
    }
}