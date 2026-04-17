import React, { useEffect, useState } from "react";
import spaceApi from "../../api/spaceApi";
import { FiPlus, FiEdit, FiTrash2, FiSave, FiX } from "react-icons/fi";

const emptyForm = {
  name: "",
  type: "MEETING_ROOM",
  city: "",
  capacity: "",
  pricePerHour: "",
  description: "",
  equipments: "",
  imageUrl: "",
  available: true,
};

const spaceTypes = [
  { value: "MEETING_ROOM", label: "Salle de réunion" },
  { value: "PRIVATE_OFFICE", label: "Bureau individuel" },
  { value: "OPEN_SPACE", label: "Open Space" },
];

const typeLabels = {
  MEETING_ROOM: "Salle de réunion",
  PRIVATE_OFFICE: "Bureau individuel",
  OPEN_SPACE: "Open Space",
};

const ManageSpacesPage = () => {
  const [spaces, setSpaces] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => {
    fetchSpaces();
  }, []);

  const fetchSpaces = async () => {
    try {
      const res = await spaceApi.getAll();
      setSpaces(res.data);
    } catch (err) {
      console.error(err);
      alert("Erreur chargement espaces");
    } finally {
      setLoading(false);
    }
  };

  const openAddForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(true);
  };

  const openEditForm = (space) => {
    setForm({
      name: space.name || "",
      type: space.type || "MEETING_ROOM",
      city: space.city || space.location || "",
      capacity: String(space.capacity ?? ""),
      pricePerHour: String(space.pricePerHour ?? ""),
      description: space.description || "",
      equipments: (space.equipments || []).join(", "),
      imageUrl: space.imageUrl || (space.photos?.[0] ?? ""),
      available: space.available ?? true,
    });

    setEditingId(space.id);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingId(null);
    setForm(emptyForm);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const equipmentsArray = form.equipments
      .split(",")
      .map((eq) => eq.trim())
      .filter(Boolean);

    const payload = {
      name: form.name,
      type: form.type,
      location: form.city,
      city: form.city,
      capacity: Number(form.capacity),
      pricePerHour: Number(form.pricePerHour),
      description: form.description,
      equipments: equipmentsArray,
      imageUrl: form.imageUrl,
      photos: form.imageUrl ? [form.imageUrl] : [],
      available: form.available,
    };

    try {
      if (editingId) {
        await spaceApi.update(editingId, payload);
      } else {
        await spaceApi.create(payload);
      }

      await fetchSpaces();
      closeForm();
    } catch (err) {
      console.error(err);
      alert("Erreur lors de l'enregistrement de l'espace");
    }
  };

  const handleDelete = async (id) => {
    try {
      await spaceApi.delete(id);
      await fetchSpaces();
      setDeleteConfirm(null);
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la suppression");
    }
  };

  if (loading) {
    return <p className="text-center mt-20">Chargement espaces...</p>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <h1 className="text-2xl font-bold text-gray-800">
          Gestion des Espaces
        </h1>
        <button
          onClick={openAddForm}
          className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          <FiPlus className="w-4 h-4" />
          Ajouter un espace
        </button>
      </div>

      <div className="hidden md:block bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Nom
              </th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Ville
              </th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Capacité
              </th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Prix/h
              </th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Disponible
              </th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {spaces.map((space) => (
              <tr key={space.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-5 py-4">
                  <span className="text-sm font-medium text-gray-800">
                    {space.name}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                    {typeLabels[space.type] || space.type}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <span className="text-sm text-gray-600">
                    {space.city || space.location}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <span className="text-sm text-gray-600">{space.capacity}</span>
                </td>
                <td className="px-5 py-4">
                  <span className="text-sm font-medium text-gray-800">
                    {space.pricePerHour} MAD
                  </span>
                </td>
                <td className="px-5 py-4">
                  <span className={space.available ? "text-green-600" : "text-red-600"}>
                    {space.available ? "Oui" : "Non"}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openEditForm(space)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Modifier"
                    >
                      <FiEdit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(space.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Supprimer"
                    >
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {spaces.length === 0 && (
          <div className="p-10 text-center text-gray-500 text-sm">
            Aucun espace disponible.
          </div>
        )}
      </div>

      <div className="md:hidden space-y-3">
        {spaces.map((space) => (
          <div
            key={space.id}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-4"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-sm font-semibold text-gray-800">
                  {space.name}
                </h3>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700 mt-1">
                  {typeLabels[space.type] || space.type}
                </span>
              </div>
              <span className="text-sm font-semibold text-gray-800">
                {space.pricePerHour} MAD/h
              </span>
            </div>

            <div className="text-xs text-gray-500 mb-3 space-y-1">
              <p>Ville : {space.city || space.location}</p>
              <p>Capacité : {space.capacity} personnes</p>
              <p>Disponible : {space.available ? "Oui" : "Non"}</p>
            </div>

            <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
              <button
                onClick={() => openEditForm(space)}
                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <FiEdit className="w-3.5 h-3.5" />
                Modifier
              </button>
              <button
                onClick={() => setDeleteConfirm(space.id)}
                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
              >
                <FiTrash2 className="w-3.5 h-3.5" />
                Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800">
                {editingId ? "Modifier l'espace" : "Ajouter un espace"}
              </h2>
              <button
                onClick={closeForm}
                className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nom de l'espace
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Type
                  </label>
                  <select
                    name="type"
                    value={form.type}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm bg-white"
                  >
                    {spaceTypes.map((t) => (
                      <option key={t.value} value={t.value}>
                        {t.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ville
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm"
                    placeholder="Casablanca"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Capacité
                  </label>
                  <input
                    type="number"
                    name="capacity"
                    value={form.capacity}
                    onChange={handleChange}
                    required
                    min="1"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Prix/heure (MAD)
                  </label>
                  <input
                    type="number"
                    name="pricePerHour"
                    value={form.pricePerHour}
                    onChange={handleChange}
                    required
                    min="1"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Équipements (séparés par des virgules)
                </label>
                <input
                  type="text"
                  name="equipments"
                  value={form.equipments}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm"
                  placeholder="WIFI, PROJECTOR, AC"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  URL image
                </label>
                <input
                  type="text"
                  name="imageUrl"
                  value={form.imageUrl}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  id="available"
                  type="checkbox"
                  name="available"
                  checked={form.available}
                  onChange={handleChange}
                />
                <label htmlFor="available" className="text-sm text-gray-700">
                  Disponible
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeForm}
                  className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <FiX className="w-4 h-4" />
                  Annuler
                </button>

                <button
                  type="submit"
                  className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <FiSave className="w-4 h-4" />
                  {editingId ? "Mettre à jour" : "Ajouter"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-sm p-6">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mx-auto mb-4">
              <FiTrash2 className="w-6 h-6 text-red-600" />
            </div>

            <h3 className="text-lg font-semibold text-gray-800 text-center mb-2">
              Confirmer la suppression
            </h3>

            <p className="text-sm text-gray-500 text-center mb-6">
              Êtes-vous sûr de vouloir supprimer cet espace ?
            </p>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Annuler
              </button>

              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageSpacesPage;