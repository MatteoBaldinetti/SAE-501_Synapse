import { useState, useEffect } from "react";
import SearchBar from "../SearchBar";
import CreateUser from "./Forms/CreateUser";
import EditUser from "./Forms/EditUser";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

function AdminAccounts() {
  const [data, setData] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editUserId, setEditUserId] = useState(null);

  document.title = "Admin - Comptes";

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${API_URL}/api/users`);
      const data = await res.json();
      setData(data);
    };
    fetchData();
  }, []);

  const handleAddUser = () => {
    setShowCreateForm(true);
  };

  const handleEditUser = (userId) => {
    setEditUserId(userId);
  };

  const handleCloseEdit = () => {
    setEditUserId(null);
    // Recharger les données après modification
    const fetchData = async () => {
      const res = await fetch(`${API_URL}/api/users`);
      const data = await res.json();
      setData(data);
    };
    fetchData();
  };

  const handleCloseCreate = () => {
    setShowCreateForm(false);
    // Recharger les données après création
    const fetchData = async () => {
      const res = await fetch(`${API_URL}/api/users`);
      const data = await res.json();
      setData(data);
    };
    fetchData();
  };

  // Fonction pour mapper les permissions numériques vers des labels
  const getPermission = (permission) => {
    switch (permission) {
      case 0:
        return "0 - Membre";
      case 1:
        return "1 - Enseignant";
      case 2:
        return "2 - Administrateur";
      default:
        return "N/A";
    }
  };

  // Si on est en mode édition, afficher le formulaire d'édition
  if (editUserId) {
    return <EditUser userId={editUserId} onClose={handleCloseEdit} />;
  }

  // Si on est en mode création, afficher le formulaire de création
  if (showCreateForm) {
    return <CreateUser onClose={handleCloseCreate} />;
  }

  // Sinon, afficher la liste des utilisateurs
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="d-flex justify-content-between col-12 mx-auto">
            <h3>Comptes</h3>
            <button className="btn btn-primary" onClick={handleAddUser}>
              Ajouter
            </button>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-12 mx-auto">
            <SearchBar
              placeholder="Rechercher un utilisateur"
              data={data.map((u) => `${u.firstname} ${u.lastname}`)}
              onResults={(filteredNames) =>
                setFilteredUsers(
                  data.filter((u) =>
                    filteredNames.includes(`${u.firstname} ${u.lastname}`)
                  )
                )
              }
            />
          </div>
        </div>
        <div className="container">
          <div className="row mt-3 p-3 border rounded-top-3 bg-white">
            <div className="col-4">
              <b>Identité</b>
            </div>
            <div className="col-4">
              <b>Mail</b>
            </div>
            <div className="col-2">
              <b>Permissions</b>
            </div>
            <div className="col-2">
              <b>Actions</b>
            </div>
          </div>
          {data.map((users, index) => (
            <div className="row py-3 border bg-white" key={users.id || index}>
              <div className="col-4">
                {users.firstname + " " + users.lastname}
              </div>
              <div className="col-4">{users.email || "N/A"}</div>
              <div className="col-2">{getPermission(users.type)}</div>
              <div className="col-2">
                <button
                  className="btn btn-primary"
                  onClick={() => handleEditUser(users.id)}
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

export default AdminAccounts;
