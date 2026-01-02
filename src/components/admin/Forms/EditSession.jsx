import { useState, useEffect } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

function EditSession({ sessionId, onClose }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    duration: "",
    capacity: "",
    instructorId: "",
    placeId: "",
  });

  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [error, setError] = useState(null);
  const [instructors, setInstructors] = useState([]);
  const [loadingInstructors, setLoadingInstructors] = useState(true);
  const [places, setPlaces] = useState([]);
  const [loadingPlaces, setLoadingPlaces] = useState(true);

  // Charger la liste des instructeurs
  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        const response = await fetch(`${API_URL}/api/instructors`);
        if (!response.ok) {
          throw new Error("Erreur lors du chargement des instructeurs");
        }
        const data = await response.json();
        setInstructors(data);
      } catch (err) {
        console.error("Erreur:", err);
      } finally {
        setLoadingInstructors(false);
      }
    };

    fetchInstructors();
  }, []);

  // Charger la liste des lieux
  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await fetch(`${API_URL}/api/places`);
        if (!response.ok) {
          throw new Error("Erreur lors du chargement des lieux");
        }
        const data = await response.json();
        setPlaces(data);
      } catch (err) {
        console.error("Erreur:", err);
      } finally {
        setLoadingPlaces(false);
      }
    };

    fetchPlaces();
  }, []);

  // Charger les données de la session existante
  useEffect(() => {
    const fetchSession = async () => {
      try {
        const response = await fetch(`${API_URL}/api/sessions/${sessionId}`);

        if (!response.ok) {
          throw new Error("Erreur lors du chargement de la session");
        }

        const data = await response.json();

        // Formater les dates pour les inputs datetime-local
        const formatDateForInput = (dateString) => {
          if (!dateString) return "";
          const date = new Date(dateString);
          return date.toISOString().slice(0, 16);
        };

        setFormData({
          title: data.title || "",
          description: data.description || "",
          startDate: formatDateForInput(data.startDate),
          endDate: formatDateForInput(data.endDate),
          duration: data.duration || "",
          capacity: data.capacity || "",
          instructorId: data.instructor?.id || "",
          placeId: data.place?.id || "",
        });
      } catch (err) {
        setError(err.message);
        console.error("Erreur:", err);
      } finally {
        setLoadingData(false);
      }
    };

    if (sessionId) {
      fetchSession();
    }
  }, [sessionId]);

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
      const response = await fetch(`${API_URL}/api/sessions/${sessionId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la modification de la session");
      }

      const result = await response.json();
      console.log("Session modifiée avec succès:", result);

      // Retourner à la liste après modification
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
        "Êtes-vous sûr de vouloir supprimer cette session ? Cette action est irréversible."
      )
    ) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/api/sessions/${sessionId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la suppression de la session");
      }

      console.log("Session supprimée avec succès");

      // Retourner à la liste après suppression
      onClose();
    } catch (err) {
      setError(err.message);
      console.error("Erreur:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loadingData) {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12 text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Chargement...</span>
            </div>
            <p className="mt-3">Chargement de la session...</p>
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
            <h3>Modification de la session</h3>
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
                <label htmlFor="title" className="form-label">
                  Titre <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Titre de la session"
                  required
                />
              </div>

              {/* Description - Pleine largeur */}
              <div className="mb-4">
                <label htmlFor="description" className="form-label">
                  Description <span className="text-danger">*</span>
                </label>
                <textarea
                  className="form-control"
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Description de la session"
                  rows="4"
                  required
                ></textarea>
              </div>

              {/* Champs courts sur une ligne */}
              <div className="row">
                <div className="col-md-3 mb-4">
                  <label htmlFor="startDate" className="form-label">
                    Date de début <span className="text-danger">*</span>
                  </label>
                  <input
                    type="datetime-local"
                    className="form-control"
                    id="startDate"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-3 mb-4">
                  <label htmlFor="endDate" className="form-label">
                    Date de fin <span className="text-danger">*</span>
                  </label>
                  <input
                    type="datetime-local"
                    className="form-control"
                    id="endDate"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-3 mb-4">
                  <label htmlFor="duration" className="form-label">
                    Durée (heures) <span className="text-danger">*</span>
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="duration"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    placeholder="Ex: 40"
                    step="0.1"
                    required
                  />
                </div>

                <div className="col-md-3 mb-4">
                  <label htmlFor="capacity" className="form-label">
                    Capacité <span className="text-danger">*</span>
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="capacity"
                    name="capacity"
                    value={formData.capacity}
                    onChange={handleChange}
                    placeholder="Nombre de places"
                    required
                    min="1"
                  />
                </div>
              </div>

              {/* Enseignant - Pleine largeur */}
              <div className="mb-4">
                <label htmlFor="instructorId" className="form-label">
                  Enseignant <span className="text-danger">*</span>
                </label>
                {loadingInstructors ? (
                  <div className="form-control">
                    Chargement des enseignants...
                  </div>
                ) : (
                  <select
                    className="form-select"
                    id="instructorId"
                    name="instructorId"
                    value={formData.instructorId}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Sélectionner un enseignant</option>
                    {instructors.map((instructor) => (
                      <option key={instructor.id} value={instructor.id}>
                        {instructor.firstName} {instructor.lastName} -{" "}
                        {instructor.specialty}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              {/* Lieu - Pleine largeur */}
              <div className="mb-4">
                <label htmlFor="placeId" className="form-label">
                  Lieu <span className="text-danger">*</span>
                </label>
                {loadingPlaces ? (
                  <div className="form-control">Chargement des lieux...</div>
                ) : (
                  <select
                    className="form-select"
                    id="placeId"
                    name="placeId"
                    value={formData.placeId}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Sélectionner un lieu</option>
                    {places.map((place) => (
                      <option key={place.id} value={place.id}>
                        {place.city} - {place.address} (Capacité:{" "}
                        {place.maxCapacity})
                      </option>
                    ))}
                  </select>
                )}
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
                    className="btn btn-primary"
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditSession;
