import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import spaceApi from "../api/spaceApi";
import reservationApi from "../api/reservationApi";
import ReservationForm from "../components/reservations/ReservationForm";
import { useAuth } from "../context/AuthContext";

const SpaceDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [space, setSpace] = useState(null);
  const [availability, setAvailability] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSpace = async () => {
      try {
        setError("");
        const res = await spaceApi.getById(id);
        setSpace(res.data);
      } catch (err) {
        console.error("Erreur chargement espace :", err);
        setError("Impossible de charger le détail de l'espace.");
      } finally {
        setLoading(false);
      }
    };

    fetchSpace();
  }, [id]);

  const handleDateChange = async (date) => {
    try {
      const res = await spaceApi.getAvailability(id, date);
      setAvailability(res.data);
    } catch (err) {
      console.error("Erreur disponibilité :", err);
      setAvailability({ available: false });
    }
  };

  const handleReservationSubmit = async (data) => {
    try {
      await reservationApi.create({
        spaceId: Number(id),
        startDate: data.date,
        endDate: data.date,
        timeSlot: data.timeSlots[0],
      });

      alert("Réservation créée avec succès !");
    } catch (err) {
      console.error("Erreur réservation :", err);
      alert(
        err?.response?.data?.message ||
          err?.response?.data?.error ||
          "Erreur lors de la réservation"
      );
    }
  };

  if (loading) {
    return <div className="p-8 text-center">Chargement...</div>;
  }

  if (error) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-500 mb-4">{error}</p>
        <button
          onClick={() => navigate("/spaces")}
          className="px-4 py-2 bg-indigo-600 text-white rounded"
        >
          Retour aux espaces
        </button>
      </div>
    );
  }

  if (!space) {
    return (
      <div className="p-8 text-center">
        <p>Espace non trouvé.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <button
          onClick={() => navigate("/spaces")}
          className="mb-6 text-indigo-600"
        >
          ← Retour
        </button>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h1 className="text-3xl font-bold mb-2">{space.name}</h1>
          <p className="text-gray-500 mb-4">{space.location || space.city}</p>

          {space.photos && space.photos.length > 0 && (
            <img
              src={space.photos[0]}
              alt={space.name}
              className="w-full h-72 object-cover rounded-lg mb-6"
            />
          )}

          <p className="mb-4">{space.description}</p>

          <div className="space-y-2 mb-6">
            <p><strong>Type :</strong> {space.type}</p>
            <p><strong>Capacité :</strong> {space.capacity}</p>
            <p><strong>Prix :</strong> {space.pricePerHour} MAD / heure</p>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-3">Équipements</h2>
            <div className="flex flex-wrap gap-2">
              {space.equipments && space.equipments.length > 0 ? (
                space.equipments.map((eq) => (
                  <span
                    key={eq}
                    className="bg-gray-200 px-3 py-1 rounded-full text-sm"
                  >
                    {eq}
                  </span>
                ))
              ) : (
                <span className="text-gray-500">Aucun équipement</span>
              )}
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Réservation</h2>

            {isAuthenticated ? (
              <ReservationForm
                space={space}
                availability={availability}
                onSubmit={handleReservationSubmit}
                onDateChange={handleDateChange}
              />
            ) : (
              <Link to="/login" className="text-indigo-600">
                Connectez-vous pour réserver
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpaceDetailPage;