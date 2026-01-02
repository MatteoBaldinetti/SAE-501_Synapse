/**
 * EditPlace.jsx - Formulaire de modification d'un lieu
 * 
 * Permet de modifier un lieu de formation existant.
 * Pré-remplit le formulaire avec les données actuelles du lieu.
 * 
 * Utilisé par : AdminPlaces.jsx
 * Dépendances : API_URL
 */

import { useState, useEffect } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

function EditPlace({ placeId, onClose }) {
  const [formData, setFormData] = useState({
    city: "",
    address: "",
    zip: "",
    maxCapacity: "",
  });

  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [error, setError] = useState(null);
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const response = await fetch(`${API_URL}/api/places/${placeId}`);

        if (!response.ok) {
          throw new Error("Erreur lors du chargement du lieu");
        }

        const data = await response.json();
        setFormData({
          city: data.city || "",
          address: data.address || "",
          zip: data.zip || "",
          maxCapacity: data.maxCapacity || "",
        });
      } catch (err) {
        setError(err.message);
        console.error("Erreur:", err);
      } finally {
        setLoadingData(false);
      }
    };

    if (placeId) {
      fetchPlace();
    }
  }, [placeId]);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await fetch(`${API_URL}/api/sessions`);
        if (!response.ok) {
          throw new Error("Erreur lors du chargement des sessions");
        }
        const allSessions = await response.json();

        const placeSessions = allSessions.filter(
          (session) => session.place?.id === placeId
        );
        setSessions(placeSessions);
      } catch (err) {
        console.error("Erreur lors du chargement des sessions:", err);
      }
    };

    if (placeId) {
      fetchSessions();
    }
  }, [placeId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "maxCapacity" ? parseInt(value) || "" : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/api/places/${placeId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la modification du lieu");
      }

      const result = await response.json();
      console.log("Lieu modifié avec succès:", result);

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
        "Êtes-vous sûr de vouloir supprimer ce lieu ? Cette action est irréversible."
      )
    ) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/api/places/${placeId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la suppression du lieu");
      }

      console.log("Lieu supprimé avec succès");

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
            <p className="mt-3">Chargement du lieu...</p>
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
            <h3>Modification du lieu</h3>
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
                  <label htmlFor="city" className="form-label">
                    Ville <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Nom de la ville"
                    required
                  />
                </div>

                <div className="col-md-6 mb-4">
                  <label htmlFor="zip" className="form-label">
                    Code postal <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="zip"
                    name="zip"
                    value={formData.zip}
                    onChange={handleChange}
                    placeholder="Code postal"
                    required
                    maxLength="5"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="address" className="form-label">
                  Adresse <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Adresse complète"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="maxCapacity" className="form-label">
                  Capacité maximale <span className="text-danger">*</span>
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="maxCapacity"
                  name="maxCapacity"
                  value={formData.maxCapacity}
                  onChange={handleChange}
                  placeholder="Nombre de places maximum"
                  required
                  min="1"
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

            <div className="mt-5">
              <h4>Sessions dans ce lieu ({sessions.length})</h4>
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
                  Aucune session programmée dans ce lieu.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditPlace;
