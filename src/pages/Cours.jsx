import "../styles/Cours.css";
import SearchBar from "../components/SearchBar";
import { useEffect, useState } from "react";

function Cours() {
    const [data, setData] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch("http://localhost:8080/api/trainings");
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
                            Trouvez la formation idéale pour améliorer vos compétences et faire progresser votre carrière.
                        </p>
                    </div>
                </div>

                {/* Search Bar */}
                <div className="row mt-3">
                    <div className="col-10 mx-auto">
                        <SearchBar
                            placeholder="Rechercher un cours"
                            data={data.map(f => f.title)}
                            onResults={filteredTitles =>
                                setFilteredCourses(
                                    data.filter(f => filteredTitles.includes(f.title))
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
                            className={`col-10 mx-auto course-card ${filteredCourses.length === 0 || filteredCourses.includes(formation)
                                ? ""
                                : "hidden"
                                }`}
                        >
                            <div className="card mb-3">
                                <div className="row g-0">
                                    <div className="col-md-8">
                                        <div className="card-body">
                                            <h4 className="card-title">{formation.title}</h4>
                                            <p className="card-text text-secondary fs-5 mb-0">{formation.description}</p>
                                            <div className="row mb-3">
                                                <div className="col-6">
                                                    <p className="card-text text-secondary mt-1">Catégorie : {formation.category}</p>
                                                </div>
                                                <div className="col-6">
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
                                                        <span className="ms-1 text-secondary">{formation.duration}h</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <button className="btn btn-detail">Voir les détails</button>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <img src="..." className="img-fluid rounded-start" alt="..." />
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