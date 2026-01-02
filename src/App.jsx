/**
 * App.jsx - Composant racine de l'application Synapse
 *
 * Ce fichier définit la structure principale de l'application avec :
 * - La configuration du routeur React Router
 * - Le contexte d'authentification (AuthProvider)
 * - Les composants globaux (Navbar, Footer, ScrollToTop)
 * - Toutes les routes de l'application
 *
 * Routes disponibles :
 * - / : Page d'accueil
 * - /login : Connexion/Inscription
 * - /cours : Liste des formations
 * - /cours-detail/:id : Détails d'une formation
 * - /cours-payment : Paiement d'une formation
 * - /payment-confirmation : Confirmation de paiement
 * - /dashboard : Tableau de bord étudiant
 * - /admin : Interface d'administration
 * - /contact : Page de contact
 * - /cgu, /mentions-legales, /rgpd, /politique-confidentialite : Pages légales
 * - /3d-viewer : Visualiseur 3D
 * - /reset-password : Réinitialisation du mot de passe
 *
 * Utilisé par : main.jsx
 */

import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Cours from "./pages/student/Cours";
import CoursDetail from "./pages/student/CoursDetail";
import CoursPayment from "./pages/student/CoursPayment";
import PaymentConfirmation from "./pages/student/PaymentConfirmation";
import AdminView from "./pages/admin/AdminView";
import Dashboard from "./pages/student/DashBoard";
import Contact from "./pages/Contact";
import MentionsLegales from "./pages/MentionsLegales";
import RGPD from "./pages/RGPD";
import PolitiqueConfidentialite from "./pages/PolitiqueConfidentialite";
import CGU from "./pages/CGU";
import ThreeDViewer from "./pages/3d/ThreeDViewer";
import CourseCatalog from "./pages/prof/CourseCatalog";
import CourseContent from "./pages/prof/CourseContent";
import MyStudents from "./pages/prof/MyStudents";
import ProfDashboard from "./pages/prof/ProfDashboard";
import ResetPassword from "./pages/ResetPassword";

function App() {
  return (
    <Router>
      <AuthProvider>
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cours" element={<Cours />} />
          <Route path="/cours-detail/:id" element={<CoursDetail />} />
          <Route path="/cours-payment" element={<CoursPayment />} />
          <Route
            path="/payment-confirmation"
            element={<PaymentConfirmation />}
          />
          <Route path="/admin" element={<AdminView />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/catalogue" element={<CourseCatalog />} />
          <Route path="/course-content" element={<CourseContent />} />
          <Route path="/mes-eleves" element={<MyStudents />} />
          <Route path="/prof-dashboard" element={<ProfDashboard />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cgu" element={<CGU />} />
          <Route path="/mentions-legales" element={<MentionsLegales />} />
          <Route path="/rgpd" element={<RGPD />} />
          <Route
            path="/politique-confidentialite"
            element={<PolitiqueConfidentialite />}
          />
          <Route path="/3d-viewer" element={<ThreeDViewer />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
        <Footer />
      </AuthProvider>
    </Router>
  );
}

export default App;
