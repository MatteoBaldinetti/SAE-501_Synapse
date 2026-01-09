/**
 * Navbar.jsx - Barre de navigation principale de l'application
 *
 * Composant de navigation responsive qui affiche :
 * - Le logo de l'application (lien vers l'accueil)
 * - Les liens de navigation (Accueil, Cours, Contact)
 * - Pour les utilisateurs non connectés : boutons "Se connecter" et "S'inscrire"
 * - Pour les utilisateurs connectés :
 *   - Photo de profil cliquable
 *   - Menu déroulant avec accès au tableau de bord et déconnexion
 *
 * Utilise le contexte AuthContext pour gérer l'état d'authentification
 *
 * Utilisé par : App.jsx
 * Dépendances : AuthContext, API_URL
 */

import "../styles/Navbar.css";
import smallLogo from "../assets/images/smallLogo.webp";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { API_URL } from "../constants/apiConstants";

import profilePicture from "../assets/images/profile_picture.webp";

function Navbar() {
  const {
    userId,
    userEmail,
    userFirstname,
    userLastname,
    userType,
    userPhone,
    userImage,
    login,
    logout,
    authLoading,
  } = useAuth();
  const navigate = useNavigate();

  const goToLogin = (isSignUp) => {
    navigate("/login", { state: { isSignUp } });
  };

  const dashboardPath =
    userType === 2
      ? "/admin"
      : userType === 1
        ? "/prof-dashboard"
        : "/dashboard";

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand ms-5" to="/">
          <img src={smallLogo} height={"60vh"} width={"auto"} alt="Logo" />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto me-3 mb-2 mb-lg-0">
            <li className="nav-item me-3">
              <Link className="nav-link" to="/">
                Accueil
              </Link>
            </li>
            {userType === 1 ? (
              // Navigation pour les professeurs
              <>
                <li className="nav-item me-3">
                  <Link className="nav-link" to="/catalogue">
                    Catalogue
                  </Link>
                </li>
                <li className="nav-item me-3">
                  <Link className="nav-link" to="/sessions">
                    Sessions
                  </Link>
                </li>
                <li className="nav-item me-3">
                  <Link className="nav-link" to="/mes-eleves">
                    Mes élèves
                  </Link>
                </li>
              </>
            ) : (
              // Navigation pour les étudiants et visiteurs
              <li className="nav-item me-3">
                <Link className="nav-link" to="/cours">
                  Cours
                </Link>
              </li>
            )}
            <li className="nav-item">
              <Link className="nav-link" to="/contact">
                Contact
              </Link>
            </li>
          </ul>

          {userId !== null ? (
            <div className="dropdown me-5">
              <img
                src={
                  userImage === null || userImage === ""
                    ? profilePicture
                    : `${API_URL}/files/download/${userImage}`
                }
                width={40}
                height={40}
                className="rounded-circle profile-avatar dropdown-toggle"
                id="dropdownUser"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                alt="Profil"
                style={{ cursor: "pointer" }}
              />

              <ul
                className="dropdown-menu dropdown-menu-end profile-dropdown"
                aria-labelledby="dropdownUser"
              >
                <li>
                  <Link
                    className="dropdown-item fw-bold"
                    to={userType === 1 ? `/prof-profile/${userId}` : "/dashboard"}
                    style={{ cursor: "pointer" }}
                  >
                    {userFirstname} {userLastname}
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <Link
                    className="dropdown-item"
                    to={userType === 1 ? "/prof-dashboard" : "/dashboard"}
                  >
                    Tableau de bord
                  </Link>
                </li>

                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li>
                  <button
                    className="dropdown-item text-danger"
                    onClick={logout}
                  >
                    Se déconnecter
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <>
              <button
                className="btn blue-button me-3"
                type="button"
                onClick={() => goToLogin(false)}
              >
                Se connecter
              </button>
              <button
                className="btn blue-button-outline"
                type="button"
                onClick={() => goToLogin(true)}
              >
                S'inscrire
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
