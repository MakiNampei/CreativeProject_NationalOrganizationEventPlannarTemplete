import React, { useState } from "react";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    alert(
      `Login clicked for user "${username}". Backend connection will be added later.`
    );
  }

  return (
    <div className="card" style={{ maxWidth: "400px", margin: "0 auto" }}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit} className="form">
        <label>
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>

        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        <button type="submit">Log in</button>
      </form>
      <p style={{ color: "#9ca3af", fontSize: "0.85rem", marginTop: "8px" }}>
        For now this is just a front-end form. Later we will call the backend
        auth API.
      </p>
    </div>
  );
}

export default LoginPage;
