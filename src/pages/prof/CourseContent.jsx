import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../../constants/apiConstants";

function CourseContent() {
  const navigate = useNavigate();
  const [currentSection, setCurrentSection] = useState("formation");
  const [isLoading, setIsLoading] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    detailedDescription: "",
    prerequisites: "",
    category: "",
    duration: "",
    price: "",
    learnText: "",
    imgName: "",
    modelFileName: "",
  });

  const [chapters, setChapters] = useState([
    {
      id: 1,
      title: "Chapitre 1: Bienvenue",
      description: "Introduction au cours",
    },
    {
      id: 2,
      title: "Chapitre 2: Fondamentaux",
      description: "Les bases de la programmation",
    },
    {
      id: 3,
      title: "Chapitre 3: Structures",
      description: "Structures de données avancées",
    },
  ]);

  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploadedVideo, setUploadedVideo] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addChapter = () => {
    const newChapter = {
      id: chapters.length + 1,
      title: `Chapitre ${chapters.length + 1}: Nouveau chapitre`,
      description: "Description du chapitre",
    };
    setChapters([...chapters, newChapter]);
  };

  // Upload file to server
  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(`${API_URL}/files/upload`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Upload error:", errorText);
        throw new Error("Upload failed");
      }

      const data = await response.json();
      console.log("Upload success:", data);
      return data.fileName; // Le serveur retourne {id, fileName, url, uploadedAt}
    } catch (error) {
      console.error("Error uploading file:", error);
      alert(`Erreur lors de l'upload du fichier: ${error.message}`);
      return null;
    }
  };

  // Handle image upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // Vérifier la taille (5MB max pour les images)
      const maxSize = 5 * 1024 * 1024; // 5MB en bytes
      if (file.size > maxSize) {
        alert(
          `Le fichier est trop gros (${(file.size / 1024 / 1024).toFixed(
            2
          )}MB). La taille maximale est de 5MB.`
        );
        e.target.value = ""; // Reset input
        return;
      }

      console.log("Uploading image:", file.name, `(${(file.size / 1024 / 1024).toFixed(2)}MB)`);
      setIsLoading(true);
      const fileName = await uploadFile(file);
      if (fileName) {
        console.log("Image uploaded successfully:", fileName);
        setUploadedImage(fileName);
        setFormData((prev) => ({
          ...prev,
          imgName: fileName,
        }));
        alert(`Image "${file.name}" uploadée avec succès !`);
      }
      setIsLoading(false);
      e.target.value = ""; // Reset input
    }
  };

  // Handle video upload
  const handleVideoUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // Vérifier la taille (50MB max pour les vidéos)
      const maxSize = 50 * 1024 * 1024; // 50MB en bytes
      if (file.size > maxSize) {
        alert(
          `Le fichier est trop gros (${(file.size / 1024 / 1024).toFixed(
            2
          )}MB). La taille maximale est de 50MB.`
        );
        e.target.value = ""; // Reset input
        return;
      }

      console.log("Uploading video:", file.name, `(${(file.size / 1024 / 1024).toFixed(2)}MB)`);
      setIsLoading(true);
      const fileName = await uploadFile(file);
      if (fileName) {
        console.log("Video uploaded successfully:", fileName);
        setUploadedVideo(fileName);
        setFormData((prev) => ({
          ...prev,
          modelFileName: fileName,
        }));
        alert(`Vidéo "${file.name}" uploadée avec succès !`);
      }
      setIsLoading(false);
      e.target.value = ""; // Reset input
    }
  };

  // Handle multiple files upload
  const handleFilesUpload = async (e) => {
    const files = Array.from(e.target.files);

    // Vérifier la taille de chaque fichier (10MB max)
    const maxSize = 10 * 1024 * 1024; // 10MB en bytes
    const oversizedFiles = files.filter((f) => f.size > maxSize);

    if (oversizedFiles.length > 0) {
      alert(
        `${oversizedFiles.length} fichier(s) trop gros (max 10MB) :\n` +
          oversizedFiles
            .map(
              (f) =>
                `- ${f.name} (${(f.size / 1024 / 1024).toFixed(2)}MB)`
            )
            .join("\n")
      );
      e.target.value = ""; // Reset input
      return;
    }

    console.log("Uploading files:", files.map((f) => `${f.name} (${(f.size / 1024 / 1024).toFixed(2)}MB)`));
    setIsLoading(true);

    const uploadPromises = files.map((file) => uploadFile(file));
    const fileNames = await Promise.all(uploadPromises);

    const successfulUploads = fileNames.filter((name) => name !== null);
    console.log("Files uploaded successfully:", successfulUploads);
    setUploadedFiles((prev) => [...prev, ...successfulUploads]);

    if (successfulUploads.length > 0) {
      alert(`${successfulUploads.length} fichier(s) uploadé(s) avec succès !`);
    }
    setIsLoading(false);
    e.target.value = ""; // Reset input
  };

  // Save training (draft or publish)
  const saveTraining = async (isDraft = false) => {
    setIsLoading(true);

    // Prepare training data with chapters in detailedDescription
    const chaptersText = chapters
      .map((ch) => `${ch.title}\n${ch.description}`)
      .join("\n\n");

    const trainingData = {
      ...formData,
      duration: parseFloat(formData.duration) || 0,
      price: parseFloat(formData.price) || 0,
      detailedDescription: `${formData.detailedDescription}\n\nChapitres:\n${chaptersText}`,
    };

    try {
      const response = await fetch(`${API_URL}/trainings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(trainingData),
      });

      if (!response.ok) {
        throw new Error("Failed to save training");
      }

      const data = await response.json();
      alert(
        isDraft
          ? "Brouillon enregistré avec succès !"
          : "Formation publiée avec succès !"
      );

      // Redirect to catalogue or dashboard
      navigate("/catalogue");
    } catch (error) {
      console.error("Error saving training:", error);
      alert("Erreur lors de l'enregistrement de la formation");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePublish = () => saveTraining(false);
  const handleSaveDraft = () => saveTraining(true);

  return (
    <div style={{ backgroundColor: "#FFECC8", minHeight: "100vh" }}>
      <div className="container-fluid">
        <div className="row">
          {/* Sidebar */}
          <div className="col-2 p-0" style={{ backgroundColor: "#FFE4B5" }}>
            <div className="p-3">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0">Gestionnaire</h5>
                <button
                  className="btn btn-sm"
                  style={{
                    backgroundColor: "#FFA500",
                    border: "none",
                    borderRadius: "5px",
                    padding: "5px 10px",
                  }}
                >
                  <span style={{ fontSize: "20px", color: "white" }}>−</span>
                </button>
              </div>

              <div
                className={`d-flex align-items-center p-2 mb-2 ${
                  currentSection === "formation" ? "bg-warning" : ""
                }`}
                style={{
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
                onClick={() => setCurrentSection("formation")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  style={{ width: "20px", height: "20px", marginRight: "10px" }}
                >
                  <path d="M3 3h18v2H3V3zm0 4h18v2H3V7zm0 4h18v2H3v-2zm0 4h18v2H3v-2zm0 4h18v2H3v-2z" />
                </svg>
                <span>Tableau de bord / Formation</span>
              </div>

              <div
                className={`d-flex align-items-center p-2 mb-2 ${
                  currentSection === "sessions" ? "bg-warning" : ""
                }`}
                style={{
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
                onClick={() => setCurrentSection("sessions")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  style={{ width: "20px", height: "20px", marginRight: "10px" }}
                >
                  <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z" />
                </svg>
                <span>Sessions</span>
              </div>

              <div
                className={`d-flex align-items-center p-2 mb-2 ${
                  currentSection === "inscriptions" ? "bg-warning" : ""
                }`}
                style={{
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
                onClick={() => setCurrentSection("inscriptions")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  style={{ width: "20px", height: "20px", marginRight: "10px" }}
                >
                  <path d="M16 11c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 3-1.34 3-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                </svg>
                <span>Inscriptions</span>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-10 p-5">
            <h2 className="mb-2">Contenu du cours</h2>
            <p className="text-secondary mb-4">
              Gérez le contenu de votre cours
            </p>

            <input
              type="text"
              className="form-control mb-4"
              placeholder=""
              style={{
                maxWidth: "400px",
                borderRadius: "5px",
                border: "1px solid #333",
              }}
            />

            {/* Informations du cours */}
            <h5 className="mb-3">Informations du cours</h5>

            <div className="mb-3" style={{ maxWidth: "400px" }}>
              <label className="form-label">Titre du cours</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="form-control"
                style={{ borderRadius: "5px", border: "1px solid #333" }}
              />
            </div>

            <div className="mb-3" style={{ maxWidth: "400px" }}>
              <label className="form-label">Sous-titre (Description courte)</label>
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="form-control"
                style={{ borderRadius: "5px", border: "1px solid #333" }}
              />
            </div>

            <div className="mb-3" style={{ maxWidth: "400px" }}>
              <label className="form-label">Catégorie</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="form-control"
                style={{ borderRadius: "5px", border: "1px solid #333" }}
              >
                <option value="">Sélectionner une catégorie</option>
                <option value="Informatique">Informatique</option>
                <option value="Design">Design</option>
                <option value="Management">Management</option>
              </select>
            </div>

            <div className="mb-3" style={{ maxWidth: "400px" }}>
              <label className="form-label">Durée (en heures)</label>
              <input
                type="number"
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
                className="form-control"
                style={{ borderRadius: "5px", border: "1px solid #333" }}
              />
            </div>

            <div className="mb-3" style={{ maxWidth: "400px" }}>
              <label className="form-label">Prix (en €)</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className="form-control"
                style={{ borderRadius: "5px", border: "1px solid #333" }}
              />
            </div>

            <div className="mb-4" style={{ maxWidth: "400px" }}>
              <label className="form-label">Prérequis</label>
              <input
                type="text"
                name="prerequisites"
                value={formData.prerequisites}
                onChange={handleInputChange}
                className="form-control"
                style={{ borderRadius: "5px", border: "1px solid #333" }}
              />
            </div>

            <div className="mb-4" style={{ maxWidth: "400px" }}>
              <label className="form-label">Image du cours</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="form-control"
                style={{ borderRadius: "5px", border: "1px solid #333" }}
                disabled={isLoading}
              />
              <small className="text-muted">Taille max: 5MB</small>
              {uploadedImage && (
                <div>
                  <small className="text-success">✓ {uploadedImage} uploadée</small>
                </div>
              )}
            </div>

            {/* Ce que vous apprendrez */}
            <h5 className="mb-3">Ce que vous apprendrez</h5>
            <textarea
              name="learnText"
              value={formData.learnText}
              onChange={handleInputChange}
              className="form-control mb-4"
              rows="5"
              placeholder="Décrivez ce que les étudiants apprendront dans ce cours..."
              style={{
                maxWidth: "400px",
                borderRadius: "5px",
                border: "1px solid #333",
              }}
            ></textarea>

            {/* Chapitres/Modules */}
            <h5 className="mb-3">Chapitres/Modules</h5>
            <div style={{ maxWidth: "700px" }}>
              {chapters.map((chapter) => (
                <div
                  key={chapter.id}
                  className="d-flex justify-content-between align-items-center p-3 mb-2 bg-white"
                  style={{
                    border: "1px solid #333",
                    borderRadius: "8px",
                  }}
                >
                  <div className="d-flex align-items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      style={{
                        width: "24px",
                        height: "24px",
                        marginRight: "15px",
                      }}
                    >
                      <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z" />
                    </svg>
                    <div>
                      <div className="fw-bold">{chapter.title}</div>
                      <div className="text-secondary small">
                        {chapter.description}
                      </div>
                    </div>
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    style={{
                      width: "20px",
                      height: "20px",
                      cursor: "pointer",
                    }}
                  >
                    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                  </svg>
                </div>
              ))}

              <button
                className="btn btn-outline-dark mt-2"
                onClick={addChapter}
                style={{ borderRadius: "5px" }}
              >
                Ajouter un chapitre
              </button>
            </div>

            {/* Contenu pédagogique */}
            <h5 className="mb-3 mt-4">Contenu pédagogique</h5>
            <textarea
              name="detailedDescription"
              value={formData.detailedDescription}
              onChange={handleInputChange}
              className="form-control mb-4"
              rows="5"
              placeholder="Description détaillée du contenu pédagogique..."
              style={{
                maxWidth: "400px",
                borderRadius: "5px",
                border: "1px solid #333",
              }}
            ></textarea>

            {/* Vidéos */}
            <h5 className="mb-3">Vidéos</h5>
            <div
              className="text-center p-5 mb-4 bg-white"
              style={{
                maxWidth: "700px",
                border: "2px dashed #333",
                borderRadius: "8px",
              }}
            >
              <h6>Ajouter une vidéo</h6>
              <p className="text-secondary small">
                Glissez-déposez ou cliquez pour télécharger une vidéo (max 50MB)
              </p>
              <input
                type="file"
                accept="video/*"
                onChange={handleVideoUpload}
                style={{ display: "none" }}
                id="videoUpload"
                disabled={isLoading}
              />
              <label
                htmlFor="videoUpload"
                className="btn btn-outline-dark"
                style={{
                  borderRadius: "5px",
                  cursor: isLoading ? "not-allowed" : "pointer",
                  opacity: isLoading ? 0.6 : 1,
                }}
              >
                {isLoading ? "Upload en cours..." : "Choisir un fichier"}
              </label>
              {uploadedVideo && (
                <div className="mt-3">
                  <small className="text-success">✓ {uploadedVideo} uploadée</small>
                </div>
              )}
            </div>

            {/* Fichiers */}
            <h5 className="mb-3">Fichiers</h5>
            <div
              className="text-center p-5 mb-4 bg-white"
              style={{
                maxWidth: "700px",
                border: "2px dashed #333",
                borderRadius: "8px",
              }}
            >
              <h6>Ajouter des fichiers</h6>
              <p className="text-secondary small">
                Glissez-déposez ou cliquez pour télécharger des fichiers (max 10MB par fichier)
              </p>
              <input
                type="file"
                multiple
                onChange={handleFilesUpload}
                style={{ display: "none" }}
                id="filesUpload"
                disabled={isLoading}
              />
              <label
                htmlFor="filesUpload"
                className="btn btn-outline-dark"
                style={{
                  borderRadius: "5px",
                  cursor: isLoading ? "not-allowed" : "pointer",
                  opacity: isLoading ? 0.6 : 1,
                }}
              >
                {isLoading ? "Upload en cours..." : "Choisir des fichiers"}
              </label>
              {uploadedFiles.length > 0 && (
                <div className="mt-3">
                  <small className="text-success">
                    ✓ {uploadedFiles.length} fichier(s) uploadé(s)
                  </small>
                  <ul className="list-unstyled mt-2">
                    {uploadedFiles.map((file, index) => (
                      <li key={index} className="small">
                        {file}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="d-flex gap-3 mb-5">
              <button
                className="btn"
                onClick={handlePublish}
                disabled={isLoading || !formData.title || !formData.category}
                style={{
                  backgroundColor: "#28a745",
                  color: "white",
                  borderRadius: "5px",
                  padding: "10px 30px",
                  opacity: isLoading || !formData.title || !formData.category ? 0.6 : 1,
                }}
              >
                {isLoading ? "Chargement..." : "Publier"}
              </button>
              <button
                className="btn"
                onClick={handleSaveDraft}
                disabled={isLoading}
                style={{
                  backgroundColor: "#FFA500",
                  color: "white",
                  borderRadius: "5px",
                  padding: "10px 30px",
                  opacity: isLoading ? 0.6 : 1,
                }}
              >
                {isLoading ? "Chargement..." : "Enregistrer le brouillon"}
              </button>
            </div>

            {/* Footer */}
            <footer className="mt-5 pt-4 border-top">
              <div className="d-flex justify-content-between mb-3">
                <Link
                  to="/mentions-legales"
                  className="text-decoration-none text-dark"
                >
                  Terms of Service
                </Link>
                <Link
                  to="/politique-confidentialite"
                  className="text-decoration-none text-dark"
                >
                  Privacy Policy
                </Link>
                <Link to="/contact" className="text-decoration-none text-dark">
                  Contact Us
                </Link>
              </div>
              <div className="text-center">
                <p className="text-secondary mb-0">
                  © 2025 TXL FORMA. All rights reserved.
                </p>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseContent;
