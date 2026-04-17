package com.coworking.backend.service.impl;

import com.coworking.backend.dto.ReservationRequest;
import com.coworking.backend.dto.ReservationResponse;
import com.coworking.backend.entity.Reservation;
import com.coworking.backend.entity.Space;
import com.coworking.backend.entity.User;
import com.coworking.backend.enums.ReservationStatus;
import com.coworking.backend.enums.ReservationTimeSlot;
import com.coworking.backend.repository.ReservationRepository;
import com.coworking.backend.repository.SpaceRepository;
import com.coworking.backend.repository.UserRepository;
import com.coworking.backend.service.ReservationService;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Implémentation du service de gestion des réservations.
 */
@Service
public class ReservationServiceImpl implements ReservationService {

    private final ReservationRepository reservationRepository;
    private final UserRepository userRepository;
    private final SpaceRepository spaceRepository;

    public ReservationServiceImpl(
            ReservationRepository reservationRepository,
            UserRepository userRepository,
            SpaceRepository spaceRepository
    ) {
        this.reservationRepository = reservationRepository;
        this.userRepository = userRepository;
        this.spaceRepository = spaceRepository;
    }

    @Override
    public ReservationResponse createReservation(ReservationRequest request, String userEmail) {

        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("Utilisateur introuvable"));

        if (!Boolean.TRUE.equals(user.getActive())) {
            throw new RuntimeException("Votre compte est désactivé");
        }

        Space space = spaceRepository.findById(request.getSpaceId())
                .orElseThrow(() -> new RuntimeException("Espace introuvable"));

        if (!Boolean.TRUE.equals(space.getAvailable())) {
            throw new RuntimeException("Cet espace n'est pas disponible");
        }

        LocalDate startDate;
        LocalDate endDate;

        try {
            startDate = LocalDate.parse(request.getStartDate());
            endDate = LocalDate.parse(request.getEndDate());
        } catch (Exception e) {
            throw new RuntimeException("Format de date invalide. Utilise yyyy-MM-dd");
        }

        if (endDate.isBefore(startDate)) {
            throw new RuntimeException("La date de fin doit être après ou égale à la date de début");
        }

        ReservationTimeSlot requestedTimeSlot;
        try {
            requestedTimeSlot = ReservationTimeSlot.valueOf(request.getTimeSlot().toUpperCase());
        } catch (Exception e) {
            throw new RuntimeException("Créneau horaire invalide");
        }

        List<Reservation> overlappingReservations =
                reservationRepository.findBySpace_IdAndStatusInAndStartDateLessThanEqualAndEndDateGreaterThanEqual(
                        request.getSpaceId(),
                        List.of(ReservationStatus.EN_ATTENTE, ReservationStatus.CONFIRMEE),
                        endDate,
                        startDate
                );

        for (Reservation existingReservation : overlappingReservations) {
            ReservationTimeSlot existingTimeSlot = existingReservation.getTimeSlot();

            if (requestedTimeSlot == ReservationTimeSlot.FULL_DAY
                    || existingTimeSlot == ReservationTimeSlot.FULL_DAY) {
                throw new RuntimeException("Cet espace est déjà réservé sur la période demandée");
            }

            if (requestedTimeSlot == existingTimeSlot) {
                throw new RuntimeException("Cet espace est déjà réservé sur la période demandée");
            }
        }

        long numberOfDays = ChronoUnit.DAYS.between(startDate, endDate) + 1;
        double totalPrice = numberOfDays * space.getPricePerDay().doubleValue();

        Reservation reservation = new Reservation();
        reservation.setStartDate(startDate);
        reservation.setEndDate(endDate);
        reservation.setUser(user);
        reservation.setSpace(space);
        reservation.setTotalPrice(totalPrice);
        reservation.setStatus(ReservationStatus.EN_ATTENTE);
        reservation.setTimeSlot(requestedTimeSlot);

        Reservation saved = reservationRepository.save(reservation);

        return mapToResponse(saved);
    }

    @Override
    public List<ReservationResponse> getMyReservations(String userEmail) {

        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("Utilisateur introuvable"));

        return reservationRepository.findByUser(user)
                .stream()
                .sorted(Comparator.comparing(Reservation::getStartDate).reversed())
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<ReservationResponse> getAllReservations() {
        return reservationRepository.findAll()
                .stream()
                .sorted(Comparator.comparing(Reservation::getStartDate).reversed())
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public String cancelReservation(Long reservationId, String userEmail) {

        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("Utilisateur introuvable"));

        Reservation reservation = reservationRepository.findById(reservationId)
                .orElseThrow(() -> new RuntimeException("Réservation introuvable"));

        if (!reservation.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Vous ne pouvez annuler que vos propres réservations");
        }

        if (reservation.getStatus() == ReservationStatus.ANNULEE) {
            throw new RuntimeException("Cette réservation est déjà annulée");
        }

        reservation.setStatus(ReservationStatus.ANNULEE);
        reservationRepository.save(reservation);

        return "Réservation annulée avec succès";
    }

    /**
     * Mapping Entity -> DTO
     */
    private ReservationResponse mapToResponse(Reservation reservation) {

        ReservationResponse dto = new ReservationResponse();

        dto.setId(reservation.getId());
        dto.setStartDate(reservation.getStartDate().toString());
        dto.setEndDate(reservation.getEndDate().toString());
        dto.setTotalPrice(reservation.getTotalPrice());
        dto.setStatus(reservation.getStatus().name());
        dto.setTimeSlot(reservation.getTimeSlot() != null ? reservation.getTimeSlot().name() : null);

        dto.setUserId(reservation.getUser().getId());
        dto.setUserFirstName(reservation.getUser().getFirstName());
        dto.setUserLastName(reservation.getUser().getLastName());
        dto.setUserEmail(reservation.getUser().getEmail());

        dto.setSpaceId(reservation.getSpace().getId());
        dto.setSpaceName(reservation.getSpace().getName());
        dto.setSpaceLocation(reservation.getSpace().getLocation());
        dto.setSpaceType(reservation.getSpace().getType());

        return dto;
    }
}