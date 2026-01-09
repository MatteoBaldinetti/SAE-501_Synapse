import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL, API_KEY } from "../../constants/apiConstants";
import { useAuth } from "../../contexts/AuthContext";

/**
 * MyStudentsContent
 * Composant de contenu pour la gestion des élèves du professeur
 * Affiche les inscriptions groupées par formation avec gestion des statuts et notes
 */
function MyStudentsContent() {
  const [inscriptions, setInscriptions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingInscription, setEditingInscription] = useState(null);
  const [editNote, setEditNote] = useState("");
  const [selectedSession, setSelectedSession] = useState("all");
  const [availableSessions, setAvailableSessions] = useState([]);
  const navigate = useNavigate();
  const { userId } = useAuth();

  // Fonction pour récupérer les inscriptions du professeur
  const fetchProfessorInscriptions = async () => {
    try {
      // 1. Récupérer toutes les sessions où le professeur est instructeur
      const sessionsRes = await fetch(`${API_URL}/sessions`, {
        method: "GET",
        headers: { "X-API-KEY": API_KEY },
      });
      const allSessions = await sessionsRes.json();
      const profSessions = allSessions.filter(
        (session) => session.instructor?.id === userId
      );
      const profSessionIds = profSessions.map((s) => s.id);

      // 2. Récupérer les inscriptions des étudiants
      const inscriptionsRes = await fetch(
        `${API_URL}/inscriptions/search?userType=0`, {
        method: "GET",
        headers: { "X-API-KEY": API_KEY },
      }
      );
      const allInscriptions = await inscriptionsRes.json();

      // 3. Filtrer pour ne garder que les inscriptions aux sessions du prof
      const profInscriptions = allInscriptions.filter(
        (inscription) =>
          inscription.session && profSessionIds.includes(inscription.session.id)
      );

      setInscriptions(profInscriptions);

      // Extraire les sessions uniques
      const sessions = [
        ...new Set(
          profInscriptions
            .filter((i) => i.session)
            .map((i) =>
              JSON.stringify({
                id: i.session.id,
                title: i.session.title,
              })
            )
        ),
      ].map((s) => JSON.parse(s));

      setAvailableSessions(sessions);
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
    const fullName =
      `${inscription.user.firstname} ${inscription.user.lastname}`.toLowerCase();
    const email = inscription.user.email?.toLowerCase() || "";
    return (
      fullName.includes(searchTerm.toLowerCase()) ||
      email.includes(searchTerm.toLowerCase())
    );
  });

  // Grouper les élèves par session
  const groupBySession = () => {
    const grouped = {};

    filteredStudents.forEach((inscription) => {
      const sessionId = inscription.session?.id;
      const sessionTitle = inscription.session?.title || "Sans session";
      const sessionDate = inscription.session?.startDate
        ? new Date(inscription.session.startDate).toLocaleDateString("fr-FR", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })
        : "";

      if (!grouped[sessionId]) {
        grouped[sessionId] = {
          title: sessionTitle,
          date: sessionDate,
          training: inscription.session?.training?.title || "",
          students: [],
        };
      }

      grouped[sessionId].students.push(inscription);
    });

    return Object.values(grouped);
  };

  const groupedStudents = groupBySession();

  // Filtrer par session sélectionnée
  const displayedGroups =
    selectedSession === "all"
      ? groupedStudents
      : groupedStudents.filter((group) =>
        group.students.some(
          (s) => s.session?.id === parseInt(selectedSession)
        )
      );

  // Update inscription status
  const updateStatus = async (inscriptionId, newStatus) => {
    try {
      const inscription = inscriptions.find((i) => i.id === inscriptionId);
      const response = await fetch(`${API_URL}/inscriptions/${inscriptionId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", "X-API-KEY": API_KEY },
        body: JSON.stringify({
          ...inscription,
          status: newStatus,
          user: { id: inscription.user.id },
          session: inscription.session ? { id: inscription.session.id } : null,
          training: inscription.training
            ? { id: inscription.training.id }
            : null,
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
      const response = await fetch(
        `${API_URL}/inscriptions/${editingInscription.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json", "X-API-KEY": API_KEY },
          body: JSON.stringify({
            ...editingInscription,
            amount: noteValue,
            user: { id: editingInscription.user.id },
            session: editingInscription.session
              ? { id: editingInscription.session.id }
              : null,
            training: editingInscription.training
              ? { id: editingInscription.training.id }
              : null,
          }),
        }
      );

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
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>Mes élèves</h3>
      </div>

      {/* Training Filter */}
      <div className="mb-4">
        <label
          className="form-label"
          style={{ fontWeight: "500", marginBottom: "10px" }}
        >
          Filtrer par session :
        </label>
        <select
          className="form-select"
          value={selectedSession}
          onChange={(e) => setSelectedSession(e.target.value)}
          style={{
            borderRadius: "8px",
            border: "1px solid #cbd5e0",
            backgroundColor: "#e8f0f8",
            padding: "10px 15px",
            maxWidth: "400px",
          }}
        >
          <option value="all">Toutes les sessions</option>
          {availableSessions.map((session) => (
            <option key={session.id} value={session.id}>
              {session.title}
            </option>
          ))}
        </select>
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

      {displayedGroups.length > 0 ? (
        displayedGroups.map((group, groupIndex) => (
          <div key={groupIndex} className="mb-4">
            <div className="mb-3">
              <h5 className="mb-1">{group.title}</h5>
              <div
                className="d-flex gap-3 text-secondary"
                style={{ fontSize: "14px" }}
              >
                {group.date && (
                  <span>
                    <strong>Date:</strong> {group.date}
                  </span>
                )}
                {group.training && (
                  <span>
                    <strong>Formation:</strong> {group.training}
                  </span>
                )}
              </div>
            </div>
            <div className="container">
              <div className="row p-3 border rounded-top-3 bg-white">
                <div className="col-2">
                  <b>Nom</b>
                </div>
                <div className="col-3">
                  <b>Email</b>
                </div>
                <div className="col-2">
                  <b>Statut</b>
                </div>
                <div className="col-2">
                  <b>Dernière activité</b>
                </div>
                <div className="col-1">
                  <b>Note</b>
                </div>
                <div className="col-2">
                  <b>Actions</b>
                </div>
              </div>
              {group.students.map((inscription) => (
                <div key={inscription.id} className="row py-3 border bg-white">
                  <div className="col-2">
                    {inscription.user?.firstname} {inscription.user?.lastname}
                  </div>
                  <div className="col-3">{inscription.user?.email || "-"}</div>
                  <div className="col-2">
                    {getStatusBadge(inscription.id, inscription.status)}
                  </div>
                  <div className="col-2">
                    {formatDate(
                      inscription.date || inscription.inscriptionDate
                    )}
                  </div>
                  <div className="col-1">
                    {inscription.amount ? `${inscription.amount}/20` : "-"}
                  </div>
                  <div className="col-2">
                    <button
                      onClick={() => handleEditClick(inscription)}
                      className="btn btn-prof btn-sm"
                    >
                      Modifier
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <div className="bg-white border rounded p-5 text-center mt-4">
          <p className="mb-0">Aucun élève trouvé</p>
        </div>
      )}

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
              >
                Annuler
              </button>
              <button onClick={handleSaveNote} className="btn btn-prof">
                Enregistrer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyStudentsContent;
