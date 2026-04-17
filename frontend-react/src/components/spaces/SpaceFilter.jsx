import React, { useState } from "react";
import { FiSearch, FiFilter } from "react-icons/fi";
import { spaceTypes, allEquipments } from "../../data/mockData";

const initialFilters = {
  name: "",
  type: "",
  city: "",
  capacityMin: "",
  capacityMax: "",
  priceMax: "",
  equipments: [],
};

const SpaceFilter = ({ filters, onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    onFilterChange({ ...filters, [name]: value });
  };

  const handleEquipmentToggle = (equipment) => {
    const currentEquipments = filters.equipments || [];
    const updatedEquipments = currentEquipments.includes(equipment)
      ? currentEquipments.filter((eq) => eq !== equipment)
      : [...currentEquipments, equipment];

    onFilterChange({ ...filters, equipments: updatedEquipments });
  };

  const handleReset = () => {
    onFilterChange({ ...initialFilters });
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-5 mb-6">
      {/* Search Bar + Toggle */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search Input */}
        <div className="relative flex-1">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            name="name"
            value={filters.name || ""}
            onChange={handleChange}
            placeholder="Rechercher un espace..."
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
          />
        </div>

        {/* Toggle Filters Button (mobile) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="sm:hidden flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
        >
          <FiFilter className="w-4 h-4" />
          <span>Filtres</span>
        </button>
      </div>

      {/* Filter Panel */}
      <div
        className={`${
          isOpen ? "max-h-[2000px] opacity-100 mt-4" : "max-h-0 opacity-0 mt-0"
        } sm:max-h-none sm:opacity-100 sm:mt-4 overflow-hidden transition-all duration-300 ease-in-out`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Type Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Type d'espace
            </label>
            <select
              name="type"
              value={filters.type || ""}
              onChange={handleChange}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none bg-white transition-colors"
            >
              <option value="">Tous les types</option>
              {spaceTypes.map((st) => (
                <option key={st.value} value={st.value}>
                  {st.label}
                </option>
              ))}
            </select>
          </div>

          {/* City Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ville
            </label>
            <select
              name="city"
              value={filters.city || ""}
              onChange={handleChange}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none bg-white transition-colors"
            >
              <option value="">Toutes les villes</option>
              <option value="Casablanca">Casablanca</option>
              <option value="Rabat">Rabat</option>
            </select>
          </div>

          {/* Capacity Min */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Capacité min
            </label>
            <input
              type="number"
              name="capacityMin"
              value={filters.capacityMin || ""}
              onChange={handleChange}
              placeholder="Min"
              min="0"
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
            />
          </div>

          {/* Capacity Max */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Capacité max
            </label>
            <input
              type="number"
              name="capacityMax"
              value={filters.capacityMax || ""}
              onChange={handleChange}
              placeholder="Max"
              min="0"
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
            />
          </div>
        </div>

        {/* Price Max */}
        <div className="mt-4 max-w-xs">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Prix max (MAD/h)
          </label>
          <input
            type="number"
            name="priceMax"
            value={filters.priceMax || ""}
            onChange={handleChange}
            placeholder="Prix maximum"
            min="0"
            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
          />
        </div>

        {/* Equipments */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Équipements
          </label>
          <div className="flex flex-wrap gap-2">
            {allEquipments.map((equipment) => {
              const isSelected = (filters.equipments || []).includes(equipment);
              return (
                <button
                  key={equipment}
                  type="button"
                  onClick={() => handleEquipmentToggle(equipment)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors duration-200 ${
                    isSelected
                      ? "bg-indigo-600 text-white border-indigo-600"
                      : "bg-white text-gray-600 border-gray-300 hover:border-indigo-400 hover:text-indigo-600"
                  }`}
                >
                  {equipment}
                </button>
              );
            })}
          </div>
        </div>

        {/* Reset Button */}
        <div className="mt-4 flex justify-end">
          <button
            type="button"
            onClick={handleReset}
            className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
          >
            Réinitialiser
          </button>
        </div>
      </div>
    </div>
  );
};

export default SpaceFilter;
