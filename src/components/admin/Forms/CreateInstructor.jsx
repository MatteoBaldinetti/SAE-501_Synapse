/**
 * CreateInstructor.jsx - Formulaire de création d'un instructeur
 * 
 * Permet de créer un nouvel instructeur avec :
 * - Nom et prénom
 * - Spécialités/domaines d'expertise
 * - Email de contact
 * - Biographie
 * 
 * Utilisé par : AdminInstructors.jsx
 * Dépendances : API_URL
 */

import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

function CreateInstructor({ onClose }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    contractType: "",
    specialty: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/api/instructors`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la création de l'enseignant");
      }

      const result = await response.json();
      console.log("Enseignant créé avec succès:", result);

      onClose();
    } catch (err) {
      setError(err.message);
      console.error("Erreur:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="container">
        <div className="row mb-3">
          <div className="col-12">
            <button className="btn btn-secondary" onClick={onClose}>
              ← Retour
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col-12 mx-auto">
            <h3>Création d'un enseignant</h3>
          </div>
        </div>
        <div className="row">
          <div className="col-12 mx-auto">
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6 mb-4">
                  <label htmlFor="firstName" className="form-label">
                    Prénom <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Prénom de l'enseignant"
                    required
                  />
                </div>

                <div className="col-md-6 mb-4">
                  <label htmlFor="lastName" className="form-label">
                    Nom <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Nom de l'enseignant"
                    required
                  />
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="contractType" className="form-label">
                  Type de contrat <span className="text-danger">*</span>
                </label>
                <select
                  className="form-select"
                  id="contractType"
                  name="contractType"
                  value={formData.contractType}
                  onChange={handleChange}
                  required
                >
                  <option value="">Sélectionner un type de contrat</option>
                  <option value="CDI">CDI</option>
                  <option value="CDD">CDD</option>
                  <option value="Freelance">Freelance</option>
                  <option value="Vacataire">Vacataire</option>
                </select>
              </div>

              <div className="mb-4">
                <label htmlFor="specialty" className="form-label">
                  Spécialité <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="specialty"
                  name="specialty"
                  value={formData.specialty}
                  onChange={handleChange}
                  placeholder="Ex: Développement Web, Design UX/UI, etc."
                  required
                />
              </div>

              <div className="d-flex gap-2 mt-4">
                <button
                  type="submit"
                  className="btn btn-admin"
                  disabled={loading}
                >
                  {loading ? "Création en cours..." : "Créer"}
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={onClose}
                  disabled={loading}
                >
                  Annuler
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateInstructor;
