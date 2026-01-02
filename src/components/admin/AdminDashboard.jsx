import { useAuth } from "../../contexts/AuthContext";
import { useEffect, useRef, useState } from "react";
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

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

function AdminDashboard() {
  const { userId, userEmail, userFirstname, userLastname, userType } =
    useAuth();

  const countupUsersRef = useRef(null);
  const countupSessionsRef = useRef(null);
  const countupFormationsRef = useRef(null);
  const countupRevenuesRef = useRef(null);

  const [users, setUsers] = useState([]);
  const [trainings, setTrainings] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [inscriptions, setInscriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Statistiques calculées
  const [stats, setStats] = useState({
    nbrUsers: 0,
    nbrFormations: 0,
    nbrSessions: 0,
    revenues: 0,
  });

  const [chartData, setChartData] = useState({
    lineChartData: null,
    barChartData: null,
    doughnutChartData: null,
  });

  const [popularTraining, setPopularTraining] = useState(null);

  // Récupérer toutes les données
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [usersRes, trainingsRes, sessionsRes, inscriptionsRes] =
          await Promise.all([
            fetch(`${API_URL}/api/users`),
            fetch(`${API_URL}/api/trainings`),
            fetch(`${API_URL}/api/sessions`),
            fetch(`${API_URL}/api/inscriptions`),
          ]);

        const usersData = await usersRes.json();
        const trainingsData = await trainingsRes.json();
        const sessionsData = await sessionsRes.json();
        const inscriptionsData = await inscriptionsRes.json();

        setUsers(usersData);
        setTrainings(trainingsData);
        setSessions(sessionsData);
        setInscriptions(inscriptionsData);

        // Calculer les statistiques
        calculateStats(
          usersData,
          trainingsData,
          sessionsData,
          inscriptionsData
        );

        // Générer les données des graphiques
        generateChartData(trainingsData, inscriptionsData);

        // Trouver la formation la plus populaire
        findPopularTraining(trainingsData, inscriptionsData);

        setLoading(false);
      } catch (error) {
        console.error("Erreur lors du chargement des données:", error);
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  // Calculer les statistiques
  const calculateStats = (users, trainings, sessions, inscriptions) => {
    const nbrUsers = users.length;
    const nbrFormations = trainings.length;

    // Sessions terminées (endDate < aujourd'hui)
    const now = new Date();
    const nbrSessions = sessions.filter(
      (session) => new Date(session.endDate) < now
    ).length;

    // Revenus totaux
    const revenues = inscriptions.reduce(
      (total, inscription) => total + (inscription.amount || 0),
      0
    );

    setStats({
      nbrUsers,
      nbrFormations,
      nbrSessions,
      revenues: Math.round(revenues),
    });
  };

  // Générer les données des graphiques
  const generateChartData = (trainings, inscriptions) => {
    // 1. Graphique en ligne : Inscriptions par mois
    const inscriptionsByMonth = new Array(12).fill(0);
    inscriptions.forEach((inscription) => {
      const month = new Date(inscription.inscriptionDate).getMonth();
      inscriptionsByMonth[month]++;
    });

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
          data: inscriptionsByMonth,
          borderColor: "#2EE88A",
          backgroundColor: "rgba(46, 232, 138, 0.1)",
          tension: 0.4,
          fill: true,
        },
      ],
    };

    // 2. Graphique en barres : Formations par catégorie
    const categoryCounts = {};
    trainings.forEach((training) => {
      const category = training.category || "Autre";
      categoryCounts[category] = (categoryCounts[category] || 0) + 1;
    });

    const categories = Object.keys(categoryCounts);
    const counts = Object.values(categoryCounts);

    const barChartData = {
      labels: categories,
      datasets: [
        {
          label: "Nombre de formations",
          data: counts,
          backgroundColor: categories.map(
            (_, i) => `rgba(46, 232, 138, ${0.8 - i * 0.1})`
          ),
          borderColor: "#2EE88A",
          borderWidth: 2,
        },
      ],
    };

    // 3. Graphique en donut : Revenus par catégorie
    const revenuesByCategory = {};
    inscriptions.forEach((inscription) => {
      const category = inscription.training?.category || "Autre";
      revenuesByCategory[category] =
        (revenuesByCategory[category] || 0) + (inscription.amount || 0);
    });

    const revenueCategories = Object.keys(revenuesByCategory);
    const revenueValues = Object.values(revenuesByCategory);

    const colors = [
      "#2EE88A",
      "#26D47A",
      "#1FC06A",
      "#18AC5A",
      "#11984A",
      "#0A7A3A",
    ];

    const doughnutChartData = {
      labels: revenueCategories,
      datasets: [
        {
          label: "Revenus (€)",
          data: revenueValues,
          backgroundColor: colors.slice(0, revenueCategories.length),
          borderWidth: 2,
          borderColor: "#fff",
        },
      ],
    };

    setChartData({
      lineChartData,
      barChartData,
      doughnutChartData,
    });
  };

  // Trouver la formation la plus populaire
  const findPopularTraining = (trainings, inscriptions) => {
    const trainingStats = {};

    // Compter les inscriptions par formation
    inscriptions.forEach((inscription) => {
      const trainingId = inscription.training?.id;
      if (trainingId) {
        if (!trainingStats[trainingId]) {
          trainingStats[trainingId] = {
            count: 0,
            revenue: 0,
          };
        }
        trainingStats[trainingId].count++;
        trainingStats[trainingId].revenue += inscription.amount || 0;
      }
    });

    // Trouver la formation avec le plus d'inscriptions
    let maxCount = 0;
    let popularTrainingId = null;

    Object.keys(trainingStats).forEach((id) => {
      if (trainingStats[id].count > maxCount) {
        maxCount = trainingStats[id].count;
        popularTrainingId = id;
      }
    });

    if (popularTrainingId) {
      const training = trainings.find(
        (t) => t.id === parseInt(popularTrainingId)
      );
      if (training) {
        setPopularTraining({
          ...training,
          inscriptionsCount: trainingStats[popularTrainingId].count,
          revenue: Math.round(trainingStats[popularTrainingId].revenue),
        });
      }
    }
  };

  // Initialiser CountUp après le chargement des données
  useEffect(() => {
    if (!loading && stats.nbrUsers > 0) {
      initCountUp();
    }
  }, [loading, stats]);

  async function initCountUp() {
    const countUpModule = await import("countup.js");

    // Animation pour le nombre d'utilisateurs
    const countUpUsers = new countUpModule.CountUp(
      countupUsersRef.current,
      stats.nbrUsers
    );
    if (!countUpUsers.error) {
      countUpUsers.start();
    } else {
      console.error(countUpUsers.error);
    }

    // Animation pour le nombre de sessions
    const countUpSessions = new countUpModule.CountUp(
      countupSessionsRef.current,
      stats.nbrSessions
    );
    if (!countUpSessions.error) {
      countUpSessions.start();
    } else {
      console.error(countUpSessions.error);
    }

    // Animation pour le nombre de formations
    const countUpFormations = new countUpModule.CountUp(
      countupFormationsRef.current,
      stats.nbrFormations
    );
    if (!countUpFormations.error) {
      countUpFormations.start();
    } else {
      console.error(countUpFormations.error);
    }

    // Animation pour les revenus
    const countUpRevenues = new countUpModule.CountUp(
      countupRevenuesRef.current,
      stats.revenues
    );
    if (!countUpRevenues.error) {
      countUpRevenues.start();
    } else {
      console.error(countUpRevenues.error);
    }
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  if (loading) {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12 text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Chargement...</span>
            </div>
            <p className="mt-3">Chargement du tableau de bord...</p>
          </div>
        </div>
      </div>
    );
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
                <span ref={countupUsersRef}>{stats.nbrUsers}</span>
              </h1>
            </div>
          </div>
          <div className="col-lg-3 col-md-3 col-sm-6 col-6 mb-3">
            <div className="bg-white p-4 rounded-3 h-100">
              <h6>Sessions terminées</h6>
              <h1 className="text-admin">
                <span ref={countupSessionsRef}>{stats.nbrSessions}</span>
              </h1>
            </div>
          </div>
          <div className="col-lg-3 col-md-3 col-sm-6 col-6 mb-3">
            <div className="bg-white p-4 rounded-3 h-100">
              <h6>Formations</h6>
              <h1 className="text-admin">
                <span ref={countupFormationsRef}>{stats.nbrFormations}</span>
              </h1>
            </div>
          </div>
          <div className="col-lg-3 col-md-3 col-sm-6 col-6 mb-3">
            <div className="bg-white p-4 rounded-3 h-100">
              <h6>Revenus</h6>
              <h1 className="text-admin">
                <span ref={countupRevenuesRef}>{stats.revenues}</span> €
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
              {chartData.lineChartData && (
                <div className="mb-4" style={{ height: "250px" }}>
                  <h6 className="text-muted mb-3">
                    Évolution des inscriptions (2026)
                  </h6>
                  <Line data={chartData.lineChartData} options={chartOptions} />
                </div>
              )}

              {/* Graphiques en barres et donut côte à côte */}
              <div className="row g-3 mt-5">
                <div className="col-md-6">
                  {chartData.barChartData && (
                    <div style={{ height: "250px" }}>
                      <h6 className="text-muted mb-3">
                        Formations par catégorie
                      </h6>
                      <Bar
                        data={chartData.barChartData}
                        options={chartOptions}
                      />
                    </div>
                  )}
                </div>
                <div className="col-md-6 mb-4">
                  {chartData.doughnutChartData && (
                    <div style={{ height: "250px" }}>
                      <h6 className="text-muted mb-3">
                        Répartition des revenus
                      </h6>
                      <Doughnut
                        data={chartData.doughnutChartData}
                        options={chartOptions}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-12 mb-5">
            <div className="bg-white p-4 rounded-3 h-100">
              <h5 className="mb-4">Formation Populaire</h5>

              {/* Carte de formation populaire */}
              {popularTraining ? (
                <div className="popular-formation-card">
                  <h6 className="fw-bold mb-2">{popularTraining.title}</h6>

                  <div className="formation-stats">
                    <div className="d-flex justify-content-between mb-2">
                      <span className="text-muted small">Inscrits</span>
                      <span className="fw-bold text-admin">
                        {popularTraining.inscriptionsCount}
                      </span>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span className="text-muted small">Durée</span>
                      <span className="fw-bold">
                        {popularTraining.duration}h
                      </span>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span className="text-muted small">Revenus</span>
                      <span className="fw-bold text-admin">
                        {popularTraining.revenue} €
                      </span>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span className="text-muted small">Prix</span>
                      <span className="fw-bold">{popularTraining.price} €</span>
                    </div>
                  </div>

                  <div className="progress mb-3 mt-3" style={{ height: "8px" }}>
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{
                        width: `${Math.min(
                          (popularTraining.inscriptionsCount / stats.nbrUsers) *
                            100,
                          100
                        )}%`,
                        backgroundColor: "#2EE88A",
                      }}
                      aria-valuenow={popularTraining.inscriptionsCount}
                      aria-valuemin="0"
                      aria-valuemax={stats.nbrUsers}
                    ></div>
                  </div>
                  <small className="text-muted">
                    {Math.round(
                      (popularTraining.inscriptionsCount / stats.nbrUsers) * 100
                    )}
                    % des utilisateurs inscrits
                  </small>

                  <div className="mt-3">
                    <span className="badge bg-light text-dark me-1">
                      {popularTraining.category}
                    </span>
                  </div>
                </div>
              ) : (
                <p className="text-muted">Aucune donnée disponible</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
