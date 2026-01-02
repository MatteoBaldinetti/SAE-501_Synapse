import { useState, useEffect } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

function EditInstructor({ instructorId, onClose }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    contractType: "",
    specialty: "",
  });

  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [error, setError] = useState(null);
  const [sessions, setSessions] = useState([]);

  // Charger les données de l'enseignant existant
  useEffect(() => {
    const fetchInstructor = async () => {
      try {
        const response = await fetch(
          `${API_URL}/api/instructors/${instructorId}`
        );

        if (!response.ok) {
          throw new Error("Erreur lors du chargement de l'enseignant");
        }

        const data = await response.json();
        setFormData({
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          contractType: data.contractType || "",
          specialty: data.specialty || "",
        });
      } catch (err) {
        setError(err.message);
        console.error("Erreur:", err);
      } finally {
        setLoadingData(false);
      }
    };

    if (instructorId) {
      fetchInstructor();
    }
  }, [instructorId]);

  // Charger les sessions de l'enseignant
  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await fetch(`${API_URL}/api/sessions`);
        if (!response.ok) {
          throw new Error("Erreur lors du chargement des sessions");
        }
        const allSessions = await response.json();

        // Filtrer les sessions de cet enseignant
        const instructorSessions = allSessions.filter(
          (session) => session.instructor?.id === instructorId
        );
        setSessions(instructorSessions);
      } catch (err) {
        console.error("Erreur lors du chargement des sessions:", err);
      }
    };

    if (instructorId) {
      fetchSessions();
    }
  }, [instructorId]);

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
      const response = await fetch(
        `${API_URL}/api/instructors/${instructorId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Erreur lors de la modification de l'enseignant");
      }

      const result = await response.json();
      console.log("Enseignant modifié avec succès:", result);

      onClose();
    } catch (err) {
      setError(err.message);
      console.error("Erreur:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (
      !window.confirm(
        "Êtes-vous sûr de vouloir supprimer cet enseignant ? Cette action est irréversible."
      )
    ) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${API_URL}/api/instructors/${instructorId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Erreur lors de la suppression de l'enseignant");
      }

      console.log("Enseignant supprimé avec succès");

      onClose();
    } catch (err) {
      setError(err.message);
      console.error("Erreur:", err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR");
  };

  if (loadingData) {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12 text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Chargement...</span>
            </div>
            <p className="mt-3">Chargement de l'enseignant...</p>
          </div>
        </div>
      </div>
    );
  }

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
            <h3>Modification de l'enseignant</h3>
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

              <div className="d-flex justify-content-between mt-4">
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleDelete}
                  disabled={loading}
                >
                  {loading ? "Suppression en cours..." : "Supprimer"}
                </button>
                <div className="d-flex gap-2">
                  <button
                    type="submit"
                    className="btn btn-admin"
                    disabled={loading}
                  >
                    {loading ? "Modification en cours..." : "Modifier"}
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
              </div>
            </form>

            {/* Tableau des sessions */}
            <div className="mt-5">
              <h4>Sessions assignées ({sessions.length})</h4>
              {sessions.length > 0 ? (
                <div className="container mt-3">
                  <div className="row p-3 border rounded-top-3 bg-white">
                    <div className="col-4">
                      <b>Titre de la session</b>
                    </div>
                    <div className="col-3">
                      <b>Formation</b>
                    </div>
                    <div className="col-2">
                      <b>Date début</b>
                    </div>
                    <div className="col-2">
                      <b>Date fin</b>
                    </div>
                    <div className="col-1">
                      <b>Durée</b>
                    </div>
                  </div>
                  {sessions.map((session, index) => (
                    <div
                      className="row py-3 border bg-white"
                      key={session.id || index}
                    >
                      <div className="col-4">{session.title || "N/A"}</div>
                      <div className="col-3">
                        {session.training?.title || "N/A"}
                      </div>
                      <div className="col-2">
                        {formatDate(session.startDate)}
                      </div>
                      <div className="col-2">{formatDate(session.endDate)}</div>
                      <div className="col-1">{session.duration || 0}h</div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted mt-3">
                  Aucune session assignée à cet enseignant.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditInstructor;
