import { useState, useEffect } from "react";
import SearchBar from "../SearchBar";
import CreatePlace from "./Forms/CreatePlace";
import EditPlace from "./Forms/EditPlace";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

function AdminPlaces() {
  const [data, setData] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editPlaceId, setEditPlaceId] = useState(null);

  document.title = "Admin - Lieux";

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${API_URL}/api/places`);
      const data = await res.json();
      setData(data);
    };
    fetchData();
  }, []);

  const handleAddPlace = () => {
    setShowCreateForm(true);
  };

  const handleEditPlace = (placeId) => {
    setEditPlaceId(placeId);
  };

  const handleCloseEdit = () => {
    setEditPlaceId(null);
    const fetchData = async () => {
      const res = await fetch(`${API_URL}/api/places`);
      const data = await res.json();
      setData(data);
    };
    fetchData();
  };

  const handleCloseCreate = () => {
    setShowCreateForm(false);
    const fetchData = async () => {
      const res = await fetch(`${API_URL}/api/places`);
      const data = await res.json();
      setData(data);
    };
    fetchData();
  };

  if (editPlaceId) {
    return <EditPlace placeId={editPlaceId} onClose={handleCloseEdit} />;
  }

  if (showCreateForm) {
    return <CreatePlace onClose={handleCloseCreate} />;
  }

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="d-flex justify-content-between col-12 mx-auto">
            <h3>Lieux</h3>
            <button className="btn btn-primary" onClick={handleAddPlace}>
              Ajouter
            </button>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-12 mx-auto">
            <SearchBar
              placeholder="Rechercher un lieu"
              data={data.map((p) => p.city)}
              onResults={(filteredCities) =>
                setFilteredPlaces(
                  data.filter((p) => filteredCities.includes(p.city))
                )
              }
            />
          </div>
        </div>
        <div className="container">
          <div className="row mt-3 p-3 border rounded-top-3 bg-white">
            <div className="col-3">
              <b>Ville</b>
            </div>
            <div className="col-4">
              <b>Adresse</b>
            </div>
            <div className="col-2">
              <b>Code postal</b>
            </div>
            <div className="col-1">
              <b>Capacité</b>
            </div>
            <div className="col-2">
              <b>Action</b>
            </div>
          </div>
          {(filteredPlaces.length > 0 ? filteredPlaces : data).map(
            (place, index) => (
              <div className="row py-3 border bg-white" key={place.id || index}>
                <div className="col-3">{place.city || "N/A"}</div>
                <div className="col-4">{place.address || "N/A"}</div>
                <div className="col-2">{place.zip || "N/A"}</div>
                <div className="col-1">{place.maxCapacity || 0}</div>
                <div className="col-2">
                  <button
                    className="btn btn-primary"
                    onClick={() => handleEditPlace(place.id)}
                  >
                    Modifier
                  </button>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminPlaces;
