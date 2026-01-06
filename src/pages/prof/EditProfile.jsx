import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../constants/apiConstants";
import { useAuth } from "../../contexts/AuthContext";

function EditProfile() {
  const { userId } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      if (!userId) return;

      try {
        const res = await fetch(`${API_URL}/users/${userId}`);
        const data = await res.json();
        setUserData(data);
        setFormData({
          firstname: data.firstname || "",
          lastname: data.lastname || "",
          email: data.email || "",
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user:", error);
        setLoading(false);
      }
    };
    fetchUser();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Fusionner les données modifiées avec les données originales
      const updatedUser = {
        ...userData,
        firstname: formData.firstname,
        lastname: formData.lastname,
        email: formData.email,
      };

      const response = await fetch(`${API_URL}/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      });

      if (response.ok) {
        alert("Profil modifié avec succès");
        navigate(`/prof-profile/${userId}`);
      } else {
        const errorText = await response.text();
        console.error("Update error:", errorText);
        alert("Erreur lors de la modification du profil");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Erreur lors de la modification du profil");
    }
  };

  if (loading) {
    return (
      <div className="p-5" style={{ backgroundColor: "#FFECC8", minHeight: "100vh" }}>
        <div className="text-center">Chargement...</div>
      </div>
    );
  }

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>Modifier le profil</h3>
        <button
          onClick={() => navigate(`/prof-profile/${userId}`)}
          className="btn btn-prof"
        >
          Retour
        </button>
      </div>

      {/* Edit Form */}
      <div className="bg-white border rounded p-5" style={{ maxWidth: "1200px", width: "100%" }}>
          <form onSubmit={handleSubmit}>
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">
                  <strong>Prénom</strong>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleChange}
                  required
                  style={{
                    border: "1px solid #cbd5e0",
                    borderRadius: "8px",
                    padding: "10px",
                  }}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">
                  <strong>Nom</strong>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleChange}
                  required
                  style={{
                    border: "1px solid #cbd5e0",
                    borderRadius: "8px",
                    padding: "10px",
                  }}
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="form-label">
                <strong>Email</strong>
              </label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                style={{
                  border: "1px solid #cbd5e0",
                  borderRadius: "8px",
                  padding: "10px",
                  maxWidth: "600px",
                }}
              />
            </div>

            <div className="d-flex gap-3">
              <button
                type="submit"
                className="btn btn-prof"
              >
                Enregistrer les modifications
              </button>
              <button
                type="button"
                onClick={() => navigate(`/prof-profile/${userId}`)}
                className="btn"
              >
                Annuler
              </button>
            </div>
          </form>
        </div>
    </div>
  );
}

export default EditProfile;
