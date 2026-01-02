import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../constants/apiConstants";
import ProfSidebarCollapsible from "../../components/ProfSidebarCollapsible";

function Sessions() {
  const [sessions, setSessions] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState("week");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSessions = async () => {
      const res = await fetch(`${API_URL}/sessions`);
      const data = await res.json();
      setSessions(data);
    };
    fetchSessions();
  }, []);

  // Get week days starting from Monday
  const getWeekDays = (date) => {
    const days = [];
    const current = new Date(date);
    const day = current.getDay();
    const diff = current.getDate() - day + (day === 0 ? -6 : 1); // Monday
    const monday = new Date(current.setDate(diff));

    for (let i = 0; i < 7; i++) {
      const nextDay = new Date(monday);
      nextDay.setDate(monday.getDate() + i);
      days.push(nextDay);
    }
    return days;
  };

  // Get sessions for a specific day
  const getSessionsForDay = (date) => {
    if (!date) return [];
    return sessions.filter((session) => {
      const sessionDate = new Date(session.startDate);
      return (
        sessionDate.getDate() === date.getDate() &&
        sessionDate.getMonth() === date.getMonth() &&
        sessionDate.getFullYear() === date.getFullYear()
      );
    });
  };

  // Get sessions for time slot
  const getSessionsForTimeSlot = (date, hour) => {
    const daySessions = getSessionsForDay(date);
    return daySessions.filter((session) => {
      const sessionStart = new Date(session.startDate);
      return sessionStart.getHours() === hour;
    });
  };

  // Navigation
  const goToPrevious = () => {
    const newDate = new Date(currentDate);
    if (viewMode === "week") {
      newDate.setDate(currentDate.getDate() - 7);
    } else {
      newDate.setMonth(currentDate.getMonth() - 1);
    }
    setCurrentDate(newDate);
  };

  const goToNext = () => {
    const newDate = new Date(currentDate);
    if (viewMode === "week") {
      newDate.setDate(currentDate.getDate() + 7);
    } else {
      newDate.setMonth(currentDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const monthNames = [
    "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
    "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre",
  ];

  const dayNames = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
  const timeSlots = Array.from({ length: 14 }, (_, i) => i + 8); // 8h to 21h

  const weekDays = getWeekDays(currentDate);
  const weekStart = weekDays[0];
  const weekEnd = weekDays[6];

  // Get session color based on training
  const getSessionColor = (index) => {
    const colors = [
      "#FFA500", "#FF6B6B", "#4ECDC4", "#45B7D1",
      "#96CEB4", "#FFEAA7", "#DDA15E", "#BC6C25"
    ];
    return colors[index % colors.length];
  };

  return (
    <div style={{ backgroundColor: "#FFECC8", minHeight: "100vh" }}>
      <div className="container-fluid">
        <div className="row">
          <ProfSidebarCollapsible />

          <div className="col p-5">
            {/* Header */}
            <div className="d-flex align-items-center justify-content-between mb-4">
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
                <div>
                  <h2 className="mb-0">Calendrier des Sessions</h2>
                  <p className="text-secondary mb-0" style={{ fontSize: "14px" }}>
                    {viewMode === "week"
                      ? `${weekStart.getDate()} ${monthNames[weekStart.getMonth()]} - ${weekEnd.getDate()} ${monthNames[weekEnd.getMonth()]} ${weekEnd.getFullYear()}`
                      : `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`}
                  </p>
                </div>
              </div>

              {/* View mode selector */}
              <div className="btn-group" role="group">
                <button
                  className={`btn ${viewMode === "week" ? "btn-dark" : "btn-outline-dark"}`}
                  onClick={() => setViewMode("week")}
                  style={{ borderRadius: "8px 0 0 8px" }}
                >
                  Semaine
                </button>
                <button
                  className={`btn ${viewMode === "month" ? "btn-dark" : "btn-outline-dark"}`}
                  onClick={() => setViewMode("month")}
                  style={{ borderRadius: "0 8px 8px 0" }}
                >
                  Mois
                </button>
              </div>
            </div>

            {/* Controls */}
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div className="d-flex align-items-center gap-2">
                <button
                  className="btn btn-outline-dark"
                  onClick={goToPrevious}
                  style={{ borderRadius: "8px", padding: "8px 16px" }}
                >
                  ← Précédent
                </button>
                <button
                  className="btn"
                  onClick={goToToday}
                  style={{
                    backgroundColor: "#FFA500",
                    color: "#1a1a1a",
                    border: "2px solid #1a1a1a",
                    borderRadius: "8px",
                    padding: "8px 20px",
                    fontWeight: "500",
                  }}
                >
                  Aujourd'hui
                </button>
                <button
                  className="btn btn-outline-dark"
                  onClick={goToNext}
                  style={{ borderRadius: "8px", padding: "8px 16px" }}
                >
                  Suivant →
                </button>
              </div>

              <div className="badge" style={{
                backgroundColor: "#1a1a1a",
                color: "white",
                padding: "10px 20px",
                fontSize: "14px"
              }}>
                {sessions.length} session{sessions.length > 1 ? "s" : ""} au total
              </div>
            </div>

            {/* Week View */}
            {viewMode === "week" && (
              <div
                className="bg-white rounded-3"
                style={{
                  border: "2px solid #1a1a1a",
                  overflow: "auto",
                }}
              >
                <table className="table table-bordered mb-0" style={{ minWidth: "900px" }}>
                  <thead style={{ position: "sticky", top: 0, backgroundColor: "#f8f9fa", zIndex: 10 }}>
                    <tr>
                      <th style={{ width: "80px", padding: "15px", borderRight: "2px solid #dee2e6" }}>
                        Heure
                      </th>
                      {weekDays.map((day, index) => {
                        const isToday =
                          day.getDate() === new Date().getDate() &&
                          day.getMonth() === new Date().getMonth() &&
                          day.getFullYear() === new Date().getFullYear();
                        return (
                          <th
                            key={index}
                            style={{
                              padding: "15px",
                              backgroundColor: isToday ? "#fff3cd" : "#f8f9fa",
                              color: isToday ? "#ff8c00" : "#1a1a1a",
                              fontWeight: isToday ? "bold" : "normal",
                            }}
                          >
                            <div className="text-center">
                              <div style={{ fontSize: "12px" }}>
                                {dayNames[index]}
                              </div>
                              <div style={{ fontSize: "18px", fontWeight: "bold" }}>
                                {day.getDate()}
                              </div>
                            </div>
                          </th>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {timeSlots.map((hour) => (
                      <tr key={hour}>
                        <td
                          style={{
                            padding: "10px",
                            fontWeight: "bold",
                            backgroundColor: "#f8f9fa",
                            borderRight: "2px solid #dee2e6",
                            fontSize: "12px",
                          }}
                        >
                          {hour}:00
                        </td>
                        {weekDays.map((day, dayIndex) => {
                          const sessionsInSlot = getSessionsForTimeSlot(day, hour);
                          return (
                            <td
                              key={dayIndex}
                              style={{
                                padding: "5px",
                                verticalAlign: "top",
                                minHeight: "60px",
                                position: "relative",
                              }}
                            >
                              {sessionsInSlot.map((session, idx) => (
                                <div
                                  key={session.id}
                                  className="mb-1 p-2"
                                  style={{
                                    backgroundColor: getSessionColor(session.id),
                                    color: "white",
                                    borderRadius: "6px",
                                    cursor: "pointer",
                                    fontSize: "11px",
                                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                                  }}
                                  title={`${session.title}\n${formatTime(session.startDate)} - ${formatTime(session.endDate)}`}
                                >
                                  <div style={{ fontWeight: "bold", marginBottom: "2px" }}>
                                    {formatTime(session.startDate)}
                                  </div>
                                  <div style={{
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                  }}>
                                    {session.title}
                                  </div>
                                  {session.place && (
                                    <div style={{ fontSize: "10px", opacity: 0.9 }}>
                                      {session.place.name}
                                    </div>
                                  )}
                                </div>
                              ))}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Month View - Simplified */}
            {viewMode === "month" && (
              <div className="row g-3">
                {sessions
                  .filter((session) => {
                    const sessionDate = new Date(session.startDate);
                    return (
                      sessionDate.getMonth() === currentDate.getMonth() &&
                      sessionDate.getFullYear() === currentDate.getFullYear()
                    );
                  })
                  .sort((a, b) => new Date(a.startDate) - new Date(b.startDate))
                  .map((session, index) => (
                    <div key={session.id} className="col-md-6">
                      <div
                        className="bg-white rounded-3 p-3"
                        style={{
                          border: `3px solid ${getSessionColor(index)}`,
                          borderLeft: `10px solid ${getSessionColor(index)}`,
                          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                          transition: "transform 0.2s",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = "translateY(-2px)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = "translateY(0)";
                        }}
                      >
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <h5 className="mb-0">{session.title}</h5>
                          <span
                            className="badge"
                            style={{
                              backgroundColor: getSessionColor(index),
                              color: "white",
                              padding: "6px 12px",
                            }}
                          >
                            {session.capacity} places
                          </span>
                        </div>
                        <p className="text-secondary mb-2" style={{ fontSize: "14px" }}>
                          {session.description}
                        </p>
                        <div className="d-flex flex-wrap gap-3 mt-3">
                          <span style={{ fontSize: "14px" }}>
                            <strong>Date:</strong> {new Date(session.startDate).toLocaleDateString("fr-FR", {
                              weekday: "long",
                              day: "numeric",
                              month: "long",
                            })}
                          </span>
                          <span style={{ fontSize: "14px" }}>
                            <strong>Horaire:</strong> {formatTime(session.startDate)} - {formatTime(session.endDate)}
                          </span>
                          {session.place && (
                            <span style={{ fontSize: "14px" }}>
                              <strong>Lieu:</strong> {session.place.name}
                            </span>
                          )}
                          {session.training && (
                            <span style={{ fontSize: "14px" }}>
                              <strong>Formation:</strong> {session.training.title}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sessions;
