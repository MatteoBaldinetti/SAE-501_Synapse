import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

function CreateFormation({ onClose }) {
  const [formData, setFormData] = useState({
    titre: "",
    description: "",
    detailedDescription: "",
    prequerties: "",
    imgName: "",
    category: "",
    duration: "",
    price: "",
    learnText: "",
    modelFileName: "",
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
      const response = await fetch(`${API_URL}/api/trainings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la création de la formation");
      }

      const result = await response.json();
      console.log("Formation créée avec succès:", result);

      // Retourner à la liste après création
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
            <h3>Création d'une formation</h3>
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
                <div className="col-md-6 mb-3">
                  <label htmlFor="titre" className="form-label">
                    Titre <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="titre"
                    name="titre"
                    value={formData.titre}
                    onChange={handleChange}
                    placeholder="Titre de la formation"
                    required
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="category" className="form-label">
                    Catégorie <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    placeholder="Ex: Développement, Design, etc."
                    required
                  />
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Description courte <span className="text-danger">*</span>
                </label>
                <textarea
                  className="form-control"
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Description courte de la formation"
                  rows="3"
                  required
                ></textarea>
              </div>

              <div className="mb-3">
                <label htmlFor="detailedDescription" className="form-label">
                  Description détaillée <span className="text-danger">*</span>
                </label>
                <textarea
                  className="form-control"
                  id="detailedDescription"
                  name="detailedDescription"
                  value={formData.detailedDescription}
                  onChange={handleChange}
                  placeholder="Description détaillée de la formation"
                  rows="5"
                  required
                ></textarea>
              </div>

              <div className="mb-3">
                <label htmlFor="learnText" className="form-label">
                  Ce que vous allez apprendre{" "}
                  <span className="text-danger">*</span>
                </label>
                <textarea
                  className="form-control"
                  id="learnText"
                  name="learnText"
                  value={formData.learnText}
                  onChange={handleChange}
                  placeholder="Liste des compétences acquises"
                  rows="4"
                  required
                ></textarea>
              </div>

              <div className="mb-3">
                <label htmlFor="prequerties" className="form-label">
                  Prérequis
                </label>
                <textarea
                  className="form-control"
                  id="prequerties"
                  name="prequerties"
                  value={formData.prequerties}
                  onChange={handleChange}
                  placeholder="Prérequis nécessaires (optionnel)"
                  rows="3"
                ></textarea>
              </div>

              <div className="row">
                <div className="col-md-4 mb-3">
                  <label htmlFor="duration" className="form-label">
                    Durée <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="duration"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    placeholder="Ex: 40 heures"
                    required
                  />
                </div>

                <div className="col-md-4 mb-3">
                  <label htmlFor="price" className="form-label">
                    Prix <span className="text-danger">*</span>
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="Prix en €"
                    step="0.01"
                    required
                  />
                </div>

                <div className="col-md-4 mb-3">
                  <label htmlFor="imgName" className="form-label">
                    Nom de l'image <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="imgName"
                    name="imgName"
                    value={formData.imgName}
                    onChange={handleChange}
                    placeholder="Ex: formation.jpg"
                    required
                  />
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="modelFileName" className="form-label">
                  Nom du fichier modèle
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="modelFileName"
                  name="modelFileName"
                  value={formData.modelFileName}
                  onChange={handleChange}
                  placeholder="Nom du fichier modèle (optionnel)"
                />
              </div>

              <div className="d-flex gap-2 mt-4">
                <button
                  type="submit"
                  className="btn btn-primary"
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

export default CreateFormation;
