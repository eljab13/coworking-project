import React, { useState } from "react";
import { FiUser, FiUsers } from "react-icons/fi";

const roleBadgeStyles = {
  ROLE_ADMIN: "bg-red-100 text-red-700",
  ROLE_MEMBER: "bg-blue-100 text-blue-700",
  ROLE_VISITOR: "bg-gray-100 text-gray-700",
};

const roleLabels = {
  ROLE_ADMIN: "Admin",
  ROLE_MEMBER: "Membre",
  ROLE_VISITOR: "Visiteur",
};

const allRoles = ["ROLE_VISITOR", "ROLE_MEMBER", "ROLE_ADMIN"];

const UserTable = ({ users = [], onToggleActive, onChangeRole }) => {
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (userId) => {
    setOpenDropdown(openDropdown === userId ? null : userId);
  };

  const handleRoleChange = (userId, newRole) => {
    onChangeRole(userId, newRole);
    setOpenDropdown(null);
  };

  if (users.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-10 text-center">
        <FiUsers className="w-12 h-12 text-gray-300 mx-auto mb-3" />
        <p className="text-gray-500 text-sm">Aucun utilisateur trouve.</p>
      </div>
    );
  }

  return (
    <>
      {/* Desktop table view */}
      <div className="hidden md:block bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Nom
              </th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Statut
              </th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.map((user) => (
              <tr
                key={user.id}
                className="hover:bg-gray-50 transition-colors"
              >
                {/* Nom */}
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <FiUser className="w-4 h-4 text-blue-600" />
                    </div>
                    <span className="text-sm font-medium text-gray-800">
                      {user.name || user.userName || user.username || "—"}
                    </span>
                  </div>
                </td>

                {/* Email */}
                <td className="px-5 py-4">
                  <span className="text-sm text-gray-600">
                    {user.email || "—"}
                  </span>
                </td>

                {/* Role */}
                <td className="px-5 py-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      roleBadgeStyles[user.role] || roleBadgeStyles.ROLE_VISITOR
                    }`}
                  >
                    {roleLabels[user.role] || user.role}
                  </span>
                </td>

                {/* Statut */}
                <td className="px-5 py-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      user.active
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                        user.active ? "bg-green-500" : "bg-red-500"
                      }`}
                    />
                    {user.active ? "Actif" : "Inactif"}
                  </span>
                </td>

                {/* Actions */}
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    {/* Toggle active button */}
                    <button
                      onClick={() => onToggleActive(user.id)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                        user.active
                          ? "bg-red-50 text-red-600 hover:bg-red-100"
                          : "bg-green-50 text-green-600 hover:bg-green-100"
                      }`}
                    >
                      {user.active ? "Desactiver" : "Activer"}
                    </button>

                    {/* Role dropdown */}
                    <div className="relative">
                      <button
                        onClick={() => toggleDropdown(user.id)}
                        className="px-3 py-1.5 text-xs font-medium rounded-lg bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors"
                      >
                        Role
                      </button>
                      {openDropdown === user.id && (
                        <div className="absolute right-0 mt-1 w-40 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                          {allRoles.map((role) => (
                            <button
                              key={role}
                              onClick={() => handleRoleChange(user.id, role)}
                              className={`w-full text-left px-4 py-2 text-xs hover:bg-gray-50 transition-colors ${
                                user.role === role
                                  ? "font-semibold text-blue-600 bg-blue-50"
                                  : "text-gray-700"
                              }`}
                            >
                              {roleLabels[role]}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile card view */}
      <div className="md:hidden space-y-3">
        {users.map((user) => (
          <div
            key={user.id}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-4"
          >
            {/* User header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <FiUser className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-800">
                    {user.name || user.userName || user.username || "—"}
                  </h4>
                  <p className="text-xs text-gray-500">{user.email || "—"}</p>
                </div>
              </div>
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  user.active
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                    user.active ? "bg-green-500" : "bg-red-500"
                  }`}
                />
                {user.active ? "Actif" : "Inactif"}
              </span>
            </div>

            {/* Role badge */}
            <div className="mb-3">
              <span className="text-xs text-gray-500 mr-2">Role :</span>
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  roleBadgeStyles[user.role] || roleBadgeStyles.ROLE_VISITOR
                }`}
              >
                {roleLabels[user.role] || user.role}
              </span>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
              <button
                onClick={() => onToggleActive(user.id)}
                className={`flex-1 px-3 py-2 text-xs font-medium rounded-lg transition-colors text-center ${
                  user.active
                    ? "bg-red-50 text-red-600 hover:bg-red-100"
                    : "bg-green-50 text-green-600 hover:bg-green-100"
                }`}
              >
                {user.active ? "Desactiver" : "Activer"}
              </button>

              <div className="relative flex-1">
                <button
                  onClick={() => toggleDropdown(user.id)}
                  className="w-full px-3 py-2 text-xs font-medium rounded-lg bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors text-center"
                >
                  Changer le role
                </button>
                {openDropdown === user.id && (
                  <div className="absolute right-0 bottom-full mb-1 w-full bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                    {allRoles.map((role) => (
                      <button
                        key={role}
                        onClick={() => handleRoleChange(user.id, role)}
                        className={`w-full text-left px-4 py-2 text-xs hover:bg-gray-50 transition-colors ${
                          user.role === role
                            ? "font-semibold text-blue-600 bg-blue-50"
                            : "text-gray-700"
                        }`}
                      >
                        {roleLabels[role]}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default UserTable;
