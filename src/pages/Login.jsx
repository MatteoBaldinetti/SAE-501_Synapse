import { useState, useRef, useEffect } from "react";
import "../styles/Login.css";
import { useAuth } from "../contexts/AuthContext";
import { useLocation } from "react-router-dom";
import bcrypt from "bcryptjs";
import { API_URL } from "../constants/apiConstants";

function Login() {
  const { login, authLoading } = useAuth();
  const location = useLocation();

  const [isConnexion, setIsConnexion] = useState(!(location.state?.isSignUp ?? false));

  useEffect(() => {
    if (location.state?.isSignUp !== undefined) {
      setIsConnexion(!location.state.isSignUp);
    }
  }, [location.state]);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Champs Connexion
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Champs Inscription
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const wrapperRef = useRef(null);

  const changeForm = () => {
    setShowPassword(false);
    setShowConfirmPassword(false);
    setError("");
    setIsConnexion((prev) => !prev);
  };

  useEffect(() => {
    const active = wrapperRef.current?.querySelector(".form-content.active");
    if (active) {
      wrapperRef.current.style.height = active.scrollHeight + "px";
    }
  }, [isConnexion]);

  const handleSubmitConnexion = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await login(email, password);
    } catch (err) {
      setError(err.message || "Erreur de connexion");
    }
  };

  const handleSubmitInscription = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const passwordRegex = /^(?=.*[A-Z])(?=.*[\W_]).{8,}$/;

      if (!passwordRegex.test(signupPassword)) {
        setError("Le mot de passe ne répond pas au exigence");
        return;
      }

      if (signupPassword !== confirmPassword) {
        setError("Les mots de passe ne correspondent pas");
        return;
      }

      const salt = await bcrypt.genSalt(5);

      const newUser = {
        firstname: firstname,
        lastname: lastname,
        email: signupEmail,
        password: await bcrypt.hash(signupPassword, salt),
        type: 0,
      }

      const res = await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      if (!res.ok) throw new Error("Erreur lors de l'inscription");

      await login(signupEmail, signupPassword);
    } catch (err) {
      setError(err.message || "Une erreur est survenue");
    }
  };

  const EyeIcon = ({ visible }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={visible ? "0 0 576 512" : "0 0 576 512"}
      width="24"
      height="24"
    >
      {visible ? (
        <path
          fill="#000000"
          d="M288 32c-80.8 0-145.5 36.8-192.6 80.6-46.8 43.5-78.1 95.4-93 131.1-3.3 7.9-3.3 16.7 0 24.6 14.9 35.7 46.2 87.7 93 131.1 47.1 43.7 111.8 80.6 192.6 80.6s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1 3.3-7.9 3.3-16.7 0-24.6-14.9-35.7-46.2-87.7-93-131.1-47.1-43.7-111.8-80.6-192.6-80.6zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64-11.5 0-22.3-3-31.7-8.4-1 10.9-.1 22.1 2.9 33.2 13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-12.2-45.7-55.5-74.8-101.1-70.8 5.3 9.3 8.4 20.1 8.4 31.7z"
        />
      ) : (
        <path
          fill="#000000"
          d="M41-24.9c-9.4-9.4-24.6-9.4-33.9 0S-2.3-.3 7 9.1l528 528c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-96.4-96.4c2.7-2.4 5.4-4.8 8-7.2 46.8-43.5 78.1-95.4 93-131.1 3.3-7.9 3.3-16.7 0-24.6-14.9-35.7-46.2-87.7-93-131.1-47.1-43.7-111.8-80.6-192.6-80.6-56.8 0-105.6 18.2-146 44.2L41-24.9zM204.5 138.7c23.5-16.8 52.4-26.7 83.5-26.7 79.5 0 144 64.5 144 144 0 31.1-9.9 59.9-26.7 83.5l-34.7-34.7c12.7-21.4 17-47.7 10.1-73.7-13.7-51.2-66.4-81.6-117.6-67.9-8.6 2.3-16.7 5.7-24 10l-34.7-34.7zM325.3 395.1c-11.9 3.2-24.4 4.9-37.3 4.9-79.5 0-144-64.5-144-144 0-12.9 1.7-25.4 4.9-37.3L69.4 139.2c-32.6 36.8-55 75.8-66.9 104.5-3.3 7.9-3.3 16.7 0 24.6 14.9 35.7 46.2 87.7 93 131.1 47.1 43.7 111.8 80.6 192.6 80.6 37.3 0 71.2-7.9 101.5-20.6l-64.2-64.2z"
        />
      )}
    </svg>
  );

  return (
    <div className="d-flex flex-column min-vh-100">
      <div id="formContainer">
        <div id="formBox">
          <h1 className="text-center">{isConnexion ? "Connexion" : "Inscription"}</h1>

          <div ref={wrapperRef} className="form-wrapper">
            {/* Connexion */}
            <div className={`form-content ${isConnexion ? "active" : ""}`}>
              <form onSubmit={handleSubmitConnexion}>
                <div className="col-12 mb-3">
                  <label>Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="form-control"
                  />
                </div>
                <div className="col-12 position-relative mb-3">
                  <label>Mot de passe</label>
                  <div className="d-flex align-items-center position-relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="form-control pe-5"
                    />
                    <div className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
                      <EyeIcon visible={!showPassword} />
                    </div>
                  </div>
                  <a className="text-secondary small text-decoration-none link-pointer mb-0">
                    Mot de passe oublié ?
                  </a>
                </div>
                <div className="form-bottom d-flex flex-column align-items-center">
                  <button type="submit" className="btn blue-button w-50 fs-5 mb-2" disabled={authLoading}>
                    {authLoading ? "Connexion..." : "Se connecter"}
                  </button>
                </div>
              </form>
            </div>

            {/* Inscription */}
            <div className={`form-content ${!isConnexion ? "active" : ""}`}>
              <form onSubmit={handleSubmitInscription}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label>Prénom</label>
                    <input
                      type="text"
                      value={firstname}
                      onChange={(e) => setFirstname(e.target.value)}
                      required
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label>Nom</label>
                    <input
                      type="text"
                      value={lastname}
                      onChange={(e) => setLastname(e.target.value)}
                      required
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col-12 mb-3">
                  <label>Email</label>
                  <input
                    type="email"
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    required
                    className="form-control"
                  />
                </div>
                <div className="row">
                  <div className="col-md-6 position-relative">
                    <label>Mot de passe</label>
                    <div className="d-flex align-items-center position-relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={signupPassword}
                        onChange={(e) => setSignupPassword(e.target.value)}
                        required
                        className="form-control pe-5"
                      />
                      <div className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
                        <EyeIcon visible={!showPassword} />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 position-relative">
                    <label>Confirmer le mot de passe</label>
                    <div className="d-flex align-items-center position-relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className="form-control pe-5"
                      />
                      <div
                        className="eye-icon"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        <EyeIcon visible={!showConfirmPassword} />
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-secondary small mb-0">
                  Minimum 8 caractères, doit contenir une majuscule et un caractère spécial.
                </p>
                <div className="form-bottom d-flex flex-column align-items-center">
                  <button type="submit" className="btn blue-button w-50 fs-5 mb-2" disabled={authLoading}>
                    {authLoading ? "Inscription..." : "S'inscrire"}
                  </button>
                </div>
              </form>
            </div>
          </div>

          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              changeForm();
            }}
            className="text-dark text-decoration-none link-pointer text-center"
          >
            {isConnexion ? "Tu n’as pas de compte ? Inscris-toi !" : "J’ai déjà un compte"}
          </a>

          {error && <p className="text-danger text-center mt-2">{error}</p>}
        </div>
      </div>
    </div>
  );
}

export default Login;