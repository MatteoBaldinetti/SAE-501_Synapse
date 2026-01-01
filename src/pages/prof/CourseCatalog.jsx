import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { API_URL } from "../../constants/apiConstants";

function CourseCatalog() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${API_URL}/trainings`);
      const data = await res.json();
      setData(data);
    };
    fetchData();
  }, []);

  const filteredCourses = data.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || course.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div style={{ backgroundColor: "#FFECC8", minHeight: "100vh" }}>
      <div className="container">
        <div className="row">
          <div className="col-10 mx-auto">
            <h2 className="mt-5">Découvrez nos cours</h2>
            <p className="text-secondary">
              Trouvez la formation idéale pour améliorer vos compétences et
              faire progresser votre carrière.
            </p>
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-10 mx-auto">
            <div className="position-relative">
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
                placeholder="Rechercher des cours"
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

            <div className="mt-3 d-flex gap-3">
              <select
                className="form-select"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                style={{
                  borderRadius: "20px",
                  border: "1px solid #1a1a1a",
                  backgroundColor: "transparent",
                  maxWidth: "150px",
                }}
              >
                <option value="all">Catégorie</option>
                <option value="Informatique">Informatique</option>
                <option value="Design">Design</option>
                <option value="Management">Management</option>
              </select>

              <select
                className="form-select"
                style={{
                  borderRadius: "20px",
                  border: "1px solid #1a1a1a",
                  backgroundColor: "transparent",
                  maxWidth: "150px",
                }}
              >
                <option value="all">Prix</option>
              </select>

              <select
                className="form-select"
                style={{
                  borderRadius: "20px",
                  border: "1px solid #1a1a1a",
                  backgroundColor: "transparent",
                  maxWidth: "150px",
                }}
              >
                <option value="all">Date</option>
              </select>
            </div>
          </div>
        </div>

        <div className="row mt-4 pb-5">
          {filteredCourses.map((formation, index) => (
            <div key={formation.id || index} className="col-10 mx-auto mb-3">
              <div
                className="bg-white rounded-3 overflow-hidden"
                style={{
                  border: "2px solid #1a1a1a",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 12px rgba(0, 0, 0, 0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div className="row g-0">
                  <div className="col-md-8">
                    <div className="p-4">
                      <h4 className="mb-3">{formation.title}</h4>
                      <p className="text-secondary mb-3">
                        {formation.description}
                      </p>
                      <Link
                        className="btn"
                        to={`/cours-detail/${formation.id}`}
                        style={{
                          backgroundColor: "transparent",
                          border: "1px solid #1a1a1a",
                          color: "#1a1a1a",
                          borderRadius: "8px",
                          padding: "10px 20px",
                        }}
                      >
                        Voir les détails + 3D View ROOM
                      </Link>
                    </div>
                  </div>
                  <div className="col-md-4 p-3 d-flex justify-content-center align-items-center">
                    {formation.imgName && (
                      <img
                        src={`${API_URL}/files/download/${formation.imgName}`}
                        className="img-fluid rounded"
                        alt={formation.title}
                        style={{ maxHeight: "180px", objectFit: "cover" }}
                      />
                    )}
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

export default CourseCatalog;
