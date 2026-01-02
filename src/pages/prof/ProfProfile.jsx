import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../../constants/apiConstants";

function ProfProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [professor, setProfessor] = useState(null);
  const [courses, setCourses] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch professor data
        const profRes = await fetch(`${API_URL}/users/${id}`);
        const profData = await profRes.json();
        setProfessor(profData);

        // Fetch courses created by this professor
        const coursesRes = await fetch(`${API_URL}/trainings`);
        const coursesData = await coursesRes.json();
        // Filter courses by instructor if instructor field exists
        const profCourses = coursesData.filter(course =>
          course.instructor?.id === parseInt(id)
        );
        setCourses(profCourses.length > 0 ? profCourses : coursesData.slice(0, 3));

        // Mock reviews data
        setReviews([
          {
            id: 1,
            name: "Sophie Martin",
            date: "2023-07-20",
            rating: 5,
            comment: "Excellent professeur, très pédagogue et à l'écoute. J'ai beaucoup appris grâce à lui.",
          },
          {
            id: 2,
            name: "Jean Dupont",
            date: "2023-08-15",
            rating: 4,
            comment: "Cours très intéressant et bien structuré. Quelques points pourraient être approfondis.",
          },
        ]);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const getRatingDistribution = () => {
    return [
      { stars: 5, percentage: 40 },
      { stars: 4, percentage: 30 },
      { stars: 3, percentage: 15 },
      { stars: 2, percentage: 10 },
      { stars: 1, percentage: 5 },
    ];
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <span
        key={index}
        style={{
          color: index < rating ? "#8B4513" : "#D3D3D3",
          fontSize: "20px",
        }}
      >
        ★
      </span>
    ));
  };

  // Modifier le profil
  const handleEditProfile = () => {
    navigate(`/edit-profile/${id}`);
  };

  // Contacter l'admin
  const handleContactAdmin = () => {
    const subject = `Contact depuis le profil de ${professor?.firstname} ${professor?.lastname}`;
    const body = `Bonjour,\n\nJe vous contacte au sujet du professeur ${professor?.firstname} ${professor?.lastname} (ID: ${id}).\n\n`;
    window.location.href = `mailto:admin@txlforma.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  // Suspendre le compte
  const handleSuspendAccount = async () => {
    if (!window.confirm(`Êtes-vous sûr de vouloir suspendre le compte de ${professor?.firstname} ${professor?.lastname} ? Cette action est irréversible.`)) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/users/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la suspension du compte");
      }

      alert("Le compte a été suspendu avec succès");
      navigate("/prof-dashboard"); // Rediriger vers le dashboard
    } catch (error) {
      console.error("Error suspending account:", error);
      alert("Erreur lors de la suspension du compte");
    }
  };

  // Voir les détails d'un cours
  const handleViewCourse = (courseId) => {
    navigate(`/cours-detail/${courseId}`);
  };

  // Modifier un cours
  const handleEditCourse = (courseId) => {
    navigate(`/course-content?id=${courseId}`);
  };

  if (loading) {
    return (
      <div style={{ backgroundColor: "#FFECC8", minHeight: "100vh", padding: "50px" }}>
        <div className="text-center">Chargement...</div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "#FFECC8", minHeight: "100vh" }}>
      <div className="container py-5">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="btn mb-4"
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

        <h2 className="mb-4">Profil de Professeur</h2>

        {/* Profile Header */}
        <div className="d-flex align-items-center mb-5">
          <div
            style={{
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              backgroundColor: "#D3D3D3",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: "20px",
              overflow: "hidden",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="60"
              height="60"
              fill="#666"
              viewBox="0 0 16 16"
            >
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
              <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
            </svg>
          </div>
          <div>
            <h4 className="mb-1">
              {professor?.firstname} {professor?.lastname}
            </h4>
            <p className="text-secondary mb-0">{professor?.email}</p>
          </div>
        </div>

        {/* Informations Personnelles */}
        <div className="mb-5">
          <h4 className="mb-3">Informations Personnelles</h4>
          <div
            className="bg-white rounded-3 p-4"
            style={{
              border: "2px solid #1a1a1a",
            }}
          >
            <div className="row">
              <div className="col-md-6 mb-3">
                <strong>Nom</strong>
                <p className="mb-0">{professor?.lastname || "Dubois"}</p>
              </div>
              <div className="col-md-6 mb-3">
                <strong>Prénom</strong>
                <p className="mb-0">{professor?.firstname || "Lucas"}</p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <strong>Email</strong>
                <p className="mb-0">{professor?.email || "lucas.dubois@email.com"}</p>
              </div>
              <div className="col-md-6 mb-3">
                <strong>Téléphone</strong>
                <p className="mb-0">+33 6 12 34 56 78</p>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <strong>Adresse</strong>
                <p className="mb-0">123 Rue de la Liberté, 75001 Paris</p>
              </div>
            </div>
          </div>
        </div>

        {/* Cours Créés */}
        <div className="mb-5">
          <h4 className="mb-3">Cours Créés</h4>
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
                    Titre
                  </th>
                  <th style={{ padding: "15px", borderBottom: "2px solid #dee2e6" }}>
                    Statut
                  </th>
                  <th style={{ padding: "15px", borderBottom: "2px solid #dee2e6" }}>
                    Date de Création
                  </th>
                  <th style={{ padding: "15px", borderBottom: "2px solid #dee2e6" }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {courses.length > 0 ? (
                  courses.map((course, index) => (
                    <tr key={course.id || index}>
                      <td style={{ padding: "15px", verticalAlign: "middle" }}>
                        {course.title || "Sans titre"}
                      </td>
                      <td style={{ padding: "15px", verticalAlign: "middle" }}>
                        <span
                          className="badge"
                          style={{
                            backgroundColor: course.status === "PUBLISHED" || index % 2 === 0 ? "#d4edda" : "#fff3cd",
                            color: course.status === "PUBLISHED" || index % 2 === 0 ? "#155724" : "#856404",
                            border: course.status === "PUBLISHED" || index % 2 === 0 ? "1px solid #c3e6cb" : "1px solid #ffeeba",
                            padding: "5px 15px",
                            borderRadius: "20px",
                          }}
                        >
                          {course.status === "PUBLISHED" || index % 2 === 0 ? "Publié" : "Brouillon"}
                        </span>
                      </td>
                      <td style={{ padding: "15px", verticalAlign: "middle" }}>
                        {course.createdDate
                          ? new Date(course.createdDate).toLocaleDateString("fr-FR")
                          : new Date().toLocaleDateString("fr-FR")}
                      </td>
                      <td style={{ padding: "15px", verticalAlign: "middle" }}>
                        {course.status === "PUBLISHED" || index % 2 === 0 ? (
                          <span
                            onClick={() => handleViewCourse(course.id)}
                            style={{ color: "#ff8c00", cursor: "pointer" }}
                          >
                            Voir
                          </span>
                        ) : (
                          <span
                            onClick={() => handleEditCourse(course.id)}
                            style={{ color: "#ff8c00", cursor: "pointer" }}
                          >
                            Modifier
                          </span>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" style={{ padding: "15px", textAlign: "center" }}>
                      Aucun cours créé
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Évaluations */}
        <div className="mb-5">
          <h4 className="mb-3">Évaluations</h4>

          {/* Rating Summary */}
          <div className="row mb-4">
            <div className="col-md-4">
              <div
                className="bg-white rounded-3 p-4 text-center"
                style={{ border: "2px solid #1a1a1a" }}
              >
                <h1 className="mb-2" style={{ fontSize: "60px", fontWeight: "bold" }}>
                  4.5
                </h1>
                <div className="mb-2">{renderStars(4)}</div>
                <p className="mb-0 text-secondary">150 reviews</p>
              </div>
            </div>
            <div className="col-md-8">
              <div
                className="bg-white rounded-3 p-4"
                style={{ border: "2px solid #1a1a1a" }}
              >
                {getRatingDistribution().map((item) => (
                  <div key={item.stars} className="d-flex align-items-center mb-2">
                    <span style={{ minWidth: "20px" }}>{item.stars}</span>
                    <div
                      className="mx-2"
                      style={{
                        flex: 1,
                        height: "20px",
                        backgroundColor: "#E0E0E0",
                        borderRadius: "10px",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          width: `${item.percentage}%`,
                          height: "100%",
                          backgroundColor: "#8B4513",
                          transition: "width 0.3s",
                        }}
                      />
                    </div>
                    <span style={{ minWidth: "40px", textAlign: "right" }}>
                      {item.percentage}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Reviews */}
          <div className="mt-4">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="bg-white rounded-3 p-4 mb-3"
                style={{ border: "2px solid #1a1a1a" }}
              >
                <div className="d-flex align-items-center mb-2">
                  <div
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                      backgroundColor: "#D3D3D3",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginRight: "15px",
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="25"
                      fill="#666"
                      viewBox="0 0 16 16"
                    >
                      <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                      <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                    </svg>
                  </div>
                  <div>
                    <h6 className="mb-0">{review.name}</h6>
                    <small className="text-secondary">{review.date}</small>
                  </div>
                </div>
                <div className="mb-2">{renderStars(review.rating)}</div>
                <p className="mb-0">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="mb-5">
          <h4 className="mb-3">Actions</h4>
          <div className="d-flex gap-3">
            <button
              onClick={handleEditProfile}
              className="btn"
              style={{
                backgroundColor: "#28a745",
                color: "white",
                border: "none",
                borderRadius: "8px",
                padding: "10px 30px",
                fontWeight: "500",
              }}
            >
              Modifier le profil
            </button>
            <button
              onClick={handleContactAdmin}
              className="btn"
              style={{
                backgroundColor: "#F5F5F5",
                color: "#1a1a1a",
                border: "2px solid #D3D3D3",
                borderRadius: "8px",
                padding: "10px 30px",
                fontWeight: "500",
              }}
            >
              Contacter l'admin
            </button>
            <button
              onClick={handleSuspendAccount}
              className="btn"
              style={{
                backgroundColor: "#dc3545",
                color: "white",
                border: "none",
                borderRadius: "8px",
                padding: "10px 30px",
                fontWeight: "500",
              }}
            >
              Suspendre le Compte
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfProfile;
