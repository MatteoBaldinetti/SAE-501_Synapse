/**
 * ProfView.jsx - Vue principale de l'interface professeur
 *
 * Page conteneur de l'interface professeur avec :
 * - Sidebar de navigation (Dashboard, Sessions, Mes Élèves, Profil, Catalogue)
 * - Zone de contenu dynamique affichant le composant sélectionné
 * - Gestion de l'état de navigation entre les différentes sections
 *
 * Sections disponibles :
 * - dashboard : ProfDashboardContent
 * - sessions : SessionsContent
 * - students : MyStudentsContent
 * - profile : ProfileComponents
 *
 * Route : /prof-dashboard
 * Utilisé par : App.jsx
 * Dépendances : AuthContext, tous les composants Prof
 */

import { useState } from "react";
import "../../styles/EnseignantDashboard.css";
import ProfDashboardContent from "../../components/prof/ProfDashboardContent";
import SessionsContent from "../../components/prof/SessionsContent";
import MyStudentsContent from "../../components/prof/MyStudentsContent";
import ProfileComponents from "../../components/ProfileComponents";
import { useAuth } from "../../contexts/AuthContext";

function ProfView() {
  const [currentLayout, setCurrentLayout] = useState("dashboard");
  const {
    userId,
    userEmail,
    userFirstname,
    userLastname,
    userPhone,
    userImage,
    logout,
  } = useAuth();

  document.title = "Professeur - Dashboard";

  return (
    <div style={{ backgroundColor: "#FFECC8", minHeight: "100vh" }}>
      <div className="container-fluid py-5">
        <div className="row">
          {/* Sidebar */}
          <div className="col-3 prof-sidebar">
            <div className="profil gestionnaire ms-3">
              <h4>Profil</h4>
              <div
                className={`${
                  currentLayout === "profile" ? "selected-button-prof" : ""
                } d-flex align-items-center p-2 my-2`}
                onClick={() => setCurrentLayout("profile")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 640"
                  className="me-2"
                  style={{ width: "1.5em", height: "1.5em" }}
                >
                  <path d="M320 128C284.7 128 256 156.7 256 192C256 227.3 284.7 256 320 256C355.3 256 384 227.3 384 192C384 156.7 355.3 128 320 128zM208 192C208 130.1 258.1 80 320 80C381.9 80 432 130.1 432 192C432 253.9 381.9 304 320 304C258.1 304 208 253.9 208 192zM192 416C174.3 416 160 430.3 160 448L160 480C160 497.7 145.7 512 128 512C110.3 512 96 497.7 96 480L96 448C96 394.1 138.1 352 192 352L448 352C501.9 352 544 394.1 544 448L544 480C544 497.7 529.7 512 512 512C494.3 512 480 497.7 480 480L480 448C480 430.3 465.7 416 448 416L192 416z" />
                </svg>
                <span>Mon Profil</span>
              </div>
            </div>

            <div className="gestionnaire ms-3">
              <h4>Enseignement</h4>
              <div
                className={`${
                  currentLayout === "dashboard" ? "selected-button-prof" : ""
                } d-flex align-items-center p-2 my-2`}
                onClick={() => setCurrentLayout("dashboard")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 640"
                  className="me-2"
                  style={{ width: "1.5em", height: "1.5em" }}
                >
                  <path d="M128 128C128 110.3 113.7 96 96 96C78.3 96 64 110.3 64 128L64 464C64 508.2 99.8 544 144 544L544 544C561.7 544 576 529.7 576 512C576 494.3 561.7 480 544 480L144 480C135.2 480 128 472.8 128 464L128 128zM534.6 214.6C547.1 202.1 547.1 181.8 534.6 169.3C522.1 156.8 501.8 156.8 489.3 169.3L384 274.7L326.6 217.4C314.1 204.9 293.8 204.9 281.3 217.4L185.3 313.4C172.8 325.9 172.8 346.2 185.3 358.7C197.8 371.2 218.1 371.2 230.6 358.7L304 285.3L361.4 342.7C373.9 355.2 394.2 355.2 406.7 342.7L534.7 214.7z" />
                </svg>
                <span>Tableau de bord</span>
              </div>

              <div
                className={`${
                  currentLayout === "sessions" ? "selected-button-prof" : ""
                } d-flex align-items-center p-2 my-2`}
                onClick={() => setCurrentLayout("sessions")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 640"
                  className="me-2"
                  style={{ width: "1.5em", height: "1.5em" }}
                >
                  <path d="M216 64C229.3 64 240 74.7 240 88L240 128L400 128L400 88C400 74.7 410.7 64 424 64C437.3 64 448 74.7 448 88L448 128L480 128C515.3 128 544 156.7 544 192L544 480C544 515.3 515.3 544 480 544L160 544C124.7 544 96 515.3 96 480L96 192C96 156.7 124.7 128 160 128L192 128L192 88C192 74.7 202.7 64 216 64zM216 176L160 176C151.2 176 144 183.2 144 192L144 240L496 240L496 192C496 183.2 488.8 176 480 176L216 176zM144 288L144 480C144 488.8 151.2 496 160 496L480 496C488.8 496 496 488.8 496 480L496 288L144 288z" />
                </svg>
                <span>Sessions</span>
              </div>

              <div
                className={`${
                  currentLayout === "students" ? "selected-button-prof" : ""
                } d-flex align-items-center p-2 my-2`}
                onClick={() => setCurrentLayout("students")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 640"
                  className="me-2"
                  style={{ width: "1.5em", height: "1.5em" }}
                >
                  <path d="M320 32c-8.1 0-16.1 1.4-23.7 4.1L15.8 137.4C6.3 140.9 0 149.9 0 160s6.3 19.1 15.8 22.6l57.9 20.9C57.3 229.3 48 259.8 48 291.9v28.1c0 28.4-10.8 57.7-22.3 80.8c-6.5 13-13.9 25.8-22.5 37.6C0 442.7-.9 448.3 .9 453.4s6 8.9 11.2 10.2l64 16c4.2 1.1 8.7 .3 12.4-2s6.3-6.1 7.1-10.4c8.6-42.8 4.3-81.2-2.1-108.7C90.3 344.3 86 329.8 80 316.5V295.1c0-30.2 10.2-58.7 27.9-81.5c12.9-15.5 29.6-28 49.2-35.7l157-61.7c8.2-3.2 17.5 .8 20.7 9s-.8 17.5-9 20.7l-157 61.7c-12.4 4.9-23.3 12.4-32.2 21.6l159.6 57.6c7.6 2.7 15.6 4.1 23.7 4.1s16.1-1.4 23.7-4.1L624.2 182.6c9.5-3.4 15.8-12.5 15.8-22.6s-6.3-19.1-15.8-22.6L343.7 36.1C336.1 33.4 328.1 32 320 32zM128 408c0 35.3 86 72 192 72s192-36.7 192-72L496.7 262.6 354.5 314c-11.1 4-22.8 6-34.5 6s-23.5-2-34.5-6L143.3 262.6 128 408z" />
                </svg>
                <span>Mes Élèves</span>
              </div>

            </div>
          </div>

          {/* Main Content */}
          <div className="col-9">
            {currentLayout === "dashboard" && <ProfDashboardContent />}
            {currentLayout === "sessions" && <SessionsContent />}
            {currentLayout === "students" && <MyStudentsContent />}
            {currentLayout === "profile" && (
              <ProfileComponents
                userId={userId}
                userEmail={userEmail}
                userFirstname={userFirstname}
                userLastname={userLastname}
                userPhone={userPhone}
                userImage={userImage}
                logout={logout}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfView;
