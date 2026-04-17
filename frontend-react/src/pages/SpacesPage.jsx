import { useState, useEffect, useMemo } from "react";
import { FiGrid, FiSearch } from "react-icons/fi";
import spaceApi from "../api/spaceApi";
import SpaceFilter from "../components/spaces/SpaceFilter";
import SpaceList from "../components/spaces/SpaceList";
import Pagination from "../components/common/Pagination";

const ITEMS_PER_PAGE = 6;

const SpacesPage = () => {
  const [spaces, setSpaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [filters, setFilters] = useState({
    name: "",
    type: "",
    city: "",
    capacityMin: "",
    capacityMax: "",
    priceMax: "",
    equipments: [],
  });

  const [currentPage, setCurrentPage] = useState(1);

  // 🔥 Charger les espaces depuis backend
  useEffect(() => {
    const fetchSpaces = async () => {
      try {
        const res = await spaceApi.getAll();
        setSpaces(res.data);
      } catch (err) {
        console.error(err);
        setError("Erreur lors du chargement des espaces");
      } finally {
        setLoading(false);
      }
    };

    fetchSpaces();
  }, []);

  // 🔥 Filtrage côté frontend
  const filteredSpaces = useMemo(() => {
    return spaces.filter((space) => {
      if (
        filters.name &&
        !space.name.toLowerCase().includes(filters.name.toLowerCase())
      ) return false;

      if (filters.type && space.type !== filters.type) return false;

      if (filters.city && space.city !== filters.city) return false;

      if (filters.capacityMin && space.capacity < Number(filters.capacityMin))
        return false;

      if (filters.capacityMax && space.capacity > Number(filters.capacityMax))
        return false;

      if (filters.priceMax && space.pricePerHour > Number(filters.priceMax))
        return false;

      if (filters.equipments.length > 0) {
        const hasAll = filters.equipments.every((eq) =>
          space.equipments?.includes(eq)
        );
        if (!hasAll) return false;
      }

      return true;
    });
  }, [spaces, filters]);

  const totalPages = Math.ceil(filteredSpaces.length / ITEMS_PER_PAGE);

  const paginatedSpaces = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredSpaces.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredSpaces, currentPage]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <FiGrid className="w-8 h-8 text-white/80" />
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              Nos Espaces de Coworking
            </h1>
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="max-w-7xl mx-auto px-4 py-8">

        <SpaceFilter filters={filters} onFilterChange={handleFilterChange} />

        {/* Loading */}
        {loading && (
          <p className="text-center text-gray-500">Chargement...</p>
        )}

        {/* Error */}
        {error && (
          <p className="text-center text-red-500">{error}</p>
        )}

        {/* Résultats */}
        {!loading && !error && (
          <>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <FiSearch className="w-5 h-5 text-gray-400" />
                <p className="text-gray-600 font-medium">
                  <span className="text-indigo-600 font-bold">
                    {filteredSpaces.length}
                  </span>{" "}
                  espaces trouvés
                </p>
              </div>
            </div>

            <SpaceList spaces={paginatedSpaces} />

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default SpacesPage;