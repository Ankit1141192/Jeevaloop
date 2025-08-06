import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import Login from "./auth/Login.jsx";
import Signup from "./auth/Signup.jsx";
import ForgotPassword from './auth/ForgotPassword.jsx';
import ResetPassword from './auth/ResetPassword.jsx';
import Dashboard from "./pages/Dashboard.jsx";
import Home from "./pages/Home.jsx";
import Appointments from "./pages/Appointments.jsx";
import Patients from "./pages/Patients.jsx";
import Contact from "./pages/Contact.jsx";
import Footer from "./components/Footer.jsx";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/token" element={<ResetPassword />} />
          <Route path="/dashboard" element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } />

          <Route path="/appointments" element={
            <PrivateRoute>
              <Appointments />
            </PrivateRoute>
          } />
          <Route path="/patients" element={
            <PrivateRoute>
              <Patients />
            </PrivateRoute>
          } />
          <Route path="/contact" element={
            <PrivateRoute>
              <Contact />
            </PrivateRoute>
          } />
          <Route path="/" element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          } />
          
        </Routes>
        <Footer/>
      </Router>
    </AuthProvider>
  );
}

export default App;
