package com.coworking.backend.service;

import com.coworking.backend.dto.SpaceRequest;
import com.coworking.backend.dto.SpaceResponse;

import java.util.List;
import java.util.Map;

/**
 * Interface de service pour la gestion des espaces.
 */
public interface SpaceService {

    /**
     * Créer un espace
     */
    SpaceResponse createSpace(SpaceRequest request);

    /**
     * Récupérer les espaces avec filtres, pagination et tri
     */
    List<SpaceResponse> getAllSpaces(
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
    );

    /**
     * Récupérer un espace par id
     */
    SpaceResponse getSpaceById(Long id);

    /**
     * Mettre à jour un espace
     */
    SpaceResponse updateSpace(Long id, SpaceRequest request);

    /**
     * Supprimer un espace
     */
    void deleteSpace(Long id);

    /**
     * Vérifier la disponibilité d'un espace à une date donnée
     */
    Map<String, Object> getSpaceAvailability(Long id, String date);
}