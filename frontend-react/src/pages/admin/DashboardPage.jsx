import React, { useEffect, useState } from "react";
import StatCard from "../../components/admin/StatCard";
import {
  FiCalendar,
  FiDollarSign,
  FiUsers,
  FiTrendingUp,
} from "react-icons/fi";
import API from "../../api/axiosConfig";

const DashboardPage = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔥 Charger depuis backend
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await API.get("/admin/stats/dashboard");
        setStats(res.data);
      } catch (err) {
        console.error(err);
        alert("Erreur chargement dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <p className="text-center mt-20">Chargement dashboard...</p>;
  }

  if (!stats) {
    return <p className="text-center mt-20">Aucune donnée</p>;
  }

  const {
    totalReservations = 0,
    totalRevenue = 0,
    occupancyRate = 0,
    totalUsers = 0,
  } = stats;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-8">
        Tableau de bord
      </h1>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Total Réservations"
          value={totalReservations}
          icon={<FiCalendar className="w-5 h-5" />}
          color="blue"
        />
        <StatCard
          title="Revenus"
          value={`${Number(totalRevenue).toLocaleString("fr-FR")} MAD`}
          icon={<FiDollarSign className="w-5 h-5" />}
          color="green"
        />
        <StatCard
          title="Taux d'occupation"
          value={`${occupancyRate}%`}
          icon={<FiTrendingUp className="w-5 h-5" />}
          color="yellow"
        />
        <StatCard
          title="Utilisateurs"
          value={totalUsers}
          icon={<FiUsers className="w-5 h-5" />}
          color="purple"
        />
      </div>

      {/* Message simple (car backend ne fournit pas encore les charts) */}
      <div className="bg-white p-6 rounded-xl shadow">
        <p className="text-gray-600 text-center">
          📊 Les graphiques seront ajoutés plus tard (backend nécessaire)
        </p>
      </div>
    </div>
  );
};

export default DashboardPage;