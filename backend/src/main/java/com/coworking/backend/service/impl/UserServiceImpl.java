package com.coworking.backend.service.impl;

import com.coworking.backend.dto.UserRequestDto;
import com.coworking.backend.dto.UserResponseDto;
import com.coworking.backend.entity.User;
import com.coworking.backend.repository.UserRepository;
import com.coworking.backend.service.UserService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Implémentation du service utilisateur.
 *
 * Cette classe contient la logique métier liée aux utilisateurs.
 */
@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    /**
     * Injection du repository via constructeur.
     */
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /**
     * Enregistre un utilisateur à partir d'un UserRequestDto
     * puis retourne un UserResponseDto.
     */
    @Override
    public UserResponseDto saveUser(UserRequestDto userRequestDto) {

        User user = new User();
        user.setFirstName(userRequestDto.getFirstName());
        user.setLastName(userRequestDto.getLastName());
        user.setEmail(userRequestDto.getEmail());
        user.setPassword(userRequestDto.getPassword());
        user.setRole(userRequestDto.getRole());
        user.setActive(userRequestDto.getActive());
        user.setCreatedAt(userRequestDto.getCreatedAt());

        User savedUser = userRepository.save(user);

        return mapToResponseDto(savedUser);
    }

    /**
     * Retourne tous les utilisateurs sous forme de liste de DTO.
     */
    @Override
    public List<UserResponseDto> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(this::mapToResponseDto)
                .collect(Collectors.toList());
    }

    /**
     * Recherche un utilisateur par son id.
     */
    @Override
    public Optional<UserResponseDto> getUserById(Long id) {
        return userRepository.findById(id)
                .map(this::mapToResponseDto);
    }

    /**
     * Recherche un utilisateur par son email.
     */
    @Override
    public Optional<UserResponseDto> getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .map(this::mapToResponseDto);
    }

    /**
     * Supprime un utilisateur par son id.
     */
    @Override
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    /**
     * Méthode utilitaire de conversion Entity -> Response DTO
     */
    private UserResponseDto mapToResponseDto(User user) {
        UserResponseDto dto = new UserResponseDto();
        dto.setId(user.getId());
        dto.setFirstName(user.getFirstName());
        dto.setLastName(user.getLastName());
        dto.setEmail(user.getEmail());
        dto.setRole(user.getRole());
        dto.setActive(user.getActive());
        dto.setCreatedAt(user.getCreatedAt());
        return dto;
    }
}