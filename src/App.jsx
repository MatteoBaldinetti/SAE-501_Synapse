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
          <Route path="/payment-confirmation" element={<PaymentConfirmation />} />
          <Route path="/admin" element={<AdminView />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cgu" element={<CGU />} />
          <Route path="/mentions-legales" element={<MentionsLegales />} />
          <Route path="/rgpd" element={<RGPD />} />
          <Route path="/politique-confidentialite" element={<PolitiqueConfidentialite />} />
          <Route path="/3d-viewer" element={<ThreeDViewer />} />
        </Routes>
        <Footer />
      </AuthProvider>
    </Router>
  );
}

export default App;
