import "../styles/Navbar.css";
import smallLogo from "../assets/images/smallLogo.webp";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

import profilePicture from '../assets/images/profile_picture.webp';

function Navbar() {
    const { userId, userEmail, userFirstname, userLastname, userType, login, logout, authLoading } = useAuth();
    const navigate = useNavigate();

    const goToLogin = (isSignUp) => {
        navigate("/login", { state: { isSignUp } });
    };

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
                            <Link className="nav-link" to="/">Accueil</Link>
                        </li>
                        <li className="nav-item me-3">
                            <Link className="nav-link" to="/cours">Cours</Link>
                        </li>
                        <li className="nav-item me-3">
                            <Link className="nav-link" to="/instructeurs">Instructeurs</Link>
                        </li>
                        <li className="nav-item me-3">
                            <Link className="nav-link" to="/apropos">À propos</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/contact">Contact</Link>
                        </li>
                    </ul>

                    {userId !== null ? (
                        <div className="dropdown me-5">
                            <img
                                src={profilePicture}
                                width={40}
                                className="rounded-circle dropdown-toggle"
                                id="dropdownUser"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                alt="Profil"
                                style={{ cursor: "pointer" }}
                            />

                            <ul className="dropdown-menu dropdown-menu-end profile-dropdown" aria-labelledby="dropdownUser">
                                <li><span className="dropdown-item-text fw-bold">{userFirstname} {userLastname}</span></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><Link className="dropdown-item" to="/profil">Mon profil</Link></li>

                                <li><hr className="dropdown-divider" /></li>

                                <li>
                                    <button className="dropdown-item text-danger" onClick={logout}>
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