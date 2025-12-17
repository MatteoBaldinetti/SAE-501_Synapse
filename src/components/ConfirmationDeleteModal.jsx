import { useEffect } from "react";
import "../styles/ConfirmationDeleteModal.css";

function ConfirmationDeleteModal({ visible, onClose, onConfirm }) {
    useEffect(() => {
        if (visible) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [visible]);

    if (!visible) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="wrapper p-3" onClick={(e) => e.stopPropagation()}>
                <h4 className="text-center mb-4">
                    Voulez vous vraiment<br />supprimer votre compte ?
                </h4>

                <div className="row mt-4 justify-content-center">
                    <div className="col-auto">
                        <button
                            className="btn btn-cancel p-2"
                            onClick={onClose}
                        >
                            Annuler
                        </button>
                    </div>
                    <div className="col-auto">
                        <button
                            className="btn btn-confirm p-2"
                            onClick={onConfirm}
                        >
                            Confirmer
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ConfirmationDeleteModal;