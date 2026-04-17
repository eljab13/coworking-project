import API from "./axiosConfig";

// ============================================================
// API AUTHENTIFICATION
// ============================================================

const authApi = {
  register: (userData) => API.post("/auth/register", userData),

  login: (credentials) => API.post("/auth/login", credentials),

  refreshToken: (refreshToken) => API.post("/auth/refresh", { refreshToken }),

  forgotPassword: (email) => API.post("/auth/forgot-password", { email }),

  getProfile: () => API.get("/auth/profile"),

  updateProfile: (data) => API.put("/auth/profile", data),

  changePassword: (data) => API.put("/auth/change-password", data),
};

export default authApi;
