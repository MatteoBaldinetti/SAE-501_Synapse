import { Link } from "react-router-dom";

import "../../styles/Cours.css";
import SearchBar from "../../components/SearchBar";
import { useEffect, useState } from "react";
import { API_URL } from "../../constants/apiConstants";

function Cours() {
  const [data, setData] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${API_URL}/trainings`);
      const data = await res.json();
      setData(data);
    };
    fetchData();
  }, []);

  return (
    <div className="blue-background course-container">
      <div className="container">
        {/* Header */}
        <div className="row">
          <div className="col-10 mx-auto">
            <h2 className="mt-5">Découvrez nos cours</h2>
            <p className="text-secondary">
              Trouvez la formation idéale pour améliorer vos compétences et
              faire progresser votre carrière.
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="row mt-3">
          <div className="col-10 mx-auto">
            <SearchBar
              placeholder="Rechercher un cours"
              data={data.map((f) => f.title)}
              onResults={(filteredTitles) =>
                setFilteredCourses(
                  data.filter((f) => filteredTitles.includes(f.title))
                )
              }
            />
          </div>
        </div>

        {/* Courses */}
        <div className="row mt-3 pb-5">
          {data.map((formation, index) => (
            <div
              key={formation.ids || index}
              className={`col-10 mx-auto course-card ${
                filteredCourses.length === 0 ||
                filteredCourses.includes(formation)
                  ? ""
                  : "hidden"
              }`}
            >
              <div className="card mb-3">
                <div className="row g-0">
                  <div className="col-md-8">
                    <div className="card-body">
                      <h4 className="card-title">{formation.title}</h4>
                      <p className="card-text text-secondary fs-5 mb-0">
                        {formation.description}
                      </p>
                      <div className="row mb-3">
                        <div className="col-4">
                          <div className="icon-text mt-2">
                            <svg
                              width={20}
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 512 512"
                            >
                              <path
                                fill="#6c757d"
                                d="M464 256a208 208 0 1 1 -416 0 208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0 256 256 0 1 0 -512 0zM232 120l0 136c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2 280 120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"
                              />
                            </svg>
                            <span className="ms-1 text-secondary">
                              {formation.duration}h
                            </span>
                          </div>
                        </div>
                        <div className="col-4">
                          <div className="icon-text mt-2">
                            <svg
                              width={20}
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 512 512"
                            >
                              <path
                                fill="#6c757d"
                                d="M112 112c0 35.3-28.7 64-64 64l0 160c35.3 0 64 28.7 64 64l288 0c0-35.3 28.7-64 64-64l0-160c-35.3 0-64-28.7-64-64l-288 0zM0 128C0 92.7 28.7 64 64 64l384 0c35.3 0 64 28.7 64 64l0 256c0 35.3-28.7 64-64 64L64 448c-35.3 0-64-28.7-64-64L0 128zm256 16a112 112 0 1 1 0 224 112 112 0 1 1 0-224zm-16 44c-11 0-20 9-20 20 0 9.7 6.9 17.7 16 19.6l0 48.4-4 0c-11 0-20 9-20 20s9 20 20 20l48 0c11 0 20-9 20-20s-9-20-20-20l-4 0 0-68c0-11-9-20-20-20l-16 0z"
                              />
                            </svg>
                            <span className="ms-1 text-secondary">
                              {formation.price}€
                            </span>
                          </div>
                        </div>
                      </div>
                      <Link
                        className="btn btn-detail"
                        to={`/cours-detail/${formation.id}`}
                      >
                        Voir les détails
                      </Link>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <img
                      src="..."
                      className="img-fluid rounded-start"
                      alt="..."
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Cours;
