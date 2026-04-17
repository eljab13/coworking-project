import { useState, useRef, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FiHome, FiLogIn, FiLogOut, FiUser, FiMenu, FiX } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [adminDropdownOpen, setAdminDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();

  // Close admin dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setAdminDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
    navigate("/");
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setAdminDropdownOpen(false);
  };

  const navLinkClasses = ({ isActive }) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
      isActive
        ? "bg-indigo-700 text-white"
        : "text-gray-300 hover:bg-indigo-500 hover:text-white"
    }`;

  const mobileNavLinkClasses = ({ isActive }) =>
    `block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
      isActive
        ? "bg-indigo-700 text-white"
        : "text-gray-300 hover:bg-indigo-500 hover:text-white"
    }`;

  return (
    <nav className="bg-indigo-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              to="/"
              className="text-white text-2xl font-bold tracking-wide hover:text-indigo-200 transition-colors duration-200"
            >
              CoWork
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {/* Main Links */}
            <NavLink to="/" end className={navLinkClasses}>
              <span className="flex items-center gap-1">
                <FiHome className="inline" />
                Accueil
              </span>
            </NavLink>
            <NavLink to="/spaces" className={navLinkClasses}>
              Espaces
            </NavLink>

            {isAuthenticated && (
              <>
                <NavLink to="/my-reservations" className={navLinkClasses}>
                  Mes Reservations
                </NavLink>
                <NavLink to="/profile" className={navLinkClasses}>
                  <span className="flex items-center gap-1">
                    <FiUser className="inline" />
                    Mon Profil
                  </span>
                </NavLink>
              </>
            )}

            {/* Admin Dropdown */}
            {isAdmin && (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setAdminDropdownOpen(!adminDropdownOpen)}
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-indigo-500 hover:text-white transition-colors duration-200 flex items-center gap-1"
                >
                  Administration
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${
                      adminDropdownOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {adminDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                    <div className="py-1">
                      <Link
                        to="/admin/dashboard"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors duration-200"
                        onClick={() => setAdminDropdownOpen(false)}
                      >
                        Tableau de bord
                      </Link>
                      <Link
                        to="/admin/spaces"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors duration-200"
                        onClick={() => setAdminDropdownOpen(false)}
                      >
                        Gerer les espaces
                      </Link>
                      <Link
                        to="/admin/users"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors duration-200"
                        onClick={() => setAdminDropdownOpen(false)}
                      >
                        Gerer les utilisateurs
                      </Link>
                      <Link
                        to="/admin/reservations"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors duration-200"
                        onClick={() => setAdminDropdownOpen(false)}
                      >
                        Toutes les reservations
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Auth Buttons */}
            <div className="flex items-center ml-4 space-x-3">
              {isAuthenticated ? (
                <div className="flex items-center space-x-3">
                  <span className="text-gray-200 text-sm font-medium">
                    <FiUser className="inline mr-1" />
                    {user?.name || user?.email}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium bg-red-500 text-white hover:bg-red-600 transition-colors duration-200"
                  >
                    <FiLogOut />
                    Deconnexion
                  </button>
                </div>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-indigo-500 hover:text-white transition-colors duration-200"
                  >
                    <FiLogIn />
                    Connexion
                  </Link>
                  <Link
                    to="/register"
                    className="flex items-center gap-1 px-4 py-2 rounded-md text-sm font-medium bg-white text-indigo-600 hover:bg-indigo-50 transition-colors duration-200"
                  >
                    Inscription
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-300 hover:text-white focus:outline-none focus:text-white p-2"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <FiX className="h-6 w-6" />
              ) : (
                <FiMenu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-indigo-700">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <NavLink to="/" end className={mobileNavLinkClasses} onClick={closeMobileMenu}>
              <span className="flex items-center gap-2">
                <FiHome />
                Accueil
              </span>
            </NavLink>
            <NavLink to="/spaces" className={mobileNavLinkClasses} onClick={closeMobileMenu}>
              Espaces
            </NavLink>

            {isAuthenticated && (
              <>
                <NavLink
                  to="/my-reservations"
                  className={mobileNavLinkClasses}
                  onClick={closeMobileMenu}
                >
                  Mes Reservations
                </NavLink>
                <NavLink
                  to="/profile"
                  className={mobileNavLinkClasses}
                  onClick={closeMobileMenu}
                >
                  <span className="flex items-center gap-2">
                    <FiUser />
                    Mon Profil
                  </span>
                </NavLink>
              </>
            )}

            {/* Mobile Admin Links */}
            {isAdmin && (
              <div className="border-t border-indigo-500 pt-2 mt-2">
                <p className="px-3 py-1 text-xs font-semibold text-indigo-300 uppercase tracking-wider">
                  Administration
                </p>
                <Link
                  to="/admin/dashboard"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-indigo-500 hover:text-white transition-colors duration-200"
                  onClick={closeMobileMenu}
                >
                  Tableau de bord
                </Link>
                <Link
                  to="/admin/spaces"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-indigo-500 hover:text-white transition-colors duration-200"
                  onClick={closeMobileMenu}
                >
                  Gerer les espaces
                </Link>
                <Link
                  to="/admin/users"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-indigo-500 hover:text-white transition-colors duration-200"
                  onClick={closeMobileMenu}
                >
                  Gerer les utilisateurs
                </Link>
                <Link
                  to="/admin/reservations"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-indigo-500 hover:text-white transition-colors duration-200"
                  onClick={closeMobileMenu}
                >
                  Toutes les reservations
                </Link>
              </div>
            )}

            {/* Mobile Auth */}
            <div className="border-t border-indigo-500 pt-2 mt-2">
              {isAuthenticated ? (
                <>
                  <p className="px-3 py-2 text-sm text-indigo-200 font-medium">
                    <FiUser className="inline mr-1" />
                    {user?.name || user?.email}
                  </p>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium text-red-300 hover:bg-red-500 hover:text-white transition-colors duration-200"
                  >
                    <FiLogOut />
                    Deconnexion
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-indigo-500 hover:text-white transition-colors duration-200"
                    onClick={closeMobileMenu}
                  >
                    <FiLogIn />
                    Connexion
                  </Link>
                  <Link
                    to="/register"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-indigo-500 hover:text-white transition-colors duration-200"
                    onClick={closeMobileMenu}
                  >
                    Inscription
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
