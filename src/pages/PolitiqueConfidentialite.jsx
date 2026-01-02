/**
 * PolitiqueConfidentialite.jsx - Page de politique de confidentialité
 * 
 * Affiche la politique de confidentialité du site.
 * 
 * Route : /politique-confidentialite
 * Utilisé par : App.jsx, Footer.jsx
 */

import "../App.css"

function PolitiqueConfidentialite() {
    return (
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
    );
}

export default PolitiqueConfidentialite;