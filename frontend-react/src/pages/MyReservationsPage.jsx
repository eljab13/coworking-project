import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  FiCalendar,
  FiClock,
  FiCheckCircle,
  FiXCircle,
  FiAlertCircle,
  FiInbox,
} from "react-icons/fi";

import ReservationCard from "../components/reservations/ReservationCard";
import { useAuth } from "../context/AuthContext";
import reservationApi from "../api/reservationApi";

const TABS = [
  { key: "ALL", label: "Toutes", icon: FiCalendar },
  { key: "EN_ATTENTE", label: "En attente", icon: FiClock },
  { key: "CONFIRMEE", label: "Confirmées", icon: FiCheckCircle },
  { key: "TERMINEE", label: "Terminées", icon: FiAlertCircle },
  { key: "ANNULEE", label: "Annulées", icon: FiXCircle },
];

const MyReservationsPage = () => {
  const { isAuthenticated } = useAuth();

  const [activeTab, setActiveTab] = useState("ALL");
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔥 Charger depuis backend
  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const res = await reservationApi.getMyReservations();
        setReservations(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  // 🔥 Tri + filtre
  const userReservations = useMemo(() => {
    return [...reservations].sort(
      (a, b) => new Date(b.startDate) - new Date(a.startDate)
    );
  }, [reservations]);

  const filteredReservations = useMemo(() => {
    if (activeTab === "ALL") return userReservations;
    return userReservations.filter((r) => r.status === activeTab);
  }, [userReservations, activeTab]);

  // 🔥 Stats
  const statusCounts = useMemo(() => {
    const counts = { ALL: userReservations.length };

    TABS.forEach((tab) => {
      if (tab.key !== "ALL") {
        counts[tab.key] = userReservations.filter(
          (r) => r.status === tab.key
        ).length;
      }
    });

    return counts;
  }, [userReservations]);

  // 🔥 Annulation réelle
  const handleCancel = async (reservationId) => {
    const confirmed = window.confirm("Annuler cette réservation ?");
    if (!confirmed) return;

    try {
      await reservationApi.cancel(reservationId);

      // refresh local
      setReservations((prev) =>
        prev.map((r) =>
          r.id === reservationId ? { ...r, status: "ANNULEE" } : r
        )
      );

    } catch (err) {
      console.error(err);
      alert("Erreur lors de l'annulation");
    }
  };

  // 🔴 non connecté
  if (!isAuthenticated) {
    return (
      <div className="text-center mt-20">
        <p>Connexion requise</p>
        <Link to="/login">Se connecter</Link>
      </div>
    );
  }

  // 🔴 loading
  if (loading) {
    return <p className="text-center mt-20">Chargement...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="max-w-7xl mx-auto px-4 py-8">

        <h1 className="text-2xl font-bold mb-6">Mes Réservations</h1>

        {/* Tabs */}
        <div className="flex gap-3 mb-6 flex-wrap">
          {TABS.map((tab) => {
            const count = statusCounts[tab.key] || 0;

            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-2 rounded ${
                  activeTab === tab.key
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-200"
                }`}
              >
                {tab.label} ({count})
              </button>
            );
          })}
        </div>

        {/* Liste */}
        {filteredReservations.length === 0 ? (
          <div className="text-center">
            <FiInbox className="mx-auto text-4xl mb-4" />
            <p>Aucune réservation</p>
            <Link to="/spaces">Explorer les espaces</Link>
          </div>
        ) : (
          <div className="grid gap-6">
            {filteredReservations.map((reservation) => (
              <ReservationCard
                key={reservation.id}
                reservation={reservation}
                onCancel={handleCancel}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyReservationsPage;