import React, { useEffect, useMemo, useState } from "react";
import { FiCalendar } from "react-icons/fi";
import adminApi from "../../api/adminApi";

const statusTabs = [
  { value: "ALL", label: "Toutes" },
  { value: "EN_ATTENTE", label: "En attente" },
  { value: "CONFIRMEE", label: "Confirmée" },
  { value: "ANNULEE", label: "Annulée" },
  { value: "TERMINEE", label: "Terminée" },
];

const statusBadgeStyles = {
  EN_ATTENTE: "bg-yellow-100 text-yellow-800",
  CONFIRMEE: "bg-green-100 text-green-800",
  ANNULEE: "bg-red-100 text-red-800",
  TERMINEE: "bg-gray-100 text-gray-800",
};

const AllReservationsPage = () => {
  const [activeTab, setActiveTab] = useState("ALL");
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔥 FETCH BACKEND
  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const res = await adminApi.getAllReservations();
        setReservations(res.data);
      } catch (err) {
        console.error(err);
        alert("Erreur chargement reservations");
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  const filteredReservations = useMemo(() => {
    const sorted = [...reservations].sort(
      (a, b) => new Date(b.startDate) - new Date(a.startDate)
    );

    if (activeTab === "ALL") return sorted;

    return sorted.filter((r) => r.status === activeTab);
  }, [reservations, activeTab]);

  const formatDate = (dateStr) => {
    if (!dateStr) return "-";

    return new Date(dateStr).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatTimeSlot = (slot) => {
    switch (slot) {
      case "MORNING":
        return "Matin";
      case "AFTERNOON":
        return "Après-midi";
      case "FULL_DAY":
        return "Journée complète";
      default:
        return slot || "-";
    }
  };

  if (loading) {
    return <p className="text-center mt-20">Chargement...</p>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-8">
        Toutes les Réservations
      </h1>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {statusTabs.map((tab) => {
          const isActive = activeTab === tab.value;

          return (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`px-4 py-2 text-sm font-medium rounded-lg ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow border overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
            <tr>
              <th className="px-4 py-3 text-left">ID</th>
              <th className="px-4 py-3 text-left">Utilisateur</th>
              <th className="px-4 py-3 text-left">Espace</th>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left">Créneau</th>
              <th className="px-4 py-3 text-left">Statut</th>
              <th className="px-4 py-3 text-left">Montant</th>
            </tr>
          </thead>

          <tbody>
            {filteredReservations.map((res) => (
              <tr key={res.id} className="border-t">
                <td className="px-4 py-3">#{res.id}</td>

                <td className="px-4 py-3">
                  {res.userFirstName} {res.userLastName}
                </td>

                <td className="px-4 py-3">
                  <div>
                    <div>{res.spaceName}</div>
                    <small className="text-gray-500">
                      {res.spaceLocation}
                    </small>
                  </div>
                </td>

                <td className="px-4 py-3">
                  {formatDate(res.startDate)}
                </td>

                <td className="px-4 py-3">
                  {formatTimeSlot(res.timeSlot)}
                </td>

                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 text-xs rounded ${
                      statusBadgeStyles[res.status] || ""
                    }`}
                  >
                    {res.status}
                  </span>
                </td>

                <td className="px-4 py-3">
                  {res.totalPrice} MAD
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredReservations.length === 0 && (
          <div className="p-10 text-center text-gray-500">
            <FiCalendar className="mx-auto mb-3 text-3xl" />
            Aucune réservation
          </div>
        )}
      </div>
    </div>
  );
};

export default AllReservationsPage;