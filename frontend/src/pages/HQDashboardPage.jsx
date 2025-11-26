import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config";

function HQDashboardPage() {
  const [requests, setRequests] = useState([]); // Initialize as empty array
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    fetch(`${API_BASE_URL}/requests`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        // If user is not authorized (401) or forbidden (403)
        if (res.status === 401 || res.status === 403) {
          alert("Access Denied: You must be an HQ Admin to view this page.");
          navigate("/"); // Redirect to Home
          return null;
        }
        return res.json();
      })
      .then((data) => {
        // Safety Check: Only update state if data is an array
        if (data && Array.isArray(data)) {
          setRequests(data);
        } else if (data) {
          // If data is null (from the redirect above), do nothing
          // If data is an error object, log it
          console.log("Non-array data received:", data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [navigate]);

  async function handleUpdateStatus(id, newStatus) {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${API_BASE_URL}/requests/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        setRequests((prev) =>
          prev.map((r) => (r._id === id ? { ...r, status: newStatus } : r))
        );
      }
    } catch (err) {
      alert("Error updating status");
    }
  }

  if (loading) return <p style={{ padding: "20px" }}>Loading Dashboard...</p>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>HQ Dashboard</h1>
        <button 
          onClick={() => { localStorage.clear(); navigate('/login'); }}
          style={{ cursor: "pointer", padding: "6px 12px" }}
        >
          Logout
        </button>
      </div>
      
      <p style={{ color: "#9ca3af", fontSize: "0.9rem" }}>
        Here HQ users can review collaboration requests.
      </p>

      <div className="list">
        {requests.length === 0 && <p>No requests found (or access denied).</p>}

        {requests.map((r) => (
          <div key={r._id} className="card">
            <h2>{r.fromOrgName}</h2>
            <p>
              <strong>Event:</strong> {r.eventId ? r.eventId.title : "Unknown event"}
            </p>
            <p>
              <strong>Contact:</strong> {r.fromContactEmail}
            </p>
            <p>{r.message}</p>
            <p>
              <strong>Status:</strong> {r.status}
            </p>
            {r.status === 'pending' && (
              <div style={{ marginTop: '10px' }}>
                <button onClick={() => handleUpdateStatus(r._id, "approved")}>
                  Approve
                </button>
                <button
                  style={{ marginLeft: "8px" }}
                  onClick={() => handleUpdateStatus(r._id, "rejected")}
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default HQDashboardPage;