import { useState, useEffect } from "react";
import SearchBar from "../SearchBar";
import CreateFormation from "./Forms/CreateFormation";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

function AdminAccounts() {
  const [data, setData] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);

  document.title = "Admin - Comptes";

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${API_URL}/api/users`);
      const data = await res.json();
      setData(data);
    };
    fetchData();
  }, []);

  const handleAddFormation = () => {
    <CreateFormation />;
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="d-flex justify-content-between col-12 mx-auto">
            <h3>Comptes</h3>
            <button className="btn btn-primary" onClick={handleAddFormation}>
              Ajouter
            </button>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-12 mx-auto">
            <SearchBar
              placeholder="Rechercher une session"
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
                {users.firstName + " " + users.lastName}
              </div>
              <div className="col-4">{users.email || "N/A"}</div>
              <div className="col-2">{users.permissions || "N/A"}</div>
              <div className="col-2">
                <button className="btn btn-primary">Modifier</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminAccounts;
