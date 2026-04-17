package com.coworking.backend.repository;

import com.coworking.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

/**
 * JpaRepository :
 * fournit automatiquement les méthodes CRUD :
 * - save()
 * - findById()
 * - findAll()
 * - delete()
 */
public interface UserRepository extends JpaRepository<User, Long> {

    /**
     * Méthode personnalisée :
     * permet de trouver un utilisateur par email
     */
    Optional<User> findByEmail(String email);
}