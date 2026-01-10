/**
 * ScrollToTop.jsx - Composant utilitaire pour le défilement
 * 
 * Force le défilement en haut de la page lors du changement de route.
 * Améliore l'expérience utilisateur en évitant de rester en bas de page
 * après une navigation.
 * 
 * Utilisé par : App.jsx
 * Dépendances : react-router-dom (useLocation, useEffect)
 */

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}

export default ScrollToTop;