import { createContext, useState, useContext, useEffect } from "react";
import { API_URL } from "../constants/apiConstants";
import { useNavigate } from "react-router-dom"; import bcrypt from "bcryptjs";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const navigate = useNavigate();

    const [userId, setUserId] = useState(() => {
        const savedId = localStorage.getItem("id");
        return savedId ? JSON.parse(savedId) : null;
    });
    const [userEmail, setUserEmail] = useState(() => {
        const savedEmail = localStorage.getItem("email");
        return savedEmail ? JSON.parse(savedEmail) : null;
    });
    const [userFirstname, setUserFirstName] = useState(() => {
        const savedFirstname = localStorage.getItem("firstname");
        return savedFirstname ? JSON.parse(savedFirstname) : null;
    });
    const [userLastname, setUserLastName] = useState(() => {
        const savedLastname = localStorage.getItem("lastname");
        return savedLastname ? JSON.parse(savedLastname) : null;
    });
    const [userType, setUserType] = useState(() => {
        const savedType = localStorage.getItem("type");
        return savedType ? JSON.parse(savedType) : null;
    });
    const [authLoading, setAuthLoading] = useState(false);

    const login = async (email, password) => {
        setAuthLoading(true);
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
                setUserId(data.id)
                setUserEmail(data.email);
                setUserFirstName(data.firstname);
                setUserLastName(data.lastname);
                setUserType(data.type);
                localStorage.setItem("id", JSON.stringify(data.id));
                localStorage.setItem("email", JSON.stringify(data.email));
                localStorage.setItem("firstname", JSON.stringify(data.firstname));
                localStorage.setItem("lastname", JSON.stringify(data.lastname));
                localStorage.setItem("type", JSON.stringify(data.type));
                setAuthLoading(false);
                navigate("/");

            } else {
                throw new Error("Mot de passe incorrect");
            }

        } catch (err) {
            console.error(err);
            throw err;
        } finally {
            setAuthLoading(false);
        }
    };

    const logout = () => {
        setUserId(null);
        setUserEmail(null);
        setUserFirstName(null);
        setUserLastName(null);
        setUserType(null);
        localStorage.removeItem("id");
        localStorage.removeItem("email");
        localStorage.removeItem("firstname");
        localStorage.removeItem("lastname");
        localStorage.removeItem("type");
    };

    const value = { userId, userEmail, userFirstname, userLastname, userType, login, logout, authLoading };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    return useContext(AuthContext);
}