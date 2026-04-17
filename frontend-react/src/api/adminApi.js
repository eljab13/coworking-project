import API from "./axiosConfig";

// ============================================================
// API ADMINISTRATION
// ============================================================

const adminApi = {
  // Dashboard
  getDashboardStats: () => API.get("/admin/stats/dashboard"),

  // Liste des utilisateurs
  getUsers: (params) => API.get("/admin/users", { params }),

  // Changer le rôle
  updateUserRole: (id, data) => API.put(`/admin/users/${id}/role`, data),

  // Activer / désactiver
  toggleUser: (id) => API.put(`/admin/users/${id}/toggle`),

  // Toutes les réservations
  getAllReservations: () => API.get("/admin/reservations"),
};

export default adminApi;
