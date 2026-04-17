import API from "./axiosConfig";

// ============================================================
// API RÉSERVATIONS
// ============================================================

const reservationApi = {
  // Créer une réservation
  create: (reservationData) => API.post("/reservations", reservationData),

  // Mes réservations
  getMyReservations: () => API.get("/reservations/me"),

  // Annuler une réservation
  cancel: (id) => API.put(`/reservations/${id}/cancel`),

  // Toutes les réservations (ADMIN)
  getAll: (params) => API.get("/admin/reservations", { params }),
};

export default reservationApi;
