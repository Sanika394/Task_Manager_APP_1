import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import TaskPage from "./pages/TaskPage";

export default function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={!user ? <RegisterPage setUser={setUser} /> : <Navigate to="/tasks" />}
        />
        <Route
          path="/login"
          element={!user ? <LoginPage setUser={setUser} /> : <Navigate to="/tasks" />}
        />
        <Route
          path="/tasks"
          element={user ? <TaskPage user={user} /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}
