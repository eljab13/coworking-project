package com.coworking.backend.service.impl;

import com.coworking.backend.dto.SpaceRequest;
import com.coworking.backend.dto.SpaceResponse;
import com.coworking.backend.entity.Reservation;
import com.coworking.backend.entity.Space;
import com.coworking.backend.enums.ReservationStatus;
import com.coworking.backend.repository.ReservationRepository;
import com.coworking.backend.repository.SpaceRepository;
import com.coworking.backend.service.SpaceService;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * Implémentation du service des espaces.
 */
@Service
public class SpaceServiceImpl implements SpaceService {

    private final SpaceRepository spaceRepository;
    private final ReservationRepository reservationRepository;

    public SpaceServiceImpl(
            SpaceRepository spaceRepository,
            ReservationRepository reservationRepository
    ) {
        this.spaceRepository = spaceRepository;
        this.reservationRepository = reservationRepository;
    }

    @Override
    public SpaceResponse createSpace(SpaceRequest request) {

        Space space = new Space();
        applyRequestToSpace(space, request);

        Space saved = spaceRepository.save(space);

        return mapToResponse(saved);
    }

    @Override
    public List<SpaceResponse> getAllSpaces(
            String type,
            String city,
            Integer minCapacity,
            Double maxPrice,
            List<String> equipments,
            Boolean available,
            int page,
            int size,
            String sortBy,
            String sortDir
    ) {
        List<Space> spaces = spaceRepository.findAll();

        spaces = spaces.stream()
                .filter(space -> type == null || space.getType().equalsIgnoreCase(type))
                .filter(space -> city == null
                        || (space.getLocation() != null
                        && space.getLocation().toLowerCase().contains(city.toLowerCase())))
                .filter(space -> minCapacity == null || space.getCapacity() >= minCapacity)
                .filter(space -> maxPrice == null || space.getPricePerDay().doubleValue() <= maxPrice)
                .filter(space -> available == null || Boolean.TRUE.equals(space.getAvailable()) == available)
                .filter(space -> matchEquipments(space, equipments))
                .collect(Collectors.toList());

        Comparator<Space> comparator = buildComparator(sortBy);

        if ("desc".equalsIgnoreCase(sortDir)) {
            comparator = comparator.reversed();
        }

        spaces = spaces.stream()
                .sorted(comparator)
                .collect(Collectors.toList());

        int safePage = Math.max(page, 0);
        int safeSize = size <= 0 ? 10 : size;

        int fromIndex = safePage * safeSize;
        if (fromIndex >= spaces.size()) {
            return List.of();
        }

        int toIndex = Math.min(fromIndex + safeSize, spaces.size());

        return spaces.subList(fromIndex, toIndex)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public SpaceResponse getSpaceById(Long id) {

        Space space = spaceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Espace introuvable"));

        return mapToResponse(space);
    }

    @Override
    public SpaceResponse updateSpace(Long id, SpaceRequest request) {

        Space space = spaceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Espace introuvable"));

        applyRequestToSpace(space, request);

        Space updated = spaceRepository.save(space);

        return mapToResponse(updated);
    }

    @Override
    public void deleteSpace(Long id) {

        Space space = spaceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Espace introuvable"));

        spaceRepository.delete(space);
    }

    @Override
    public Map<String, Object> getSpaceAvailability(Long id, String date) {

        Space space = spaceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Espace introuvable"));

        LocalDate requestedDate;
        try {
            requestedDate = LocalDate.parse(date);
        } catch (Exception e) {
            throw new RuntimeException("Format de date invalide. Utilise yyyy-MM-dd");
        }

        List<Reservation> activeReservations = reservationRepository
                .findBySpace_IdAndStatusInAndStartDateLessThanEqualAndEndDateGreaterThanEqual(
                        id,
                        List.of(ReservationStatus.EN_ATTENTE, ReservationStatus.CONFIRMEE),
                        requestedDate,
                        requestedDate
                );

        Map<String, Object> response = new HashMap<>();
        response.put("spaceId", space.getId());
        response.put("date", requestedDate.toString());
        response.put("available", activeReservations.isEmpty());
        response.put("reservationsCount", activeReservations.size());
        response.put("message", activeReservations.isEmpty()
                ? "Espace disponible pour cette date"
                : "Espace non disponible pour cette date");

        return response;
    }

    private void applyRequestToSpace(Space space, SpaceRequest request) {
        space.setName(request.getName());
        space.setDescription(request.getDescription());

        if (request.getLocation() != null && !request.getLocation().isBlank()) {
            space.setLocation(request.getLocation());
        } else {
            space.setLocation(request.getCity());
        }

        space.setCapacity(request.getCapacity());

        if (request.getPricePerDay() != null) {
            space.setPricePerDay(BigDecimal.valueOf(request.getPricePerDay()));
        } else if (request.getPricePerHour() != null) {
            space.setPricePerDay(BigDecimal.valueOf(request.getPricePerHour() * 8));
        } else {
            throw new RuntimeException("Le prix est obligatoire");
        }

        space.setType(request.getType());
        space.setAvailable(request.getAvailable());

        if (request.getImageUrl() != null && !request.getImageUrl().isBlank()) {
            space.setImageUrl(request.getImageUrl());
        } else if (request.getPhotos() != null && !request.getPhotos().isEmpty()) {
            space.setImageUrl(request.getPhotos().get(0));
        } else {
            space.setImageUrl(null);
        }

        if (request.getEquipments() != null) {
            space.setEquipments(request.getEquipments());
        } else {
            space.setEquipments(List.of());
        }
    }

    private boolean matchEquipments(Space space, List<String> requestedEquipments) {
        if (requestedEquipments == null || requestedEquipments.isEmpty()) {
            return true;
        }

        List<String> spaceEquipments = space.getEquipments();
        if (spaceEquipments == null || spaceEquipments.isEmpty()) {
            return false;
        }

        List<String> normalizedSpaceEquipments = spaceEquipments.stream()
                .map(String::toLowerCase)
                .collect(Collectors.toList());

        return requestedEquipments.stream()
                .map(String::toLowerCase)
                .allMatch(normalizedSpaceEquipments::contains);
    }

    private Comparator<Space> buildComparator(String sortBy) {
        if (sortBy == null) {
            return Comparator.comparing(Space::getId);
        }

        switch (sortBy.toLowerCase()) {
            case "name":
                return Comparator.comparing(space -> safeString(space.getName()));
            case "location":
            case "city":
                return Comparator.comparing(space -> safeString(space.getLocation()));
            case "capacity":
                return Comparator.comparing(Space::getCapacity);
            case "price":
            case "priceperday":
            case "priceperhour":
                return Comparator.comparing(Space::getPricePerDay);
            case "type":
                return Comparator.comparing(space -> safeString(space.getType()));
            case "available":
                return Comparator.comparing(Space::getAvailable);
            default:
                return Comparator.comparing(Space::getId);
        }
    }

    private String safeString(String value) {
        return value == null ? "" : value.toLowerCase();
    }

    /**
     * Mapping Entity → DTO
     */
    private SpaceResponse mapToResponse(Space space) {

        SpaceResponse dto = new SpaceResponse();

        dto.setId(space.getId());
        dto.setName(space.getName());
        dto.setDescription(space.getDescription());

        dto.setLocation(space.getLocation());
        dto.setCity(space.getLocation());

        dto.setSiteId(null);
        dto.setSiteName(space.getLocation());

        dto.setCapacity(space.getCapacity());

        double pricePerDay = space.getPricePerDay().doubleValue();
        dto.setPricePerDay(pricePerDay);
        dto.setPricePerHour(pricePerDay / 8.0);

        dto.setType(space.getType());
        dto.setAvailable(Boolean.TRUE.equals(space.getAvailable()));

        dto.setImageUrl(space.getImageUrl());
        dto.setPhotos(space.getImageUrl() != null ? List.of(space.getImageUrl()) : List.of());
        dto.setEquipments(space.getEquipments() != null ? space.getEquipments() : List.of());

        return dto;
    }
}