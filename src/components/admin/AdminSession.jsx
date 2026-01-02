import { useState, useEffect } from "react";
import SearchBar from "../SearchBar";
import CreateSession from "./Forms/CreateSession";
import EditSession from "./Forms/EditSession";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

function AdminSession() {
  const [data, setData] = useState([]);
  const [filteredSessions, setFilteredSessions] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editSessionId, setEditSessionId] = useState(null);

  document.title = "Admin - Sessions";

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${API_URL}/api/sessions`);
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
      const res = await fetch(`${API_URL}/api/sessions`);
      const data = await res.json();
      setData(data);
    };
    fetchData();
  };

  const handleCloseCreate = () => {
    setShowCreateForm(false);
    // Recharger les données après création
    const fetchData = async () => {
      const res = await fetch(`${API_URL}/api/sessions`);
      const data = await res.json();
      setData(data);
    };
    fetchData();
  };

  // Si on est en mode édition, afficher le formulaire d'édition
  if (editSessionId) {
    return <EditSession sessionId={editSessionId} onClose={handleCloseEdit} />;
  }

  // Si on est en mode création, afficher le formulaire de création
  if (showCreateForm) {
    return <CreateSession onClose={handleCloseCreate} />;
  }

  // Sinon, afficher la liste des sessions
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="d-flex justify-content-between col-12 mx-auto">
            <h3>Sessions</h3>
            <button className="btn btn-admin" onClick={handleAddSession}>
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
            <div className="col-5">
              <b>Titre</b>
            </div>
            <div className="col-5">
              <b>Formation</b>
            </div>
            <div className="col-2">
              <b>Actions</b>
            </div>
          </div>
          {data.map((session, index) => (
            <div className="row py-3 border bg-white" key={session.id || index}>
              <div className="col-5">{session.title}</div>
              <div className="col-5">{session.training?.title || "N/A"}</div>
              <div className="col-2">
                <button
                  className="btn btn-admin"
                  onClick={() => handleEditSession(session.id)}
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

export default AdminSession;
