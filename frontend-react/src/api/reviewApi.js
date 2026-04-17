import API from "./axiosConfig";

// ============================================================
// API AVIS / NOTATIONS (BONUS)
// ============================================================
// TODO (Étudiants) : Ces fonctions appellent le backend Spring Boot.
// Endpoints suggérés :
//   GET  /api/spaces/:id/reviews   (avis d'un espace)
//   POST /api/spaces/:id/reviews   (laisser un avis - MEMBER)
//   DELETE /api/reviews/:id        (supprimer un avis - ADMIN)
// ============================================================

export const reviewApi = {
  // Avis d'un espace
  getBySpace: (spaceId) => API.get(`/spaces/${spaceId}/reviews`),

  // Laisser un avis
  create: (spaceId, reviewData) =>
    API.post(`/spaces/${spaceId}/reviews`, reviewData),

  // Supprimer un avis (ADMIN)
  delete: (id) => API.delete(`/reviews/${id}`),
};
