import { createContext, useContext, useEffect, useState } from "react";
import authApi from "../api/authApi";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const restoreSession = async () => {
      const accessToken = localStorage.getItem("accessToken");
      const savedUser = localStorage.getItem("user");

      if (!accessToken) {
        setLoading(false);
        return;
      }

      try {
        if (savedUser) {
          setUser(JSON.parse(savedUser));
          setIsAuthenticated(true);
        } else {
          const profileRes = await authApi.getProfile();
          const profile = profileRes.data;

          const normalizedUser = {
            id: profile.id ?? null,
            firstName: profile.firstName ?? "",
            lastName: profile.lastName ?? "",
            email: profile.email ?? "",
            role: profile.role ?? "ROLE_MEMBER",
            active: profile.active ?? true,
          };

          localStorage.setItem("user", JSON.stringify(normalizedUser));
          setUser(normalizedUser);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Erreur restauration session :", error);
        localStorage.removeItem("user");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    restoreSession();
  }, []);

  const login = async (email, password) => {
    try {
      const res = await authApi.login({ email, password });
      const data = res.data;

      const accessToken = data.accessToken || data.token || data.jwt || null;
      const refreshToken = data.refreshToken || null;

      if (!accessToken) {
        return {
          success: false,
          message: "Token d'accès introuvable dans la réponse du backend",
        };
      }

      localStorage.setItem("accessToken", accessToken);
      if (refreshToken) {
        localStorage.setItem("refreshToken", refreshToken);
      }

      // 🔥 récupérer le vrai profil après login
      const profileRes = await authApi.getProfile();
      const profile = profileRes.data;

      const loggedUser = {
        id: profile.id ?? null,
        firstName: profile.firstName ?? "",
        lastName: profile.lastName ?? "",
        email: profile.email ?? email,
        role: profile.role ?? "ROLE_MEMBER",
        active: profile.active ?? true,
      };

      localStorage.setItem("user", JSON.stringify(loggedUser));

      setUser(loggedUser);
      setIsAuthenticated(true);

      return { success: true };
    } catch (error) {
      console.error("Erreur login :", error);

      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Email ou mot de passe incorrect";

      return { success: false, message };
    }
  };

  const register = async (userData) => {
    try {
      await authApi.register(userData);

      // après inscription, on peut laisser connecté seulement si backend le permet
      return { success: true };
    } catch (error) {
      console.error("Erreur register :", error);

      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Erreur lors de l'inscription";

      return { success: false, message };
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);

    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  };

  const normalizedRole = user?.role?.startsWith("ROLE_")
    ? user.role
    : user?.role
    ? `ROLE_${user.role}`
    : null;

  const isAdmin = normalizedRole === "ROLE_ADMIN";
  const isMember =
    normalizedRole === "ROLE_MEMBER" || normalizedRole === "ROLE_USER";

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isAdmin,
        isMember,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth doit être utilisé dans un AuthProvider");
  }
  return context;
};