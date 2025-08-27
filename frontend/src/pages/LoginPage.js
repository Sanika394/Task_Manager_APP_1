import React, { useState } from "react";
import "../App.css";

export default function LoginPage({ setUser }) {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // your login logic here
  };

  return (
    <div className="page-container">
      <div className="form-box">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
          <button type="submit">Login</button>
        </form>
        <div className="form-link">
          <p>
            Don’t have an account? <a href="/register">Signup</a>
          </p>
        </div>
      </div>
    </div>
  );
}
