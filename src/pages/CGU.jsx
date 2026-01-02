/**
 * CGU.jsx - Page des Conditions Générales d'Utilisation
 * 
 * Affiche les conditions générales d'utilisation de la plateforme.
 * 
 * Route : /cgu
 * Utilisé par : App.jsx, Footer.jsx
 */

import "../App.css"

function CGU() {
    return (
        <div className="container legal-container my-5">
            <div className="row">
                <div className="col-md-10 mx-auto">

                    <h2 className="mb-4">Conditions Générales d’Utilisation</h2>

                    <p className="text-secondary">
                        Dernière mise à jour : janvier 2026
                    </p>

                    <h5 className="mt-4">1. Objet</h5>
                    <p>
                        Les présentes Conditions Générales d’Utilisation ont pour objet
                        de définir les modalités d’accès et d’utilisation du site
                        TXLFORMA. Toute navigation sur le site implique l’acceptation
                        pleine et entière des présentes CGU.
                    </p>

                    <h5 className="mt-4">2. Accès au site</h5>
                    <p>
                        Le site est accessible gratuitement à tout utilisateur disposant
                        d’un accès à Internet. Certains services peuvent nécessiter la
                        création d’un compte utilisateur.
                    </p>

                    <h5 className="mt-4">3. Création de compte</h5>
                    <p>
                        Lors de la création d’un compte, l’utilisateur s’engage à fournir
                        des informations exactes et à jour. L’utilisateur est responsable
                        de la confidentialité de ses identifiants.
                    </p>

                    <h5 className="mt-4">4. Utilisation des services</h5>
                    <p>
                        L’utilisateur s’engage à utiliser le site dans le respect des lois
                        et règlements en vigueur. Toute utilisation abusive ou frauduleuse
                        pourra entraîner la suspension ou la suppression du compte.
                    </p>

                    <h5 className="mt-4">5. Propriété intellectuelle</h5>
                    <p>
                        L’ensemble des contenus présents sur le site (textes, images,
                        logos, vidéos, formations) sont la propriété exclusive de
                        TXLFORMA. Toute reproduction sans autorisation est interdite.
                    </p>

                    <h5 className="mt-4">6. Responsabilité</h5>
                    <p>
                        TXLFORMA ne saurait être tenue responsable en cas d’interruption du
                        site, de bug ou de tout dommage résultant de l’utilisation du
                        service.
                    </p>

                    <h5 className="mt-4">7. Modification des CGU</h5>
                    <p>
                        TXLFORMA se réserve le droit de modifier les présentes CGU à tout
                        moment. Les utilisateurs seront informés des modifications via le
                        site.
                    </p>

                    <h5 className="mt-4">8. Droit applicable</h5>
                    <p>
                        Les présentes conditions sont régies par le droit français. En cas
                        de litige, les tribunaux compétents seront ceux du ressort de Paris.
                    </p>

                </div>
            </div>
        </div>
    );
}

export default CGU;