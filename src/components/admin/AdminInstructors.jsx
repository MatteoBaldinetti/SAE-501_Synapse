import { useState, useEffect } from "react";
import SearchBar from "../SearchBar";
import CreateInstructor from "./Forms/CreateInstructor";
import EditInstructor from "./Forms/EditInstructor";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

function AdminInstructors() {
  const [data, setData] = useState([]);
  const [filteredSessions, setFilteredSessions] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editSessionId, setEditSessionId] = useState(null);

  document.title = "Admin - Instructors";

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${API_URL}/api/instructors`);
      const data = await res.json();
      setData(data);
    };
    fetchData();
  }, []);

  const handleAddSession = () => {
    setShowCreateForm(true);
  };

  const handleEditSession = (sessionId) => {
    setEditSessionId(sessionId);
  };

  const handleCloseEdit = () => {
    setEditSessionId(null);
    // Recharger les données après modification
    const fetchData = async () => {
      const res = await fetch(`${API_URL}/api/instructors`);
      const data = await res.json();
      setData(data);
    };
    fetchData();
  };

  const handleCloseCreate = () => {
    setShowCreateForm(false);
    // Recharger les données après création
    const fetchData = async () => {
      const res = await fetch(`${API_URL}/api/instructors`);
      const data = await res.json();
      setData(data);
    };
    fetchData();
  };

  // Si on est en mode édition, afficher le formulaire d'édition
  if (editSessionId) {
    return (
      <EditInstructor instructorId={editSessionId} onClose={handleCloseEdit} />
    );
  }

  // Si on est en mode création, afficher le formulaire de création
  if (showCreateForm) {
    return <CreateInstructor onClose={handleCloseCreate} />;
  }

  // Sinon, afficher la liste des sessions
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="d-flex justify-content-between col-12 mx-auto">
            <h3>Enseignants</h3>
            <button className="btn btn-primary" onClick={handleAddSession}>
              Ajouter
            </button>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-12 mx-auto">
            <SearchBar
              placeholder="Rechercher une session"
              data={data.map((s) => s.title)}
              onResults={(filteredTitles) =>
                setFilteredSessions(
                  data.filter((s) => filteredTitles.includes(s.title))
                )
              }
            />
          </div>
        </div>
        <div className="container">
          <div className="row mt-3 p-3 border rounded-top-3 bg-white">
            <div className="col-3">
              <b>Identité</b>
            </div>
            <div className="col-3">
              <b>Contrat</b>
            </div>
            <div className="col-4">
              <b>Spécialité</b>
            </div>
            <div className="col-2">
              <b>Action</b>
            </div>
          </div>
          {data.map((instructor, index) => (
            <div
              className="row py-3 border bg-white"
              key={instructor.id || index}
            >
              <div className="col-3">
                {instructor.firstName + " " + instructor.lastName}
              </div>
              <div className="col-3">{instructor.contractType || "N/A"}</div>
              <div className="col-4">{instructor.specialty || "N/A"}</div>
              <div className="col-2">
                <button
                  className="btn btn-primary"
                  onClick={() => handleEditSession(instructor.id)}
                >
                  Modifier
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminInstructors;
