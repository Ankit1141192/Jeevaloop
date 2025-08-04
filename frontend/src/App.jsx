import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Login from "./auth/Login.jsx";
import Signup from "./auth/Signup.jsx";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        {/* Add other routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
