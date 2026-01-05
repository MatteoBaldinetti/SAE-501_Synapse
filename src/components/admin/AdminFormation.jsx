/**
 * AdminFormation.jsx - Gestion des formations (admin)
 * 
 * Interface de gestion des formations permettant de :
 * - Lister toutes les formations
 * - Créer une nouvelle formation (via CreateFormation)
 * - Modifier une formation existante (via EditFormation)
 * - Supprimer une formation
 * - Rechercher et filtrer les formations
 * 
 * Utilisé par : AdminView.jsx
 * Dépendances : CreateFormation, EditFormation, API_URL
 */

import { useState, useEffect } from "react";
import SearchBar from "../SearchBar";
import CreateFormation from "./Forms/CreateFormation";
import EditFormation from "./Forms/EditFormation";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

function AdminFormation() {
  const [data, setData] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editFormationId, setEditFormationId] = useState(null);

  document.title = "Admin - Formation";

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${API_URL}/api/trainings`);
      const data = await res.json();
      setData(data);
    };
    fetchData();
  }, []);

  const handleAddFormation = () => {
    setShowCreateForm(true);
  };

  const handleEditFormation = (formationId) => {
    setEditFormationId(formationId);
  };

  const handleCloseEdit = () => {
    setEditFormationId(null);
    // Recharger les données après modification
    const fetchData = async () => {
      const res = await fetch(`${API_URL}/api/trainings`);
      const data = await res.json();
      setData(data);
    };
    fetchData();
  };

  const handleCloseCreate = () => {
    setShowCreateForm(false);
    // Recharger les données après création
    const fetchData = async () => {
      const res = await fetch(`${API_URL}/api/trainings`);
      const data = await res.json();
      setData(data);
    };
    fetchData();
  };

  // Si on est en mode édition, afficher le formulaire d'édition
  if (editFormationId) {
    return (
      <EditFormation formationId={editFormationId} onClose={handleCloseEdit} />
    );
  }

  // Si on est en mode création, afficher le formulaire de création
  if (showCreateForm) {
    return <CreateFormation onClose={handleCloseCreate} />;
  }

  // Sinon, afficher la liste des formations
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="d-flex justify-content-between col-12 mx-auto">
            <h3>Formation</h3>
            <button className="btn btn-admin" onClick={handleAddFormation}>
              Ajouter
            </button>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-12 mx-auto">
            <SearchBar
              placeholder="Rechercher une formation"
              data={data.map((f) => f.title)}
              onResults={(filteredTitles) =>
                setFilteredCourses(
                  data.filter((f) => filteredTitles.includes(f.title))
                )
              }
            />
          </div>
        </div>
        <div className="container">
          <div className="row mt-3 p-3 border rounded-top-3 bg-white">
            <div className="col-4">
              <b>Titre</b>
            </div>
            <div className="col-6">
              <b>Description</b>
            </div>
            <div className="col-2">
              <b>Actions</b>
            </div>
          </div>
          {data.map((formation, index) => (
            <div
              className="row py-3 border bg-white"
              key={formation.id || index}
            >
              <div className="col-4">{formation.title}</div>
              <div className="col-6">{formation.description}</div>
              <div className="col-2">
                <button
                  className="btn btn-admin"
                  onClick={() => handleEditFormation(formation.id)}
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

export default AdminFormation;
