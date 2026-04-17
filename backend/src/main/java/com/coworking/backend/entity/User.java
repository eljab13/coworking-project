package com.coworking.backend.entity;

import com.coworking.backend.enums.Role;
import jakarta.persistence.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

/**
 * Classe Entity représentant un utilisateur dans le système.
 *
 * Cette classe est liée à la table "users".
 * Elle implémente UserDetails pour être compatible avec Spring Security.
 */
@Entity
@Table(name = "users")
public class User implements UserDetails {

    /**
     * Identifiant unique (clé primaire)
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * Prénom
     */
    @Column(nullable = false)
    private String firstName;

    /**
     * Nom
     */
    @Column(nullable = false)
    private String lastName;

    /**
     * Email unique
     */
    @Column(nullable = false, unique = true)
    private String email;

    /**
     * Mot de passe (chiffré avec BCrypt)
     */
    @Column(nullable = false)
    private String password;

    /**
     * Rôle utilisateur (ROLE_ADMIN, ROLE_MEMBER)
     */
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    /**
     * Compte actif ou non
     */
    @Column(nullable = false)
    private Boolean active = true;

    /**
     * Date de création
     */
    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    /**
     * Constructeur vide (obligatoire)
     */
    public User() {
    }

    /**
     * Constructeur complet
     */
    public User(Long id, String firstName, String lastName, String email,
                String password, Role role, Boolean active, LocalDateTime createdAt) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.role = role;
        this.active = active;
        this.createdAt = createdAt;
    }

    public Long getId() {
        return id;
    }

    /**
     * Setter ID
     */
    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    /**
     * Setter prénom
     */
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    /**
     * Setter nom
     */
    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    /**
     * Setter email
     */
    public void setEmail(String email) {
        this.email = email;
    }

    /**
     * Username = email (Spring Security)
     */
    @Override
    public String getUsername() {
        return email;
    }

    /**
     * Mot de passe (Spring Security)
     */
    @Override
    public String getPassword() {
        return password;
    }

    /**
     * Setter mot de passe
     */
    public void setPassword(String password) {
        this.password = password;
    }

    public Role getRole() {
        return role;
    }

    /**
     * Setter rôle
     */
    public void setRole(Role role) {
        this.role = role;
    }

    public Boolean getActive() {
        return active;
    }

    /**
     * Setter active
     */
    public void setActive(Boolean active) {
        this.active = active;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    /**
     * Setter createdAt
     */
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    /**
     * Convertit le rôle en autorité Spring Security
     */
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    /**
     * Compte non expiré
     */
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    /**
     * Compte non verrouillé
     */
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    /**
     * Credentials valides
     */
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    /**
     * Compte activé
     */
    @Override
    public boolean isEnabled() {
        return Boolean.TRUE.equals(active);
    }

    /**
     * Pour debug uniquement
     */
    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", email='" + email + '\'' +
                ", role=" + role +
                ", active=" + active +
                '}';
    }
}