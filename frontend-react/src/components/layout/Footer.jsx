import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          {/* Copyright */}
          <p className="text-sm text-gray-400 text-center md:text-left">
            &copy; 2026 CoWork - Systeme de Gestion de Reservation d'Espaces de Coworking
          </p>

          {/* Links */}
          <div className="flex items-center space-x-6">
            <Link
              to="/about"
              className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
            >
              A propos
            </Link>
            <Link
              to="/contact"
              className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
            >
              Contact
            </Link>
            <Link
              to="/legal"
              className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
            >
              Mentions legales
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
