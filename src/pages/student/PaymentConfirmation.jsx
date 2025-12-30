import { Link, useLocation } from "react-router-dom";
import "../../styles/PaymentConfirmation.css";

function PaymentConfirmation() {
    const location = useLocation();

    return (
        <div className="container-fluid content-container blue-background">
            <div className="row w-100">
                <div className="col-md-8 col-lg-6 mx-auto">
                    <div className="card p-5 text-center shadow-sm">

                        {/* Icône succès */}
                        <div className="success-icon mx-auto mb-4">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="70"
                                height="70"
                                viewBox="0 0 512 512"
                            >
                                <path
                                    fill="#28a745"
                                    d="M256 48C141.1 48 48 141.1 48 256s93.1 208 208 208 208-93.1 208-208S370.9 48 256 48zm-24.6 298.8-95.2-95.2 33.9-33.9 61.3 61.3 110.5-110.5 33.9 33.9-144.4 144.4z"
                                />
                            </svg>
                        </div>

                        <h2 className="mb-3">Paiement confirmé 🎉</h2>

                        <p className="text-secondary mb-4">
                            Merci pour votre paiement. Votre inscription à la formation
                            a bien été prise en compte.
                        </p>

                        <div className="d-flex justify-content-center gap-3 mt-4">
                            <Link to="/dashboard" className="btn blue-button">
                                Aller au tableau de bord
                            </Link>
                            <Link to="/cours" className="btn blue-button-outline">
                                Voir d’autres formations
                            </Link>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default PaymentConfirmation;