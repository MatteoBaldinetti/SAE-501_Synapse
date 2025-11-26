import { useState, useRef, useEffect } from "react";
import "../styles/Login.css";
import { useAuth } from "../contexts/AuthContext";
import { useLocation } from "react-router-dom";
import bcrypt from "bcryptjs";

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

      const res = await fetch("http://localhost:8080/api/users", {
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
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="24" height="24">
      {visible ? (
        <path d="M320 96C239.2 96 174.5 132.8 127.4 176.6C80.6 220.1 49.3 272 34.4 307.7C31.1 315.6 31.1 324.4 34.4 332.3C49.3 368 80.6 420 127.4 463.4C174.5 507.1 239.2 544 320 544C400.8 544 465.5 507.2 512.6 463.4C559.4 419.9 590.7 368 605.6 332.3C608.9 324.4 608.9 315.6 605.6 307.7C590.7 272 559.4 220 512.6 176.6C465.5 132.9 400.8 96 320 96zM176 320C176 240.5 240.5 176 320 176C399.5 176 464 240.5 464 320C464 399.5 399.5 464 320 464C240.5 464 176 399.5 176 320zM320 256C320 291.3 291.3 320 256 320C244.5 320 233.7 317 224.3 311.6C223.3 322.5 224.2 333.7 227.2 344.8C240.9 396 293.6 426.4 344.8 412.7C396 399 426.4 346.3 412.7 295.1C400.5 249.4 357.2 220.3 311.6 224.3C316.9 233.6 320 244.4 320 256z" />
      ) : (
        <path d="M73 39.1C63.6 29.7 48.4 29.7 39.1 39.1C29.8 48.5 29.7 63.7 39 73.1L567 601.1C576.4 610.5 591.6 610.5 600.9 601.1C610.2 591.7 610.3 576.5 600.9 567.2L504.5 470.8C507.2 468.4 509.9 466 512.5 463.6C559.3 420.1 590.6 368.2 605.5 332.5C608.8 324.6 608.8 315.8 605.5 307.9C590.6 272.2 559.3 220.2 512.5 176.8C465.4 133.1 400.7 96.2 319.9 96.2C263.1 96.2 214.3 114.4 173.9 140.4L73 39.1z" />
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