/**
 * Contact.jsx - Page de contact
 * 
 * Formulaire de contact permettant aux visiteurs de :
 * - Envoyer un message à l'équipe
 * - Poser des questions
 * - Demander des informations
 * 
 * Affiche également les coordonnées de contact (email, téléphone, adresse).
 * 
 * Route : /contact
 * Utilisé par : App.jsx
 */

import { useState } from "react";
import "../styles/Contact.css";

function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };


    return (
        <div className="container mt-5">
            <h2 className="mb-5">Nous contacter</h2>

            <div className="row mb-5">
                <div className="col-6 d-flex flex-column">
                    <h3>Nos locaux</h3>
                    <div className="flex-grow-1">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.4636768537125!2d2.32866287688718!3d48.86843669999887!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e31b268ebe9%3A0xf65f21f45ef91115!2s4%20Rue%20de%20la%20Paix%2C%2075002%20Paris!5e0!3m2!1sfr!2sfr!4v1766153364195!5m2!1sfr!2sfr"
                            width="100%"
                            height="100%"
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </div>

                <div className="col-md-6">
                    <h3>Par mail</h3>

                    {status === "success" && (
                        <div className="alert alert-success">Message envoyé avec succès !</div>
                    )}
                    {status === "error" && (
                        <div className="alert alert-danger">Une erreur est survenue. Réessayez.</div>
                    )}

                    <form>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Votre nom</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Votre email</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="subject" className="form-label">Objet du message</label>
                            <input
                                type="text"
                                className="form-control"
                                id="subject"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="message" className="form-label">Contenu du message</label>
                            <textarea
                                className="form-control"
                                id="message"
                                name="message"
                                rows="5"
                                value={formData.message}
                                onChange={handleChange}
                                required
                            ></textarea>
                        </div>

                        <button type="submit" className="btn btn-contact w-100">
                            Envoyer
                        </button>
                    </form>
                </div>
            </div>

            <div className="row mt-5">
                <div className="col-12 mb-5">
                    <h3>Par téléphone</h3>
                    <p>Vous pouvez nous joindre au : <a href="tel:+33612345678" className="phone-link fw-bold">+33 6 12 34 56 78</a></p>
                </div>
            </div>
        </div>
    );
}

export default Contact;