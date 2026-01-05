/**
 * PolitiqueConfidentialite.jsx - Page de politique de confidentialité
 *
 * Affiche la politique de confidentialité du site.
 *
 * Route : /politique-confidentialite
 * Utilisé par : App.jsx, Footer.jsx
 *
 * Paramètre URL : type
 * - 0 = membre (fond blanc par défaut)
 * - 1 = enseignant (fond #FFECC8)
 * - 2 = admin (fond #E3F2FD)
 */

import "../App.css"
import { useSearchParams } from "react-router-dom"

function PolitiqueConfidentialite() {
    const [searchParams] = useSearchParams();
    const type = searchParams.get("type") || "0";

    const getBackgroundColor = () => {
        switch(type) {
            case "1": return "#FFECC8"; // Enseignant
            case "2": return "#E3F2FD"; // Admin
            default: return "#FFFFFF"; // Membre
        }
    };

    return (
        <div style={{ backgroundColor: getBackgroundColor(), minHeight: "100vh" }}>
            <div className="container legal-container my-5">
                <h2 className="mb-4">Politique de confidentialité</h2>
                <p>Nous respectons votre vie privée et ne partageons aucune information personnelle sans votre consentement.</p>
                <p>Les données collectées servent uniquement à :</p>
                <ul>
                    <li>Améliorer nos formations et contenus</li>
                    <li>Communiquer avec vous concernant nos services</li>
                </ul>
                <p>Nous utilisons des mesures techniques et organisationnelles pour protéger vos informations.</p>
            </div>
        </div>
    );
}

export default PolitiqueConfidentialite;