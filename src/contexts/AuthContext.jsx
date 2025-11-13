import { createContext, useState, useContext, useEffect } from "react";
import { API_URL } from "../constants/apiConstants";
import bcrypt from "bcryptjs";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [userEmail, setUserEmail] = useState(() => {
        const savedEmail = localStorage.getItem("email");
        return savedEmail ? JSON.parse(savedEmail) : null;
    });
    const [loading, setLoading] = useState(false);

    const login = async (email, password) => {
        setLoading(true);
        try {
            const res = await fetch(`${API_URL}/users/email/${email}`);

            if (!res.ok) {
                throw new Error("Erreur lors de la connexion");
            }

            const data = await res.json();

            if (data.email === null) {
                throw new Error("Aucun utilisateur trouvé pour cette adresse mail");
            }

            const isValid = await bcrypt.compare(password, data.password);

            if (isValid) {
                console.log("Connexion réussie")
                setUserEmail(data.email);
                localStorage.setItem("email", JSON.stringify(data.email));
            } else {
                throw new Error("Mot de passe incorrect");
            }

        } catch (err) {
            console.error(err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        setUserEmail(null);
        localStorage.removeItem("email");
    };

    const value = { userEmail, login, logout, loading };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    return useContext(AuthContext);
}