import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../constants/apiConstants";
import ProfSidebarCollapsible from "../../components/ProfSidebarCollapsible";
import { useAuth } from "../../contexts/AuthContext";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function ProfDashboard() {
  const [courses, setCourses] = useState([]);
  const [inscriptions, setInscriptions] = useState([]);
  const navigate = useNavigate();
  const countupInscriptionsRef = useRef(null);
  const { userId } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      if (!userId) return;

      // Fetch sessions where the professor is the instructor
      const sessionsRes = await fetch(`${API_URL}/sessions`);
      const allSessions = await sessionsRes.json();
      const profSessions = allSessions.filter(
        (session) => session.instructor?.id === userId
      );
      const profSessionIds = profSessions.map((s) => s.id);

      // Get unique trainings from professor's sessions
      const trainingIds = [...new Set(profSessions
        .filter(s => s.training)
        .map(s => s.training.id))];

      const coursesRes = await fetch(`${API_URL}/trainings`);
      const allCourses = await coursesRes.json();
      const profCourses = allCourses.filter(
        (course) => trainingIds.includes(course.id)
      );
      setCourses(profCourses.slice(0, 3)); // Display first 3 courses

      // Fetch inscriptions for statistics (only for professor's sessions)
      const inscriptionsRes = await fetch(`${API_URL}/inscriptions`);
      const allInscriptions = await inscriptionsRes.json();
      const profInscriptions = allInscriptions.filter(
        (inscription) =>
          inscription.session && profSessionIds.includes(inscription.session.id)
      );
      setInscriptions(profInscriptions);

      // Initialize CountUp after data is loaded
      if (profInscriptions.length > 0) {
        initCountUp(profInscriptions.length);
      }
    };
    fetchData();
  }, [userId]);

  async function initCountUp(totalInscriptions) {
    const countUpModule = await import("countup.js");
    const countUpInscriptions = new countUpModule.CountUp(
      countupInscriptionsRef.current,
      totalInscriptions
    );
    if (!countUpInscriptions.error) {
      countUpInscriptions.start();
    } else {
      console.error(countUpInscriptions.error);
    }
  }

  // Calculate enrollment statistics by month (last 6 months)
  const getEnrollmentsByMonth = () => {
    const months = ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin"];
    const currentMonth = new Date().getMonth();
    const enrollmentData = months.map((month, index) => {
      const targetMonth = (currentMonth - 5 + index + 12) % 12;
      const count = inscriptions.filter((inscription) => {
        const inscriptionDate = new Date(inscription.inscriptionDate || inscription.date);
        return inscriptionDate.getMonth() === targetMonth;
      }).length;
      return count;
    });
    return { labels: months, data: enrollmentData };
  };

  const enrollmentStats = getEnrollmentsByMonth();

  // Données pour le graphique en ligne (évolution des inscriptions)
  const lineChartData = {
    labels: enrollmentStats.labels,
    datasets: [
      {
        label: "Inscriptions",
        data: enrollmentStats.data,
        borderColor: "#8B4513",
        backgroundColor: "rgba(139, 69, 19, 0.1)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  // Données pour le graphique en barres (progression des élèves)
  const barChartData = {
    labels: ["Sem. 1", "Sem. 2", "Sem. 3", "Sem. 4"],
    datasets: [
      {
        label: "Progression (%)",
        data: [85, 70, 65, 75],
        backgroundColor: [
          "rgba(139, 69, 19, 0.8)",
          "rgba(139, 69, 19, 0.6)",
          "rgba(139, 69, 19, 0.5)",
          "rgba(139, 69, 19, 0.4)",
        ],
        borderColor: "#8B4513",
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  return (
    <div style={{ backgroundColor: "#FFECC8", minHeight: "100vh" }}>
      <div className="container-fluid">
        <div className="row">
          {/* Sidebar */}
          <ProfSidebarCollapsible />

          {/* Main Content */}
          <div className="col p-5">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="d-flex align-items-center">
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
                  <button
                    onClick={() => navigate("/course-content")}
                    className="btn"
                    style={{
                      backgroundColor: "#FFA500",
                      color: "#1a1a1a",
                      border: "2px solid #1a1a1a",
                      borderRadius: "8px",
                      padding: "10px 20px",
                      fontWeight: "500",
                    }}
                  >
                    Créer un nouveau cours
                  </button>
                </div>
                <button
                  onClick={() => navigate("/sessions")}
                  className="btn"
                  style={{
                    backgroundColor: "#FFA500",
                    color: "#1a1a1a",
                    border: "2px solid #1a1a1a",
                    borderRadius: "8px",
                    padding: "10px 20px",
                    fontWeight: "500",
                  }}
                >
                  Voir le calendrier
                </button>
              </div>

              <div>
                <h2>Tableau de bord Professeur</h2>
                <p className="text-secondary">
                  Vue d'ensemble de vos cours et de vos performances
                </p>
              </div>

              {/* Mes cours Section */}
              <div className="mt-4">
                <h4 className="mb-3">Mes cours</h4>
                <div
                  className="bg-white rounded-3 p-4"
                  style={{
                    border: "2px solid #1a1a1a",
                  }}
                >
                  <div className="row g-4">
                    {courses.map((course) => (
                      <div key={course.id} className="col-md-4">
                        <div
                          className="h-100"
                          style={{
                            border: "1px solid #dee2e6",
                            borderRadius: "8px",
                            overflow: "hidden",
                          }}
                        >
                          {course.imgName && (
                            <img
                              src={`${API_URL}/files/download/${course.imgName}`}
                              className="w-100"
                              alt={course.title}
                              style={{ height: "180px", objectFit: "cover" }}
                            />
                          )}
                          <div className="p-3">
                            <h6 className="mb-2">{course.title}</h6>
                            <p
                              className="text-secondary mb-0"
                              style={{ fontSize: "14px" }}
                            >
                              {course.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Statistiques Section */}
              <div className="mt-4 pb-5">
                <h4 className="mb-3">Statistiques</h4>
                <div className="row g-4">
                  {/* Progression des élèves */}
                  <div className="col-md-6">
                    <div
                      className="bg-white rounded-3 p-4"
                      style={{
                        border: "2px solid #1a1a1a",
                        height: "100%",
                      }}
                    >
                      <h5 className="mb-3">Progression des élèves</h5>
                      <h2 className="mb-2">75%</h2>
                      <p className="text-secondary mb-4" style={{ fontSize: "14px" }}>
                        Cours: Introduction à la programmation
                      </p>
                      <div style={{ height: "250px" }}>
                        <Bar data={barChartData} options={chartOptions} />
                      </div>
                    </div>
                  </div>

                  {/* Évolution des inscriptions */}
                  <div className="col-md-6">
                    <div
                      className="bg-white rounded-3 p-4"
                      style={{
                        border: "2px solid #1a1a1a",
                        height: "100%",
                      }}
                    >
                      <h5 className="mb-3">Évolution des inscriptions</h5>
                      <h2 className="mb-2">
                        <span ref={countupInscriptionsRef}>0</span>
                      </h2>
                      <p className="text-secondary mb-4" style={{ fontSize: "14px" }}>
                        Derniers 6 mois
                      </p>
                      <div style={{ height: "250px" }}>
                        <Line data={lineChartData} options={chartOptions} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfDashboard;
