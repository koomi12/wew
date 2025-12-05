import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

import Landing from "./Landing/LandingPage.jsx";
import Login from "./e-commerce/Login.jsx";
import Signup from "./e-commerce/Signup.jsx";
import Dashboard from "./e-commerce/dashboard.jsx";
import Profile from "./e-commerce/Profile.jsx";
import Cart from "./e-commerce/cart.jsx";
import Admin from "./admin/admin.jsx";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentRole, setCurrentRole] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Load auth from localStorage on page refresh
  useEffect(() => {
    const stored = localStorage.getItem("auth");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setCurrentUser(parsed.user || null);
        setCurrentRole(parsed.role || null);
        setIsAuthenticated(!!parsed.isAuthenticated);
      } catch (e) {
        console.error("Error parsing auth:", e);
      }
    }
  }, []);

  // Handle successful login/signup
  const handleLoginSuccess = ({ user, role }) => {
    const finalRole = role || "user"; // default role if missing

    setCurrentUser(user);
    setCurrentRole(finalRole);
    setIsAuthenticated(true);

    localStorage.setItem(
      "auth",
      JSON.stringify({
        user,
        role: finalRole,
        isAuthenticated: true,
      })
    );

    // Redirect after login
    if (finalRole === "admin") {
      navigate("/admin", { replace: true });
    } else {
      navigate("/dashboard", { replace: true });
    }
  };

  // Protect routes
  const requireAuth = (element, requiredRole) => {
    if (isAuthenticated) {
      // If role mismatch
      if (requiredRole && currentRole !== requiredRole) {
        return <Navigate to="/dashboard" replace />;
      }
      return element;
    }

    // Auto-restore from localStorage if possible
    const stored = localStorage.getItem("auth");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed.isAuthenticated) {
          setCurrentUser(parsed.user || null);
          setCurrentRole(parsed.role || "user");
          setIsAuthenticated(true);

          if (requiredRole && parsed.role !== requiredRole) {
            return <Navigate to="/dashboard" replace />;
          }
          return element;
        }
      } catch (e) {
        console.error("Error checking auth:", e);
      }
    }

    return <Navigate to="/" replace />;
  };

  return (
    <Routes>
      {/* Landing Page */}
      <Route
        path="/"
        element={<Landing onLoginSuccess={handleLoginSuccess} />}
      />

      {/* Login */}
      <Route
        path="/login"
        element={<Login onLoginSuccess={handleLoginSuccess} />}
      />

      {/* Signup */}
      <Route
        path="/signup"
        element={<Signup onLoginSuccess={handleLoginSuccess} />}
      />

      {/* Dashboard (Authenticated: ANY ROLE) */}
      <Route
        path="/dashboard"
        element={requireAuth(<Dashboard />)} // <-- FIXED
      />

      {/* Profile */}
      <Route path="/profile" element={requireAuth(<Profile />)} />

      {/* Cart */}
      <Route path="/cart" element={requireAuth(<Cart />)} />

      {/* Admin (Admin ONLY) */}
      <Route
        path="/admin"
        element={requireAuth(<Admin />, "admin")}
      />

      {/* Catch all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
