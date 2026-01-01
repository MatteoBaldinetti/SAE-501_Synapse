import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../constants/apiConstants";

function MyStudents() {
  const [inscriptions, setInscriptions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${API_URL}/inscriptions`);
      const data = await res.json();
      setInscriptions(data);
    };
    fetchData();
  }, []);

  const filteredStudents = inscriptions.filter((inscription) => {
    if (!inscription.user) return false;
    const fullName = `${inscription.user.firstname} ${inscription.user.lastname}`.toLowerCase();
    const email = inscription.user.email?.toLowerCase() || "";
    return (
      fullName.includes(searchTerm.toLowerCase()) ||
      email.includes(searchTerm.toLowerCase())
    );
  });

  const getStatusBadge = (status) => {
    if (status === "PRESENT" || status === "Présent") {
      return (
        <span
          className="badge"
          style={{
            backgroundColor: "#d4edda",
            color: "#155724",
            border: "1px solid #c3e6cb",
            padding: "5px 12px",
            borderRadius: "20px",
          }}
        >
          Présent
        </span>
      );
    } else if (status === "ABSENT" || status === "Absent") {
      return (
        <span
          className="badge"
          style={{
            backgroundColor: "#f8d7da",
            color: "#721c24",
            border: "1px solid #f5c6cb",
            padding: "5px 12px",
            borderRadius: "20px",
          }}
        >
          Absent
        </span>
      );
    } else {
      return (
        <button
          className="btn btn-sm"
          style={{
            backgroundColor: "transparent",
            border: "1px solid #1a1a1a",
            color: "#1a1a1a",
            borderRadius: "20px",
            padding: "5px 12px",
          }}
        >
          Ajouter
        </button>
      );
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR");
  };

  return (
    <div style={{ backgroundColor: "#FFECC8", minHeight: "100vh" }}>
      <div className="container">
        <div className="row">
          <div className="col-10 mx-auto">
            <div className="d-flex align-items-center mt-5 mb-4">
              <button
                onClick={() => navigate(-1)}
                className="btn me-3"
                style={{
                  backgroundColor: "#ff8c00",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  padding: "10px 15px",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                  />
                </svg>
              </button>
              <h2 className="mb-0">Mes élèves</h2>
            </div>
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
                placeholder="Rechercher des élèves"
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
          </div>
        </div>

        <div className="row mt-4 pb-5">
          <div className="col-10 mx-auto">
            <div
              className="bg-white rounded-3"
              style={{
                border: "2px solid #1a1a1a",
                overflow: "hidden",
              }}
            >
              <table className="table table-hover mb-0">
                <thead style={{ backgroundColor: "#f8f9fa" }}>
                  <tr>
                    <th style={{ padding: "15px", borderBottom: "2px solid #dee2e6" }}>
                      Nom
                    </th>
                    <th style={{ padding: "15px", borderBottom: "2px solid #dee2e6" }}>
                      Email
                    </th>
                    <th style={{ padding: "15px", borderBottom: "2px solid #dee2e6" }}>
                      Hébergement
                    </th>
                    <th style={{ padding: "15px", borderBottom: "2px solid #dee2e6" }}>
                      Dernière activité
                    </th>
                    <th style={{ padding: "15px", borderBottom: "2px solid #dee2e6" }}>
                      Note
                    </th>
                    <th style={{ padding: "15px", borderBottom: "2px solid #dee2e6" }}>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((inscription) => (
                    <tr key={inscription.id}>
                      <td style={{ padding: "15px", verticalAlign: "middle" }}>
                        {inscription.user?.firstname} {inscription.user?.lastname}
                      </td>
                      <td style={{ padding: "15px", verticalAlign: "middle" }}>
                        {inscription.user?.email || "-"}
                      </td>
                      <td style={{ padding: "15px", verticalAlign: "middle" }}>
                        {getStatusBadge(inscription.status)}
                      </td>
                      <td style={{ padding: "15px", verticalAlign: "middle" }}>
                        {formatDate(inscription.date || inscription.inscriptionDate)}
                      </td>
                      <td style={{ padding: "15px", verticalAlign: "middle" }}>
                        {inscription.amount ? `${inscription.amount}/20` : "-"}
                      </td>
                      <td style={{ padding: "15px", verticalAlign: "middle" }}>
                        <button
                          className="btn btn-sm"
                          style={{
                            backgroundColor: "transparent",
                            border: "1px solid #1a1a1a",
                            color: "#1a1a1a",
                            borderRadius: "8px",
                            padding: "5px 15px",
                          }}
                        >
                          Modifier
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyStudents;
