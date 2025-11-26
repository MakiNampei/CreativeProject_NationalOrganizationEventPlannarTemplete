import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config";

function LoginPage() {
  const [isSignup, setIsSignup] = useState(false); // Toggle state
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    
    // Determine endpoint based on mode
    const endpoint = isSignup ? "/auth/signup" : "/auth/login";

    try {
      const res = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Action failed");
      }

      // If Signup successful, auto-login or ask to login
      if (isSignup) {
        alert("Account created! You are now logged in.");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      if (data.user.role === "hq_admin") {
        navigate("/hq");
      } else {
        navigate("/");
      }
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <div className="card" style={{ maxWidth: "400px", margin: "40px auto" }}>
      <h1 style={{ textAlign: "center" }}>{isSignup ? "Create Account" : "Login"}</h1>
      
      <form onSubmit={handleSubmit} className="form" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <label style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ padding: "8px", borderRadius: "6px", border: "1px solid #475569", background: "#1e293b", color: "white" }}
            required
          />
        </label>

        <label style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ padding: "8px", borderRadius: "6px", border: "1px solid #475569", background: "#1e293b", color: "white" }}
            required
          />
        </label>

        <button 
          type="submit"
          style={{ padding: "10px", borderRadius: "6px", border: "none", background: "#38bdf8", color: "#0f172a", fontWeight: "bold", cursor: "pointer" }}
        >
          {isSignup ? "Sign Up" : "Log in"}
        </button>
      </form>

      <div style={{ marginTop: "16px", textAlign: "center", fontSize: "0.9rem" }}>
        {isSignup ? "Already have an account?" : "Need an account?"}{" "}
        <button
          onClick={() => setIsSignup(!isSignup)}
          style={{ background: "none", border: "none", color: "#38bdf8", cursor: "pointer", textDecoration: "underline" }}
        >
          {isSignup ? "Log in here" : "Sign up here"}
        </button>
      </div>

      {!isSignup && (
        <p style={{ color: "#9ca3af", fontSize: "0.85rem", marginTop: "16px", textAlign: "center" }}>
          (Hint: Use <strong>admin</strong> / <strong>123456</strong>)
        </p>
      )}
    </div>
  );
}

export default LoginPage;