import { useState, useEffect } from "react";
import SearchBar from "../SearchBar";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

function AdminFormation() {
  const [data, setData] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);

  document.title = "Admin - Formation";

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${API_URL}/api/trainings`);
      const data = await res.json();
      setData(data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="d-flex justify-content-between col-12 mx-auto">
            <h3>Formation</h3>
            <button className="btn btn-primary">Ajouter</button>
          </div>
        </div>
        <div className="row">
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
          <div className="row mt-3 p-3 border border-dark rounded-top-3 bg-white">
            <div className="col-4">
              <b>Titre</b>
            </div>
            <div className="col-6">
              <b>Description</b>
            </div>
            <div className="col-2">
              <b>Inscrits</b>
            </div>
          </div>
          {data.map((formation, index) => (
            <div
              className="row py-3 border bg-white"
              key={formation.id || index}
            >
              <div className="col-4">{formation.title}</div>
              <div className="col-6">{formation.description}</div>
              <div className="col-2">{formation.inscrits}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminFormation;
