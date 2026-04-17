package com.coworking.backend.repository;

import com.coworking.backend.entity.Space;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * Repository pour gérer les opérations CRUD sur les espaces.
 */
public interface SpaceRepository extends JpaRepository<Space, Long> {

    /**
     * Trouver les espaces disponibles
     */
    List<Space> findByAvailableTrue();

    /**
     * Trouver les espaces par type
     */
    List<Space> findByType(String type);

    /**
     * Trouver les espaces par localisation
     */
    List<Space> findByLocationContainingIgnoreCase(String location);
}