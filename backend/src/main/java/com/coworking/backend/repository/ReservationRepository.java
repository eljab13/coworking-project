package com.coworking.backend.repository;

import com.coworking.backend.entity.Reservation;
import com.coworking.backend.entity.User;
import com.coworking.backend.enums.ReservationStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

/**
 * Repository pour la gestion des réservations.
 */
@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {

    List<Reservation> findByUser(User user);

    List<Reservation> findBySpace_IdAndStatusInAndStartDateLessThanEqualAndEndDateGreaterThanEqual(
            Long spaceId,
            List<ReservationStatus> statuses,
            LocalDate endDate,
            LocalDate startDate
    );
}