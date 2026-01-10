import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL, API_KEY } from "../../constants/apiConstants";
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

/**
 * ProfDashboardContent
 * Composant de contenu pour le tableau de bord professeur
 * Affiche les cours, statistiques et graphiques des inscriptions
 */
function ProfDashboardContent() {
  const [courses, setCourses] = useState([]);
  const [inscriptions, setInscriptions] = useState([]);
  const navigate = useNavigate();
  const countupInscriptionsRef = useRef(null);
  const { userId } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      if (!userId) return;

      // Fetch sessions where the professor is the instructor
      const sessionsRes = await fetch(`${API_URL}/sessions`, {
        method: "GET",
        headers: { "X-API-KEY": API_KEY },
      });
      const allSessions = await sessionsRes.json();
      const profSessions = allSessions.filter(
        (session) => session.instructor?.id === userId
      );
      const profSessionIds = profSessions.map((s) => s.id);

      // Get unique trainings from professor's sessions
      const trainingIds = [
        ...new Set(
          profSessions.filter((s) => s.training).map((s) => s.training.id)
        ),
      ];

      const coursesRes = await fetch(`${API_URL}/trainings`, {
        method: "GET",
        headers: { "X-API-KEY": API_KEY },
      });
      const allCourses = await coursesRes.json();
      const profCourses = allCourses.filter((course) =>
        trainingIds.includes(course.id)
      );
      setCourses(profCourses.slice(0, 3)); // Display first 3 courses

      // Fetch inscriptions for statistics (only for professor's sessions)
      const inscriptionsRes = await fetch(`${API_URL}/inscriptions`, {
        method: "GET",
        headers: { "X-API-KEY": API_KEY },
      });
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
        const inscriptionDate = new Date(
          inscription.inscriptionDate || inscription.date
        );
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

  // Calculer les statistiques de notes par formation
  const getGradeStatsByTraining = () => {
    const trainingStats = {};

    inscriptions.forEach((inscription) => {
      if (!inscription.session?.training || inscription.amount == null) return;

      const trainingId = inscription.session.training.id;
      const trainingTitle = inscription.session.training.title;
      const grade = inscription.amount;

      if (!trainingStats[trainingId]) {
        trainingStats[trainingId] = {
          title: trainingTitle,
          grades: [],
          total: 0,
          count: 0,
        };
      }

      trainingStats[trainingId].grades.push(grade);
      trainingStats[trainingId].total += grade;
      trainingStats[trainingId].count++;
    });

    // Calculer les moyennes
    Object.keys(trainingStats).forEach((key) => {
      const stats = trainingStats[key];
      stats.average = stats.count > 0 ? stats.total / stats.count : 0;
    });

    return trainingStats;
  };

  const gradeStats = getGradeStatsByTraining();
  const trainingsWithGrades = Object.values(gradeStats);

  // Calculer la moyenne globale
  const globalAverage =
    trainingsWithGrades.length > 0
      ? trainingsWithGrades.reduce((sum, t) => sum + t.average, 0) /
      trainingsWithGrades.length
      : 0;

  // Convertir en pourcentage sur 20
  const globalPercentage = ((globalAverage / 20) * 100).toFixed(0);

  // Données pour le graphique en barres (notes moyennes par formation)
  const barChartData = {
    labels: trainingsWithGrades.map((t) =>
      t.title.length > 20 ? t.title.substring(0, 20) + "..." : t.title
    ),
    datasets: [
      {
        label: "Note moyenne (/20)",
        data: trainingsWithGrades.map((t) => t.average.toFixed(1)),
        backgroundColor: trainingsWithGrades.map(
          (_, index) => `rgba(139, 69, 19, ${0.8 - index * 0.1})`
        ),
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

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 20,
        ticks: {
          stepSize: 5,
        },
      },
    },
  };

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>Tableau de bord Professeur</h3>
        <div className="d-flex gap-3">
          <button
            onClick={() => navigate("/sessions")}
            className="btn btn-prof"
          >
            Voir le calendrier
          </button>
        </div>
      </div>

      <div>
        <p className="text-secondary">
          Vue d'ensemble de vos cours et de vos performances
        </p>
      </div>

      {/* Mes cours Section */}
      <div className="mt-4">
        <h4 className="mb-3">Mes cours</h4>
        <div className="bg-white border rounded p-4">
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
          {/* Notes moyennes par formation */}
          <div className="col-md-6">
            <div
              className="bg-white border rounded p-4"
              style={{ height: "100%" }}
            >
              <h5 className="mb-3">Notes moyennes par formation</h5>
              <h2 className="mb-2">
                {trainingsWithGrades.length > 0
                  ? `${globalAverage.toFixed(1)}/20`
                  : "Aucune note"}
              </h2>
              <p className="text-secondary mb-4" style={{ fontSize: "14px" }}>
                {trainingsWithGrades.length > 0
                  ? `Moyenne globale (${globalPercentage}%) - ${trainingsWithGrades.length
                  } formation${trainingsWithGrades.length > 1 ? "s" : ""}`
                  : "Aucune note disponible pour le moment"}
              </p>
              <div style={{ height: "250px" }}>
                {trainingsWithGrades.length > 0 ? (
                  <Bar data={barChartData} options={barChartOptions} />
                ) : (
                  <div className="d-flex align-items-center justify-content-center h-100">
                    <p className="text-secondary">Aucune donnée à afficher</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Évolution des inscriptions */}
          <div className="col-md-6">
            <div
              className="bg-white border rounded p-4"
              style={{ height: "100%" }}
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
  );
}

export default ProfDashboardContent;
