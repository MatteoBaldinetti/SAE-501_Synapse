import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../constants/apiConstants";
import ProfSidebarCollapsible from "../../components/ProfSidebarCollapsible";
import { useAuth } from "../../contexts/AuthContext";

function MyStudents() {
  const [inscriptions, setInscriptions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingInscription, setEditingInscription] = useState(null);
  const [editNote, setEditNote] = useState("");
  const navigate = useNavigate();
  const { userId } = useAuth();

  // Fonction pour récupérer les inscriptions du professeur
  const fetchProfessorInscriptions = async () => {
    try {
      // 1. Récupérer toutes les sessions où le professeur est instructeur
      const sessionsRes = await fetch(`${API_URL}/sessions`);
      const allSessions = await sessionsRes.json();
      const profSessions = allSessions.filter(
        (session) => session.instructor?.id === userId
      );
      const profSessionIds = profSessions.map((s) => s.id);

      // 2. Récupérer les inscriptions des étudiants
      const inscriptionsRes = await fetch(`${API_URL}/inscriptions/search?userType=0`);
      const allInscriptions = await inscriptionsRes.json();

      // 3. Filtrer pour ne garder que les inscriptions aux sessions du prof
      const profInscriptions = allInscriptions.filter(
        (inscription) =>
          inscription.session && profSessionIds.includes(inscription.session.id)
      );

      setInscriptions(profInscriptions);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchProfessorInscriptions();
    }
  }, [userId]);

  const filteredStudents = inscriptions.filter((inscription) => {
    if (!inscription.user) return false;
    const fullName = `${inscription.user.firstname} ${inscription.user.lastname}`.toLowerCase();
    const email = inscription.user.email?.toLowerCase() || "";
    return (
      fullName.includes(searchTerm.toLowerCase()) ||
      email.includes(searchTerm.toLowerCase())
    );
  });

  // Update inscription status
  const updateStatus = async (inscriptionId, newStatus) => {
    try {
      const inscription = inscriptions.find((i) => i.id === inscriptionId);
      const response = await fetch(`${API_URL}/inscriptions/${inscriptionId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...inscription,
          status: newStatus,
          user: { id: inscription.user.id },
          session: inscription.session ? { id: inscription.session.id } : null,
          training: inscription.training ? { id: inscription.training.id } : null,
        }),
      });

      if (response.ok) {
        // Refresh data
        await fetchProfessorInscriptions();
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  // Open edit modal
  const handleEditClick = (inscription) => {
    setEditingInscription(inscription);
    setEditNote(inscription.amount || "");
  };

  // Save edited note
  const handleSaveNote = async () => {
    if (!editingInscription) return;

    const noteValue = parseFloat(editNote);
    if (isNaN(noteValue) || noteValue < 0 || noteValue > 20) {
      alert("La note doit être entre 0 et 20");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/inscriptions/${editingInscription.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...editingInscription,
          amount: noteValue,
          user: { id: editingInscription.user.id },
          session: editingInscription.session ? { id: editingInscription.session.id } : null,
          training: editingInscription.training ? { id: editingInscription.training.id } : null,
        }),
      });

      if (response.ok) {
        // Refresh data
        await fetchProfessorInscriptions();
        setEditingInscription(null);
        setEditNote("");
      } else {
        alert("Erreur lors de la modification de la note");
      }
    } catch (error) {
      console.error("Error updating note:", error);
      alert("Erreur lors de la modification de la note");
    }
  };

  const getStatusBadge = (inscriptionId, status) => {
    if (status === "PRESENT" || status === "Présent") {
      return (
        <div className="btn-group" role="group">
          <button
            className="btn btn-sm"
            style={{
              backgroundColor: "#d4edda",
              color: "#155724",
              border: "1px solid #c3e6cb",
              borderRadius: "20px 0 0 20px",
              padding: "5px 12px",
              fontWeight: "bold",
            }}
          >
            Présent
          </button>
          <button
            className="btn btn-sm"
            onClick={() => updateStatus(inscriptionId, "ABSENT")}
            style={{
              backgroundColor: "#f8d7da",
              color: "#721c24",
              border: "1px solid #f5c6cb",
              borderRadius: "0 20px 20px 0",
              padding: "5px 12px",
              opacity: 0.5,
            }}
            title="Marquer comme absent"
          >
            Absent
          </button>
        </div>
      );
    } else if (status === "ABSENT" || status === "Absent") {
      return (
        <div className="btn-group" role="group">
          <button
            className="btn btn-sm"
            onClick={() => updateStatus(inscriptionId, "PRESENT")}
            style={{
              backgroundColor: "#d4edda",
              color: "#155724",
              border: "1px solid #c3e6cb",
              borderRadius: "20px 0 0 20px",
              padding: "5px 12px",
              opacity: 0.5,
            }}
            title="Marquer comme présent"
          >
            Présent
          </button>
          <button
            className="btn btn-sm"
            style={{
              backgroundColor: "#f8d7da",
              color: "#721c24",
              border: "1px solid #f5c6cb",
              borderRadius: "0 20px 20px 0",
              padding: "5px 12px",
              fontWeight: "bold",
            }}
          >
            Absent
          </button>
        </div>
      );
    } else {
      return (
        <div className="btn-group" role="group">
          <button
            className="btn btn-sm"
            onClick={() => updateStatus(inscriptionId, "PRESENT")}
            style={{
              backgroundColor: "#d4edda",
              border: "1px solid #c3e6cb",
              color: "#155724",
              borderRadius: "20px 0 0 20px",
              padding: "5px 10px",
              fontSize: "12px",
            }}
          >
            Présent
          </button>
          <button
            className="btn btn-sm"
            onClick={() => updateStatus(inscriptionId, "ABSENT")}
            style={{
              backgroundColor: "#f8d7da",
              border: "1px solid #f5c6cb",
              color: "#721c24",
              borderRadius: "0 20px 20px 0",
              padding: "5px 10px",
              fontSize: "12px",
            }}
          >
            Absent
          </button>
        </div>
      );
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR");
  };

  return (
    <div style={{ backgroundColor: "#FFECC8", minHeight: "100vh" }}>
      <div className="container-fluid">
        <div className="row">
          <ProfSidebarCollapsible />

          <div className="col p-5">
            <div className="d-flex align-items-center mb-4">
              <button
                onClick={() => navigate(-1)}
                className="btn me-3"
                style={{
                  backgroundColor: "#ff8c00",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  padding: "10px 15px",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                  />
                </svg>
              </button>
              <h2 className="mb-0">Mes élèves</h2>
            </div>

            <div className="position-relative mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                style={{
                  position: "absolute",
                  left: "15px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: "20px",
                  height: "20px",
                  color: "#6c757d",
                  zIndex: 1,
                }}
              >
                <path d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z" />
              </svg>
              <input
                type="text"
                placeholder="Rechercher des élèves"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-control"
                style={{
                  paddingLeft: "50px",
                  borderRadius: "8px",
                  border: "1px solid #cbd5e0",
                  backgroundColor: "#e8f0f8",
                  height: "50px",
                }}
              />
            </div>

            <div
              className="bg-white rounded-3 mt-4 pb-5"
              style={{
                border: "2px solid #1a1a1a",
                overflow: "hidden",
              }}
            >
              <table className="table table-hover mb-0">
                <thead style={{ backgroundColor: "#f8f9fa" }}>
                  <tr>
                    <th style={{ padding: "15px", borderBottom: "2px solid #dee2e6" }}>
                      Nom
                    </th>
                    <th style={{ padding: "15px", borderBottom: "2px solid #dee2e6" }}>
                      Email
                    </th>
                    <th style={{ padding: "15px", borderBottom: "2px solid #dee2e6" }}>
                      Hébergement
                    </th>
                    <th style={{ padding: "15px", borderBottom: "2px solid #dee2e6" }}>
                      Dernière activité
                    </th>
                    <th style={{ padding: "15px", borderBottom: "2px solid #dee2e6" }}>
                      Note
                    </th>
                    <th style={{ padding: "15px", borderBottom: "2px solid #dee2e6" }}>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((inscription) => (
                    <tr key={inscription.id}>
                      <td style={{ padding: "15px", verticalAlign: "middle" }}>
                        {inscription.user?.firstname} {inscription.user?.lastname}
                      </td>
                      <td style={{ padding: "15px", verticalAlign: "middle" }}>
                        {inscription.user?.email || "-"}
                      </td>
                      <td style={{ padding: "15px", verticalAlign: "middle" }}>
                        {getStatusBadge(inscription.id, inscription.status)}
                      </td>
                      <td style={{ padding: "15px", verticalAlign: "middle" }}>
                        {formatDate(inscription.date || inscription.inscriptionDate)}
                      </td>
                      <td style={{ padding: "15px", verticalAlign: "middle" }}>
                        {inscription.amount ? `${inscription.amount}/20` : "-"}
                      </td>
                      <td style={{ padding: "15px", verticalAlign: "middle" }}>
                        <button
                          onClick={() => handleEditClick(inscription)}
                          className="btn btn-sm"
                          style={{
                            backgroundColor: "transparent",
                            border: "1px solid #1a1a1a",
                            color: "#1a1a1a",
                            borderRadius: "8px",
                            padding: "5px 15px",
                          }}
                        >
                          Modifier
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Modal d'édition de note */}
            {editingInscription && (
              <div
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 1000,
                }}
                onClick={() => setEditingInscription(null)}
              >
                <div
                  className="bg-white rounded-3 p-4"
                  style={{
                    border: "2px solid #1a1a1a",
                    minWidth: "400px",
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <h5 className="mb-3">
                    Modifier la note de {editingInscription.user?.firstname}{" "}
                    {editingInscription.user?.lastname}
                  </h5>
                  <div className="mb-3">
                    <label className="form-label">Note (sur 20)</label>
                    <input
                      type="number"
                      className="form-control"
                      value={editNote}
                      onChange={(e) => setEditNote(e.target.value)}
                      min="0"
                      max="20"
                      step="0.5"
                      style={{
                        border: "1px solid #cbd5e0",
                        borderRadius: "8px",
                        padding: "10px",
                      }}
                    />
                  </div>
                  <div className="d-flex gap-2 justify-content-end">
                    <button
                      onClick={() => setEditingInscription(null)}
                      className="btn"
                      style={{
                        backgroundColor: "#F5F5F5",
                        color: "#1a1a1a",
                        border: "1px solid #D3D3D3",
                        borderRadius: "8px",
                        padding: "8px 20px",
                      }}
                    >
                      Annuler
                    </button>
                    <button
                      onClick={handleSaveNote}
                      className="btn"
                      style={{
                        backgroundColor: "#28a745",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        padding: "8px 20px",
                      }}
                    >
                      Enregistrer
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyStudents;
