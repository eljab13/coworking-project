import React, { useEffect, useMemo, useState } from "react";
import { FiSearch } from "react-icons/fi";
import UserTable from "../../components/admin/UserTable";
import adminApi from "../../api/adminApi";

const ManageUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await adminApi.getUsers();

        const formattedUsers = res.data.map((u) => ({
          ...u,
          name: `${u.firstName || ""} ${u.lastName || ""}`.trim(),
        }));

        setUsers(formattedUsers);
      } catch (err) {
        console.error(err);
        alert("Erreur chargement utilisateurs");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    if (!searchQuery.trim()) return users;

    const query = searchQuery.toLowerCase();

    return users.filter(
      (user) =>
        (user.name && user.name.toLowerCase().includes(query)) ||
        (user.firstName && user.firstName.toLowerCase().includes(query)) ||
        (user.lastName && user.lastName.toLowerCase().includes(query)) ||
        (user.email && user.email.toLowerCase().includes(query))
    );
  }, [users, searchQuery]);

  const handleToggleActive = async (userId) => {
    try {
      const res = await adminApi.toggleUser(userId);

      setUsers((prev) =>
        prev.map((u) =>
          u.id === userId
            ? {
                ...u,
                ...res.data,
                name: `${res.data.firstName || ""} ${res.data.lastName || ""}`.trim(),
              }
            : u
        )
      );
    } catch (err) {
      console.error(err);
      alert("Erreur lors du changement de statut");
    }
  };

  const handleChangeRole = async (userId, newRole) => {
    try {
      const res = await adminApi.updateUserRole(userId, { role: newRole });

      setUsers((prev) =>
        prev.map((u) =>
          u.id === userId
            ? {
                ...u,
                ...res.data,
                name: `${res.data.firstName || ""} ${res.data.lastName || ""}`.trim(),
              }
            : u
        )
      );
    } catch (err) {
      console.error(err);
      alert("Erreur lors du changement de rôle");
    }
  };

  if (loading) {
    return <p className="text-center mt-20">Chargement utilisateurs...</p>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-8">
        Gestion des Utilisateurs
      </h1>

      <div className="mb-6">
        <div className="relative max-w-md">
          <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher par nom ou email..."
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
          />
        </div>

        {searchQuery && (
          <p className="text-xs text-gray-500 mt-2">
            {filteredUsers.length} utilisateur
            {filteredUsers.length !== 1 ? "s" : ""} trouvé
            {filteredUsers.length !== 1 ? "s" : ""}
          </p>
        )}
      </div>

      <UserTable
        users={filteredUsers}
        onToggleActive={handleToggleActive}
        onChangeRole={handleChangeRole}
      />
    </div>
  );
};

export default ManageUsersPage;