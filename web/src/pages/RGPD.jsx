/**
 * RGPD.jsx - Page d'information RGPD
 * 
 * Affiche les informations relatives au RGPD et à la protection des données.
 * 
 * Route : /rgpd
 * Utilisé par : App.jsx, Footer.jsx
 */

import "../App.css"

function RGPD() {
    return (
        <div className="container legal-container my-5">
            <h2 className="mb-4">Politique RGPD</h2>
            <p>Nous collectons certaines données personnelles pour améliorer nos services :</p>
            <ul>
                <li>Nom et prénom</li>
                <li>Email et numéro de téléphone</li>
                <li>Informations liées à votre navigation</li>
            </ul>
            <p>Ces données sont stockées de manière sécurisée et ne sont jamais vendues à des tiers.</p>
            <p>Vous pouvez demander l’accès, la rectification ou la suppression de vos données à tout moment en nous contactant.</p>
        </div>
    );
}

export default RGPD;