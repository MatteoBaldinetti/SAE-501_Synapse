/**
 * ProfileImageUploadModal.jsx - Modal d'upload de photo de profil
 * 
 * Modal permettant à l'utilisateur de :
 * - Sélectionner une nouvelle photo de profil
 * - Prévisualiser l'image avant upload
 * - Confirmer ou annuler l'upload
 * 
 * Utilisé par : ProfileComponents.jsx
 */

import { useEffect, useRef, useState } from "react";
import "../styles/ProfileImageUploadModal.css";

function ProfileImageUploadModal({ visible, onClose, onConfirm }) {
    const fileInputRef = useRef(null);
    const [preview, setPreview] = useState(null);
    const [file, setFile] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        document.body.style.overflow = visible ? "hidden" : "";
        return () => (document.body.style.overflow = "");
    }, [visible]);

    if (!visible) return null;

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (!selectedFile) return;

        if (!["image/png", "image/jpeg"].includes(selectedFile.type)) {
            setError("Seuls les fichiers PNG ou JPG sont autorisés");
            return;
        }

        setError("");
        setFile(selectedFile);
        setPreview(URL.createObjectURL(selectedFile));
    };

    const openFilePicker = () => {
        fileInputRef.current.click();
    };

    const handleConfirm = () => {
        if (!file) return;
        onConfirm(file);
        setPreview(null);
        setFile(null);
        setError("")
        onClose();
    };

    const handleClose = () => {
        setPreview(null);
        setFile(null);
        setError("")
        onClose();
    }

    return (
        <div className="upload-modal-overlay" onClick={onClose}>
            <div className="upload-modal-wrapper" onClick={(e) => e.stopPropagation()}>
                <h4 className="upload-title">
                    Modifier votre photo de profil
                </h4>

                <input
                    type="file"
                    accept="image/png, image/jpeg"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    hidden
                />

                {!preview ? (
                    <div className="row">
                        <div className="col-6">
                            <button
                                className="btn upload-btn-outline"
                                onClick={openFilePicker}
                            >
                                Parcourir les fichiers
                            </button>
                        </div>
                        <div className="col-6">
                            <button
                                className="btn upload-btn-cancel"
                                onClick={handleClose}
                            >
                                Annuler
                            </button>
                        </div>
                    </div>
                ) : (
                    <>
                        <img
                            src={preview}
                            alt="Aperçu"
                            className="upload-preview"
                        />
                        <div className="row">
                            <div className="col-12">
                                <button
                                    className="btn upload-btn-outline w-75"
                                    onClick={openFilePicker}
                                >
                                    Changer de photo
                                </button>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-6">
                                <button
                                    className="btn upload-btn-primary w-50"
                                    onClick={handleConfirm}
                                >
                                    Valider
                                </button>
                            </div>
                            <div className="col-6">
                                <button
                                    className="btn upload-btn-cancel w-50"
                                    onClick={handleClose}
                                >
                                    Annuler
                                </button>
                            </div>
                        </div>
                    </>
                )}

                {error && <p className="upload-error">{error}</p>}
            </div>
        </div>
    );
}

export default ProfileImageUploadModal;