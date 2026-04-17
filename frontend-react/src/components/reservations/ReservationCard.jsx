import React from "react";
import { FiCalendar, FiClock, FiMapPin, FiX } from "react-icons/fi";

const STATUS_CONFIG = {
  EN_ATTENTE: {
    label: "En attente",
    bg: "bg-yellow-100",
    text: "text-yellow-800",
    border: "border-yellow-300",
  },
  CONFIRMEE: {
    label: "Confirmée",
    bg: "bg-green-100",
    text: "text-green-800",
    border: "border-green-300",
  },
  ANNULEE: {
    label: "Annulée",
    bg: "bg-red-100",
    text: "text-red-800",
    border: "border-red-300",
  },
  TERMINEE: {
    label: "Terminée",
    bg: "bg-gray-100",
    text: "text-gray-800",
    border: "border-gray-300",
  },
};

const TYPE_LABELS = {
  MEETING_ROOM: "Salle de réunion",
  PRIVATE_OFFICE: "Bureau individuel",
  OPEN_SPACE: "Open Space",
};

function formatDate(dateString) {
  if (!dateString) return "-";

  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) return "-";

  return date.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function formatTimeSlot(timeSlot) {
  switch (timeSlot) {
    case "MORNING":
      return "Matin";
    case "AFTERNOON":
      return "Après-midi";
    case "FULL_DAY":
      return "Journée complète";
    default:
      return timeSlot || "-";
  }
}

export default function ReservationCard({ reservation, onCancel }) {
  const {
    id,
    spaceName,
    spaceType,
    spaceLocation,
    startDate,
    endDate,
    timeSlot,
    status,
    totalPrice,
  } = reservation;

  const statusConfig = STATUS_CONFIG[status] || STATUS_CONFIG.EN_ATTENTE;
  const typeLabel = TYPE_LABELS[spaceType] || spaceType;
  const canCancel = status === "EN_ATTENTE" || status === "CONFIRMEE";

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 truncate">
            {spaceName}
          </h3>
          <span className="inline-block mt-1 px-2.5 py-0.5 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
            {typeLabel}
          </span>
        </div>

        <span
          className={`flex-shrink-0 inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full border ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border}`}
        >
          {statusConfig.label}
        </span>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-gray-600">
          <FiMapPin className="w-4 h-4 mr-2 flex-shrink-0 text-gray-400" />
          <span>{spaceLocation || "-"}</span>
        </div>

        <div className="flex items-center text-sm text-gray-600">
          <FiCalendar className="w-4 h-4 mr-2 flex-shrink-0 text-gray-400" />
          <span>
            {formatDate(startDate)}
            {endDate && endDate !== startDate ? ` → ${formatDate(endDate)}` : ""}
          </span>
        </div>

        <div className="flex items-center text-sm text-gray-600">
          <FiClock className="w-4 h-4 mr-2 flex-shrink-0 text-gray-400" />
          <span>{formatTimeSlot(timeSlot)}</span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <div className="text-lg font-bold text-gray-900">
          {totalPrice != null ? `${Number(totalPrice).toFixed(2)} MAD` : "—"}
        </div>

        {canCancel && (
          <button
            onClick={() => onCancel(id)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors duration-150 cursor-pointer"
          >
            <FiX className="w-4 h-4" />
            Annuler
          </button>
        )}
      </div>
    </div>
  );
}