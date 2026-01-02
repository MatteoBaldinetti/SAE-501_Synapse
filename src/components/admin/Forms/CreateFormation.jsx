import { useState } from "react";
import { API_URL } from "../../../constants/apiConstants";

function CreateFormation({ onClose }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    detailedDescription: "",
    prerequisites: "",
    imgName: "",
    category: "",
    duration: "",
    price: "",
    learnText: "",
    modelFileName: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    const sendImage = await fetch(`${API_URL}/files/upload`, {
      method: "POST",
      body: formData,
    });

    const result = await sendImage.json();
    console.log(result);
    return result;
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Vérifier le type de fichier
    if (!file.type.startsWith("image/")) {
      setError("Veuillez sélectionner un fichier image valide");
      return;
    }

    // Créer un aperçu de l'image
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);

    // Uploader l'image
    setUploadingImage(true);
    setError(null);
    try {
      const result = await handleUploadImage(file);
      if (result && result.fileName) {
        setFormData((prev) => ({
          ...prev,
          imgName: result.fileName,
        }));
        setImageFile(file);
      } else {
        throw new Error("Erreur lors de l'upload de l'image");
      }
    } catch (err) {
      setError(err.message);
      setImagePreview(null);
      console.error("Erreur upload:", err);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/trainings`, {
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
              {/* Titre - Pleine largeur */}
              <div className="mb-4">
                <label htmlFor="titre" className="form-label">
                  Titre <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Titre de la formation"
                  required
                />
              </div>

              {/* Catégorie - Pleine largeur */}
              <div className="mb-4">
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

              {/* Description courte - Pleine largeur */}
              <div className="mb-4">
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

              {/* Description détaillée - Pleine largeur */}
              <div className="mb-4">
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

              {/* Ce que vous allez apprendre - Pleine largeur */}
              <div className="mb-4">
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

              {/* Prérequis - Pleine largeur */}
              <div className="mb-4">
                <label htmlFor="prerequisites" className="form-label">
                  Prérequis
                </label>
                <textarea
                  className="form-control"
                  id="prerequisites"
                  name="prerequisites"
                  value={formData.prerequisites}
                  onChange={handleChange}
                  placeholder="Prérequis nécessaires (optionnel)"
                  rows="3"
                ></textarea>
              </div>

              {/* Champs courts sur une ligne */}
              <div className="row">
                <div className="col-md-4 mb-4">
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

                <div className="col-md-4 mb-4">
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

                <div className="col-md-4 mb-4">
                  <label htmlFor="imgName" className="form-label">
                    Image de la formation <span className="text-danger">*</span>
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id="imgName"
                    name="imgName"
                    onChange={handleImageChange}
                    accept="image/*"
                    required={!formData.imgName}
                  />
                  {uploadingImage && (
                    <div className="text-primary mt-2">
                      <small>Upload en cours...</small>
                    </div>
                  )}
                  {imagePreview && (
                    <div className="mt-2">
                      <img
                        src={imagePreview}
                        alt="Aperçu"
                        style={{
                          maxWidth: "100%",
                          maxHeight: "150px",
                          objectFit: "cover",
                          borderRadius: "8px",
                          border: "1px solid #dee2e6",
                        }}
                      />
                      <div className="text-success mt-1">
                        <small>✓ Image uploadée: {formData.imgName}</small>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Nom du fichier modèle - Pleine largeur */}
              <div className="mb-4">
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

export default CreateFormation;
