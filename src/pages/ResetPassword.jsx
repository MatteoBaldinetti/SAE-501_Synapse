import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../constants/apiConstants";
import { useAuth } from "../contexts/AuthContext";
import bcrypt from "bcryptjs";
import '../styles/ResetPassword.css';

function ResetPassword() {
    const navigate = useNavigate();
    const { userId } = useAuth();

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const allowed = sessionStorage.getItem("allowPasswordReset");
        if (!allowed) navigate("/login");
    }, [navigate]);

    const isPasswordValid = (pwd) => {
        const regex = /^(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/;
        return regex.test(pwd);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!isPasswordValid(password)) {
            setError(
                "Le mot de passe doit contenir au moins 8 caractères, une majuscule et un caractère spécial."
            );
            return;
        }

        if (password !== confirmPassword) {
            setError("Les mots de passe ne correspondent pas.");
            return;
        }

        try {
            const previousUserRes = await fetch(`${API_URL}/users/${userId}`);
            const previousUser = await previousUserRes.json();

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const updatedUser = { ...previousUser, password: hashedPassword };

            await fetch(`${API_URL}/users/${userId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedUser),
            });

            sessionStorage.removeItem("allowPasswordReset");
            alert("Mot de passe modifié avec succès.");
            navigate("/dashboard");
        } catch (err) {
            setError("Une erreur est survenue.");
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
        <div className="container content-container">
            <div className="row justify-content-center w-100">
                <div className="col-12 col-md-6">
                    <h2 className="mb-4 text-center">Changer votre mot de passe</h2>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-2 input-with-eye">
                            <label className="form-label">Nouveau mot de passe</label>
                            <div className="d-flex align-items-center position-relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="form-control"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <div className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
                                    <EyeIcon visible={!showPassword} />
                                </div>
                            </div>
                            <small className="text-secondary">
                                Minimum 8 caractères, doit contenir une majuscule et un caractère spécial.
                            </small>
                        </div>

                        <div className="mb-3 mt-3 input-with-eye">
                            <label className="form-label">Confirmer le mot de passe</label>
                            <div className="d-flex align-items-center position-relative">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    className="form-control"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                                <div className="eye-icon" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                    <EyeIcon visible={!showConfirmPassword} />
                                </div>
                            </div>
                        </div>

                        {error && (
                            <div className="alert alert-danger">{error}</div>
                        )}

                        <button type="submit" className="btn btn-blue w-100">
                            Mettre à jour le mot de passe
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ResetPassword;