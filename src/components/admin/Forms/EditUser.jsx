import { useState, useEffect } from "react";
import bcrypt from "bcryptjs";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

function EditUser({ userId, onClose }) {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    type: 0,
    phoneNumber: "",
  });

  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [error, setError] = useState(null);

  // Charger les données de l'utilisateur existant
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`${API_URL}/api/users/${userId}`);

        if (!response.ok) {
          throw new Error("Erreur lors du chargement de l'utilisateur");
        }

        const data = await response.json();
        setFormData({
          firstname: data.firstname || "",
          lastname: data.lastname || "",
          email: data.email || "",
          password: "", // Ne pas pré-remplir le mot de passe pour des raisons de sécurité
          type: data.type || 0,
          phoneNumber: data.phoneNumber || "",
        });
      } catch (err) {
        setError(err.message);
        console.error("Erreur:", err);
      } finally {
        setLoadingData(false);
      }
    };

    if (userId) {
      fetchUser();
    }
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "type" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const dataToSend = { ...formData };

      if (dataToSend.password && dataToSend.password.trim() !== "") {
        const salt = await bcrypt.genSalt(5);
        dataToSend.password = await bcrypt.hash(dataToSend.password, salt);
      } else {
        delete dataToSend.password;
      }

      const response = await fetch(`${API_URL}/api/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la modification de l'utilisateur");
      }

      const result = await response.json();
      console.log("Utilisateur modifié avec succès:", result);

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
        "Êtes-vous sûr de vouloir supprimer cet utilisateur ? Cette action est irréversible."
      )
    ) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/api/users/${userId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la suppression de l'utilisateur");
      }

      console.log("Utilisateur supprimé avec succès");

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
            <p className="mt-3">Chargement de l'utilisateur...</p>
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
            <h3>Modification de l'utilisateur</h3>
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
              {/* Prénom et Nom sur une ligne */}
              <div className="row">
                <div className="col-md-6 mb-4">
                  <label htmlFor="firstname" className="form-label">
                    Prénom <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstname"
                    name="firstname"
                    value={formData.firstname}
                    onChange={handleChange}
                    placeholder="Prénom de l'utilisateur"
                    required
                  />
                </div>

                <div className="col-md-6 mb-4">
                  <label htmlFor="lastname" className="form-label">
                    Nom <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastname"
                    name="lastname"
                    value={formData.lastname}
                    onChange={handleChange}
                    placeholder="Nom de l'utilisateur"
                    required
                  />
                </div>
              </div>

              {/* Email et Téléphone sur une ligne */}
              <div className="row">
                <div className="col-md-6 mb-4">
                  <label htmlFor="email" className="form-label">
                    Email <span className="text-danger">*</span>
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="email@exemple.com"
                    required
                  />
                </div>

                <div className="col-md-6 mb-4">
                  <label htmlFor="phoneNumber" className="form-label">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    className="form-control"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="06 12 34 56 78"
                  />
                </div>
              </div>

              {/* Mot de passe et Type de compte sur une ligne */}
              <div className="row">
                <div className="col-md-6 mb-4">
                  <label htmlFor="password" className="form-label">
                    Nouveau mot de passe
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Laisser vide pour ne pas modifier"
                    minLength="6"
                  />
                  <small className="form-text text-muted">
                    Laisser vide pour conserver le mot de passe actuel (minimum
                    6 caractères si modifié)
                  </small>
                </div>

                <div className="col-md-6 mb-4">
                  <label htmlFor="type" className="form-label">
                    Type de compte <span className="text-danger">*</span>
                  </label>
                  <select
                    className="form-select"
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    required
                  >
                    <option value={0}>0 - Membre</option>
                    <option value={1}>1 - Enseignant</option>
                    <option value={2}>2 - Administrateur</option>
                  </select>
                </div>
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

export default EditUser;
