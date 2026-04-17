import React from "react";
import { FiStar, FiUser, FiTrash2 } from "react-icons/fi";

const ReviewItem = ({ review, onDelete }) => {
  const { id, userName, rating, comment, date } = review;

  const formattedDate = new Date(date).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow duration-200">
      {/* Header: user info + delete */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
            <FiUser className="text-blue-600 w-5 h-5" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 text-sm">
              {userName}
            </h4>
            <p className="text-xs text-gray-400">{formattedDate}</p>
          </div>
        </div>

        {onDelete && (
          <button
            onClick={() => onDelete(id)}
            className="text-gray-400 hover:text-red-500 transition-colors p-1 rounded-lg hover:bg-red-50"
            title="Supprimer cet avis"
          >
            <FiTrash2 className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Star rating */}
      <div className="flex items-center gap-0.5 mb-3">
        {[1, 2, 3, 4, 5].map((star) => (
          <FiStar
            key={star}
            className={`w-4 h-4 ${
              star <= rating
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300"
            }`}
          />
        ))}
        <span className="ml-2 text-xs text-gray-500 font-medium">
          {rating}/5
        </span>
      </div>

      {/* Comment */}
      <p className="text-gray-600 text-sm leading-relaxed">{comment}</p>
    </div>
  );
};

export default ReviewItem;
