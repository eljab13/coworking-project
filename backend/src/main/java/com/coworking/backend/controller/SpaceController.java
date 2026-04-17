package com.coworking.backend.controller;

import com.coworking.backend.dto.SpaceRequest;
import com.coworking.backend.dto.SpaceResponse;
import com.coworking.backend.service.SpaceService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * Contrôleur REST pour la gestion des espaces (version frontend-ready).
 */
@RestController
@RequestMapping("/api/spaces")
public class SpaceController {

    private final SpaceService spaceService;

    public SpaceController(SpaceService spaceService) {
        this.spaceService = spaceService;
    }

    /**
     * Créer un espace
     */
    @PostMapping
    public SpaceResponse createSpace(@Valid @RequestBody SpaceRequest request) {
        return spaceService.createSpace(request);
    }

    /**
     * Récupérer les espaces avec filtres + pagination + tri
     * Compatible frontend
     */
    @GetMapping
    public List<SpaceResponse> getAllSpaces(
            @RequestParam(required = false) String type,
            @RequestParam(required = false) String city,
            @RequestParam(required = false) Integer minCapacity,
            @RequestParam(required = false) Double maxPrice,
            @RequestParam(required = false) List<String> equipments,
            @RequestParam(required = false) Boolean available,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "asc") String sortDir
    ) {
        return spaceService.getAllSpaces(
                type,
                city,
                minCapacity,
                maxPrice,
                equipments,
                available,
                page,
                size,
                sortBy,
                sortDir
        );
    }

    /**
     * Récupérer un espace par id
     */
    @GetMapping("/{id}")
    public SpaceResponse getSpaceById(@PathVariable Long id) {
        return spaceService.getSpaceById(id);
    }

    /**
     * Mettre à jour un espace
     */
    @PutMapping("/{id}")
    public SpaceResponse updateSpace(
            @PathVariable Long id,
            @Valid @RequestBody SpaceRequest request
    ) {
        return spaceService.updateSpace(id, request);
    }

    /**
     * Supprimer un espace
     */
    @DeleteMapping("/{id}")
    public String deleteSpace(@PathVariable Long id) {
        spaceService.deleteSpace(id);
        return "Espace supprimé avec succès";
    }

    /**
     * Vérifier disponibilité d'un espace
     * Endpoint CRITIQUE pour le frontend
     * Exemple:
     * /api/spaces/1/availability?date=2026-04-17
     */
    @GetMapping("/{id}/availability")
    public Map<String, Object> getSpaceAvailability(
            @PathVariable Long id,
            @RequestParam String date
    ) {
        return spaceService.getSpaceAvailability(id, date);
    }
}