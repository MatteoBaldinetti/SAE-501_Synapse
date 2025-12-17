import { useAuth } from "../../contexts/AuthContext";
import { useEffect, useRef } from "react";
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
  ArcElement,
} from "chart.js";
import { Line, Bar, Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);
function AdminDashboard() {
  const { userId, userEmail, userFirstname, userLastname, userType } =
    useAuth();

  const countupUsersRef = useRef(null);
  const countupSessionsRef = useRef(null);
  const countupFormationsRef = useRef(null);
  const countupRevenuesRef = useRef(null);

  let nbrUsers = 4384;
  let nbrFormations = 127;
  let nbrSessions = 892;
  let revenues = 45678;

  // Données pour le graphique en ligne (évolution des inscriptions)
  const lineChartData = {
    labels: [
      "Jan",
      "Fév",
      "Mar",
      "Avr",
      "Mai",
      "Juin",
      "Juil",
      "Août",
      "Sep",
      "Oct",
      "Nov",
      "Déc",
    ],
    datasets: [
      {
        label: "Inscriptions",
        data: [320, 450, 380, 520, 670, 720, 850, 920, 1050, 1180, 1320, 1450],
        borderColor: "#2EE88A",
        backgroundColor: "rgba(46, 232, 138, 0.1)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  // Données pour le graphique en barres (formations par catégorie)
  const barChartData = {
    labels: [
      "Développement",
      "Design",
      "Marketing",
      "Business",
      "Data Science",
    ],
    datasets: [
      {
        label: "Nombre de formations",
        data: [35, 22, 18, 28, 24],
        backgroundColor: [
          "rgba(46, 232, 138, 0.8)",
          "rgba(46, 232, 138, 0.6)",
          "rgba(46, 232, 138, 0.5)",
          "rgba(46, 232, 138, 0.4)",
          "rgba(46, 232, 138, 0.3)",
        ],
        borderColor: "#2EE88A",
        borderWidth: 2,
      },
    ],
  };

  // Données pour le graphique en donut (répartition des revenus)
  const doughnutChartData = {
    labels: [
      "Développement",
      "Design",
      "Marketing",
      "Business",
      "Data Science",
    ],
    datasets: [
      {
        label: "Revenus (€)",
        data: [15000, 8500, 7200, 9800, 5178],
        backgroundColor: [
          "#2EE88A",
          "#26D47A",
          "#1FC06A",
          "#18AC5A",
          "#11984A",
        ],
        borderWidth: 2,
        borderColor: "#fff",
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

  useEffect(() => {
    initCountUp();
  }, []);

  async function initCountUp() {
    const countUpModule = await import("countup.js");

    // Animation pour le nombre d'utilisateurs
    const countUpUsers = new countUpModule.CountUp(
      countupUsersRef.current,
      nbrUsers
    );
    if (!countUpUsers.error) {
      countUpUsers.start();
    } else {
      console.error(countUpUsers.error);
    }

    // Animation pour le nombre de sessions
    const countUpSessions = new countUpModule.CountUp(
      countupSessionsRef.current,
      nbrSessions
    );
    if (!countUpSessions.error) {
      countUpSessions.start();
    } else {
      console.error(countUpSessions.error);
    }

    // Animation pour le nombre de formations
    const countUpFormations = new countUpModule.CountUp(
      countupFormationsRef.current,
      nbrFormations
    );
    if (!countUpFormations.error) {
      countUpFormations.start();
    } else {
      console.error(countUpFormations.error);
    }

    // Animation pour les revenues
    const countUpRevenues = new countUpModule.CountUp(
      countupRevenuesRef.current,
      revenues
    );
    if (!countUpRevenues.error) {
      countUpRevenues.start();
    } else {
      console.error(countUpRevenues.error);
    }
  }

  return (
    <div>
      <h4>
        Bienvenue, {userFirstname} {userLastname}
      </h4>
      <div className="container px-3">
        <div className="row g-3">
          <div className="col-lg-3 col-md-3 col-sm-6 col-6 mb-3">
            <div className="bg-white p-4 rounded-3 h-100">
              <h6>Nombre d'utilisateurs</h6>
              <h1 className="text-admin">
                <span ref={countupUsersRef}></span>
              </h1>
            </div>
          </div>
          <div className="col-lg-3 col-md-3 col-sm-6 col-6 mb-3">
            <div className="bg-white p-4 rounded-3 h-100">
              <h6>Sessions terminées</h6>
              <h1 className="text-admin">
                <span ref={countupSessionsRef}></span>
              </h1>
            </div>
          </div>
          <div className="col-lg-3 col-md-3 col-sm-6 col-6 mb-3">
            <div className="bg-white p-4 rounded-3 h-100">
              <h6>Formations</h6>
              <h1 className="text-admin">
                <span ref={countupFormationsRef}></span>
              </h1>
            </div>
          </div>
          <div className="col-lg-3 col-md-3 col-sm-6 col-6 mb-3">
            <div className="bg-white p-4 rounded-3 h-100">
              <h6>Revenues</h6>
              <h1 className="text-admin">
                <span ref={countupRevenuesRef}></span> €
              </h1>
            </div>
          </div>
        </div>

        {/* Section Statistiques et Favoris */}
        <div className="row g-3 mb-3">
          <div className="col-lg-8 col-md-12 mb-5">
            <div className="bg-white p-4 rounded-3 h-100">
              <h5 className="mb-4">Statistiques</h5>

              {/* Graphique d'évolution des inscriptions */}
              <div className="mb-4" style={{ height: "250px" }}>
                <h6 className="text-muted mb-3">
                  Évolution des inscriptions (2024)
                </h6>
                <Line data={lineChartData} options={chartOptions} />
              </div>

              {/* Graphiques en barres et donut côte à côte */}
              <div className="row g-3 mt-5">
                <div className="col-md-6">
                  <div style={{ height: "250px" }}>
                    <h6 className="text-muted mb-3">
                      Formations par catégorie
                    </h6>
                    <Bar data={barChartData} options={chartOptions} />
                  </div>
                </div>
                <div className="col-md-6 mb-4">
                  <div style={{ height: "250px" }}>
                    <h6 className="text-muted mb-3">Répartition des revenus</h6>
                    <Doughnut data={doughnutChartData} options={chartOptions} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-12 mb-5">
            <div className="bg-white p-4 rounded-3 h-100">
              <h5 className="mb-4">Formation Populaire</h5>

              {/* Carte de formation populaire */}
              <div className="popular-formation-card">
                <h6 className="fw-bold mb-2">
                  Développement Web Full-Stack avec React & Node.js
                </h6>

                <div className="formation-stats">
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted small">Inscrits</span>
                    <span className="fw-bold text-admin">1,247</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted small">Note moyenne</span>
                    <span className="fw-bold">4.8/5</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted small">Revenus</span>
                    <span className="fw-bold text-admin">12,470 €</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted small">Croissance</span>
                    <span className="fw-bold text-success">+32%</span>
                  </div>
                </div>

                <div className="progress mb-3" style={{ height: "8px" }}>
                  <div
                    className="progress-bar"
                    role="progressbar"
                    style={{ width: "87%", backgroundColor: "#2EE88A" }}
                    aria-valuenow="87"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
                <small className="text-muted">87% de taux de complétion</small>

                <div className="mt-3">
                  <span className="badge bg-light text-dark me-1">React</span>
                  <span className="badge bg-light text-dark me-1">Node.js</span>
                  <span className="badge bg-light text-dark">MongoDB</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
