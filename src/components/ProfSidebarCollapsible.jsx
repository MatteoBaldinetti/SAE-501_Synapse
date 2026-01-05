import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function ProfSidebarCollapsible({ currentSection, onSectionChange }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      path: "/prof-dashboard",
      section: "formation",
      label: "Tableau de bord / Formation",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          style={{ width: "20px", height: "20px", minWidth: "20px" }}
        >
          <path d="M3 3h18v2H3V3zm0 4h18v2H3V7zm0 4h18v2H3v-2zm0 4h18v2H3v-2zm0 4h18v2H3v-2z" />
        </svg>
      ),
    },
    {
      path: "/sessions",
      section: "sessions",
      label: "Sessions",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          style={{ width: "20px", height: "20px", minWidth: "20px" }}
        >
          <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z" />
        </svg>
      ),
    },
    {
      path: "/mes-eleves",
      section: "inscriptions",
      label: "Inscriptions",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          style={{ width: "20px", height: "20px", minWidth: "20px" }}
        >
          <path d="M16 11c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 3-1.34 3-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
        </svg>
      ),
    },
  ];

  const handleItemClick = (item) => {
    if (onSectionChange) {
      // Si on utilise les sections (comme dans CourseContent)
      onSectionChange(item.section);
    } else {
      // Si on utilise la navigation (comme dans ProfDashboard)
      navigate(item.path);
    }
  };

  const isItemActive = (item) => {
    if (currentSection) {
      // Mode section (CourseContent)
      return currentSection === item.section;
    } else {
      // Mode navigation (ProfDashboard)
      return location.pathname === item.path;
    }
  };

  return (
    <div
      className={`p-0 transition-all`}
      style={{
        backgroundColor: "#FFE4B5",
        width: isCollapsed ? "80px" : "auto",
        transition: "width 0.3s ease",
        minHeight: "100vh",
      }}
    >
      <div className="p-3">
        <div className="d-flex justify-content-between align-items-center mb-3">
          {!isCollapsed && <h5 className="mb-0">Gestionnaire</h5>}
          <button
            className="btn btn-sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            style={{
              backgroundColor: "#FFA500",
              border: "none",
              borderRadius: "50%",
              width: "32px",
              height: "32px",
              padding: "0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginLeft: isCollapsed ? "auto" : "0",
            }}
            title={isCollapsed ? "Agrandir" : "Réduire"}
          >
            <span style={{ fontSize: "20px", color: "white", fontWeight: "bold" }}>
              {isCollapsed ? "+" : "−"}
            </span>
          </button>
        </div>

        {menuItems.map((item, index) => (
          <div
            key={index}
            className={`d-flex align-items-center p-2 mb-2 ${
              isItemActive(item) ? "bg-warning" : ""
            }`}
            style={{
              borderRadius: "5px",
              cursor: "pointer",
              justifyContent: isCollapsed ? "center" : "flex-start",
            }}
            onClick={() => handleItemClick(item)}
            title={isCollapsed ? item.label : ""}
          >
            <span style={{ marginRight: isCollapsed ? "0" : "10px" }}>
              {item.icon}
            </span>
            {!isCollapsed && <span>{item.label}</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProfSidebarCollapsible;
