import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ProfSidebarCollapsible from "../../components/ProfSidebarCollapsible";
import ProfDashboard from "./ProfDashboard";
import Sessions from "./Sessions";
import MyStudents from "./MyStudents";
import ProfProfile from "./ProfProfile";
import EditProfile from "./EditProfile";
import CourseContent from "./CourseContent";

function ProfLayout() {
  const location = useLocation();
  const [currentSection, setCurrentSection] = useState("formation");

  // Update section based on URL path
  useEffect(() => {
    if (location.pathname === "/prof-dashboard") {
      setCurrentSection("formation");
    } else if (location.pathname === "/sessions") {
      setCurrentSection("sessions");
    } else if (location.pathname === "/mes-eleves") {
      setCurrentSection("inscriptions");
    } else if (location.pathname.startsWith("/prof-profile")) {
      setCurrentSection("profile");
    } else if (location.pathname.startsWith("/edit-profile")) {
      setCurrentSection("edit-profile");
    } else if (location.pathname === "/course-content") {
      setCurrentSection("course-content");
    }
  }, [location.pathname]);

  const renderContent = () => {
    switch (currentSection) {
      case "formation":
        return <ProfDashboard />;
      case "sessions":
        return <Sessions />;
      case "inscriptions":
        return <MyStudents />;
      case "profile":
        return <ProfProfile />;
      case "edit-profile":
        return <EditProfile />;
      case "course-content":
        return <CourseContent />;
      default:
        return <ProfDashboard />;
    }
  };

  return (
    <div style={{ backgroundColor: "#FFECC8", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <div className="container-fluid py-5" style={{ flex: 1, display: "flex" }}>
        <div className="row" style={{ flex: 1, width: "100%" }}>
          {/* Sidebar */}
          <ProfSidebarCollapsible />

          {/* Main Content */}
          <div className="col" style={{ display: "flex", flexDirection: "column" }}>
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfLayout;
