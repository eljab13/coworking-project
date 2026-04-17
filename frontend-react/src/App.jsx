import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Layout from "./components/layout/Layout";
import ProtectedRoute from "./components/common/ProtectedRoute";

// Pages publiques
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SpacesPage from "./pages/SpacesPage";
import SpaceDetailPage from "./pages/SpaceDetailPage";
import NotFoundPage from "./pages/NotFoundPage";

// Pages protégées (MEMBER)
import MyReservationsPage from "./pages/MyReservationsPage";
import ProfilePage from "./pages/ProfilePage";

// Pages admin
import DashboardPage from "./pages/admin/DashboardPage";
import ManageSpacesPage from "./pages/admin/ManageSpacesPage";
import ManageUsersPage from "./pages/admin/ManageUsersPage";
import AllReservationsPage from "./pages/admin/AllReservationsPage";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            {/* Routes publiques */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/spaces" element={<SpacesPage />} />
            <Route path="/spaces/:id" element={<SpaceDetailPage />} />

            {/* Routes protégées (utilisateur connecté) */}
            <Route
              path="/my-reservations"
              element={
                <ProtectedRoute>
                  <MyReservationsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />

            {/* Routes admin */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute requiredRole="ROLE_ADMIN">
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/spaces"
              element={
                <ProtectedRoute requiredRole="ROLE_ADMIN">
                  <ManageSpacesPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <ProtectedRoute requiredRole="ROLE_ADMIN">
                  <ManageUsersPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/reservations"
              element={
                <ProtectedRoute requiredRole="ROLE_ADMIN">
                  <AllReservationsPage />
                </ProtectedRoute>
              }
            />

            {/* 404 */}
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
