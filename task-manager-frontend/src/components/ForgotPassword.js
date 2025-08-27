import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Auth.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Step 1: Request reset link
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setMessage(""); setError("");
    try {
      const res = await axios.post("http://localhost:5000/api/auth/forgot-password", { email });
      setMessage(res.data.msg);
    } catch (err) {
      setError(err.response?.data?.msg || "Error sending link");
    }
  };

  // Step 2: Resend reset link
  const handleResendLink = async () => {
    setMessage(""); setError("");
    try {
      const res = await axios.post("http://localhost:5000/api/auth/resend-link", { email });
      setMessage(res.data.msg);
    } catch (err) {
      setError(err.response?.data?.msg || "Failed to resend link.");
    }
  };

  // Step 3: Reset password using token
  const handleResetPassword = async () => {
    setMessage(""); setError("");
    try {
      const res = await axios.post("http://localhost:5000/api/auth/reset-password", { token, newPassword });
      setMessage(res.data.msg);
    } catch (err) {
      setError(err.response?.data?.msg || "Failed to reset password.");
    }
  };

  return (
    <div className="auth-container">
      <h2>Forgot Password</h2>

      {message && <div style={{ color: "green" }}>{message}</div>}
      {error && <div className="error-msg">{error}</div>}

      {/* Step 1: Send reset link */}
      <form onSubmit={handleForgotPassword}>
        <input
          type="email"
          placeholder="Enter registered email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Send Reset Link</button>
      </form>

      <button type="button" onClick={handleResendLink} style={{ marginTop: "10px" }}>
        Resend Reset Link
      </button>

      {/* Step 3: Reset password */}
      <div style={{ marginTop: "20px" }}>
        <input
          type="text"
          placeholder="Enter received token"
          value={token}
          onChange={(e) => setToken(e.target.value)}
        />
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button type="button" onClick={handleResetPassword}>Reset Password</button>
      </div>

      <p><Link to="/">Back to Login</Link></p>
    </div>
  );
};

export default ForgotPassword;
