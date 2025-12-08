import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Cours from "./pages/Cours";
import CoursDetail from "./pages/CoursDetail";
import CoursPayment from "./pages/CoursPayment";

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
        </Routes>
        <Footer />
      </AuthProvider>
    </Router>
  );
}

export default App;