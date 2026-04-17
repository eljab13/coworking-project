import { Link } from "react-router-dom";
import { FiSearch, FiCalendar, FiShield, FiArrowRight } from "react-icons/fi";
import { mockSpaces } from "../data/mockData";
import SpaceCard from "../components/spaces/SpaceCard";

const features = [
  {
    icon: FiSearch,
    title: "Espaces variés",
    description:
      "Salles de réunion, bureaux individuels et open spaces adaptés à tous vos besoins professionnels.",
    color: "bg-indigo-100 text-indigo-600",
  },
  {
    icon: FiCalendar,
    title: "Réservation facile",
    description:
      "Réservez votre espace de travail en quelques clics, à tout moment et depuis n'importe où.",
    color: "bg-emerald-100 text-emerald-600",
  },
  {
    icon: FiShield,
    title: "Sécurisé",
    description:
      "Authentification sécurisée et gestion fiable de vos réservations et données personnelles.",
    color: "bg-amber-100 text-amber-600",
  },
];

const Home = () => {
  const featuredSpaces = mockSpaces.slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* ===================== Hero Section ===================== */}
      <section className="relative bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 overflow-hidden">
        {/* Decorative background shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-white/5 rounded-full" />
          <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-white/5 rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/3 rounded-full" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
              Trouvez l'espace de{" "}
              <span className="text-indigo-200">travail idéal</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-indigo-100 leading-relaxed max-w-2xl mx-auto">
              Découvrez et réservez des espaces de coworking modernes et
              équipés. Salles de réunion, bureaux privés ou open spaces,
              trouvez l'espace parfait pour votre productivité.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/spaces"
                className="inline-flex items-center gap-2 bg-white text-indigo-700 font-semibold px-8 py-4 rounded-xl shadow-lg hover:bg-indigo-50 transition-colors duration-200 text-lg"
              >
                Explorer les espaces
                <FiArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== Features Section ===================== */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Pourquoi choisir <span className="text-indigo-600">CoWork</span> ?
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Une plateforme pensée pour simplifier votre quotidien professionnel.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="bg-white rounded-2xl p-8 shadow-md hover:shadow-lg transition-shadow duration-300 text-center"
                >
                  <div
                    className={`inline-flex items-center justify-center w-14 h-14 rounded-xl ${feature.color} mb-6`}
                  >
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===================== Featured Spaces Section ===================== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Espaces à la une
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Découvrez nos espaces de coworking les plus populaires.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredSpaces.map((space) => (
              <SpaceCard key={space.id} space={space} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/spaces"
              className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-semibold text-lg transition-colors duration-200"
            >
              Voir tous les espaces
              <FiArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
