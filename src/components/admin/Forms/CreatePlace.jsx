import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

function CreatePlace({ onClose }) {
  const [formData, setFormData] = useState({
    city: "",
    address: "",
    zip: "",
    maxCapacity: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
      const response = await fetch(`${API_URL}/api/places`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la création du lieu");
      }

      const result = await response.json();
      console.log("Lieu créé avec succès:", result);

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
            <h3>Création d'un lieu</h3>
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

export default CreatePlace;
