import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-primary-600">404</h1>
        <h2 className="text-3xl font-semibold text-gray-800 mt-4">
          Page non trouvée
        </h2>
        <p className="text-gray-500 mt-2 mb-8">
          La page que vous recherchez n'existe pas ou a été déplacée.
        </p>
        <Link to="/" className="btn-primary text-lg px-8 py-3">
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
}
