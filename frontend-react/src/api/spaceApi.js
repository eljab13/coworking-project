import API from "./axiosConfig";

// ============================================================
// API ESPACES
// ============================================================

const spaceApi = {
  // Liste des espaces avec filtres et pagination
  getAll: (params) => API.get("/spaces", { params }),

  // Détail d'un espace
  getById: (id) => API.get(`/spaces/${id}`),

  // Créer un espace (ADMIN uniquement)
  create: (spaceData) => API.post("/spaces", spaceData),

  // Modifier un espace (ADMIN uniquement)
  update: (id, spaceData) => API.put(`/spaces/${id}`, spaceData),

  // Supprimer un espace (ADMIN uniquement)
  delete: (id) => API.delete(`/spaces/${id}`),

  // Vérifier la disponibilité d'un espace
  getAvailability: (id, date) =>
    API.get(`/spaces/${id}/availability`, { params: { date } }),
};

export default spaceApi;
