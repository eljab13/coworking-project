package com.coworking.backend.dto;

import jakarta.validation.constraints.*;

import java.util.List;

/**
 * DTO de requête pour créer / modifier un espace.
 */
public class SpaceRequest {

    @NotBlank(message = "Le nom est obligatoire")
    private String name;

    @NotBlank(message = "La description est obligatoire")
    private String description;

    /**
     * Ancien champ conservé pour compatibilité
     */
    @NotBlank(message = "La localisation est obligatoire")
    private String location;

    /**
     * Nouveau champ plus frontend-friendly
     * Peut représenter la ville/site affiché côté UI
     */
    private String city;

    /**
     * Préparé pour future relation Site
     */
    private Long siteId;

    /**
     * Préparé pour affichage frontend
     */
    private String siteName;

    @NotNull(message = "La capacité est obligatoire")
    @Min(value = 1, message = "La capacité doit être supérieure à 0")
    private Integer capacity;

    /**
     * Ancien champ conservé pour compatibilité backend actuelle
     */
    @NotNull(message = "Le prix par jour est obligatoire")
    @DecimalMin(value = "0.0", inclusive = false, message = "Le prix doit être supérieur à 0")
    private Double pricePerDay;

    /**
     * Nouveau champ attendu par le frontend
     */
    private Double pricePerHour;

    @NotBlank(message = "Le type est obligatoire")
    private String type;

    @NotNull(message = "La disponibilité est obligatoire")
    private Boolean available;

    /**
     * Ancien champ conservé
     */
    private String imageUrl;

    /**
     * Nouveaux champs préparés pour le frontend
     */
    private List<String> photos;
    private List<String> equipments;

    public SpaceRequest() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public Long getSiteId() {
        return siteId;
    }

    public void setSiteId(Long siteId) {
        this.siteId = siteId;
    }

    public String getSiteName() {
        return siteName;
    }

    public void setSiteName(String siteName) {
        this.siteName = siteName;
    }

    public Integer getCapacity() {
        return capacity;
    }

    public void setCapacity(Integer capacity) {
        this.capacity = capacity;
    }

    public Double getPricePerDay() {
        return pricePerDay;
    }

    public void setPricePerDay(Double pricePerDay) {
        this.pricePerDay = pricePerDay;
    }

    public Double getPricePerHour() {
        return pricePerHour;
    }

    public void setPricePerHour(Double pricePerHour) {
        this.pricePerHour = pricePerHour;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Boolean getAvailable() {
        return available;
    }

    public void setAvailable(Boolean available) {
        this.available = available;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public List<String> getPhotos() {
        return photos;
    }

    public void setPhotos(List<String> photos) {
        this.photos = photos;
    }

    public List<String> getEquipments() {
        return equipments;
    }

    public void setEquipments(List<String> equipments) {
        this.equipments = equipments;
    }
}