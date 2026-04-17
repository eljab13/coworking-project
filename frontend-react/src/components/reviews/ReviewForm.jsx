import React, { useState } from "react";
import { FiStar } from "react-icons/fi";

const ReviewForm = ({ onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const displayRating = hoveredRating || rating;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (rating === 0) return;
    if (!comment.trim()) return;

    setIsSubmitting(true);
    try {
      await onSubmit({ rating, comment: comment.trim() });
      setRating(0);
      setComment("");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
    >
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Laisser un avis
      </h3>

      {/* Star rating selector */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Votre note
        </label>
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoveredRating(star)}
              onMouseLeave={() => setHoveredRating(0)}
              className="p-1 rounded-md transition-transform duration-150 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            >
              <FiStar
                className={`w-7 h-7 transition-colors duration-150 ${
                  star <= displayRating
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300 hover:text-yellow-300"
                }`}
              />
            </button>
          ))}
          {displayRating > 0 && (
            <span className="ml-2 text-sm text-gray-500 font-medium">
              {displayRating}/5
            </span>
          )}
        </div>
        {rating === 0 && (
          <p className="mt-1 text-xs text-gray-400">
            Cliquez sur une etoile pour noter
          </p>
        )}
      </div>

      {/* Comment textarea */}
      <div className="mb-5">
        <label
          htmlFor="review-comment"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Votre commentaire
        </label>
        <textarea
          id="review-comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={4}
          placeholder="Partagez votre experience..."
          className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-shadow"
        />
      </div>

      {/* Submit button */}
      <button
        type="submit"
        disabled={rating === 0 || !comment.trim() || isSubmitting}
        className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
      >
        {isSubmitting ? "Envoi en cours..." : "Envoyer l'avis"}
      </button>
    </form>
  );
};

export default ReviewForm;
