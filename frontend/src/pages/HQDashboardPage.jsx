import React, { useState } from "react";
import { mockRequests } from "../data/mockRequests";
import { mockEvents } from "../data/mockEvents";

function findEventTitle(eventId) {
  const ev = mockEvents.find((e) => e.id === eventId);
  return ev ? ev.title : "Unknown event";
}

function HQDashboardPage() {
  const [requests, setRequests] = useState(mockRequests);

  function handleUpdateStatus(id, newStatus) {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
    );
  }

  return (
    <div>
      <h1>HQ Dashboard</h1>
      <p style={{ color: "#9ca3af", fontSize: "0.9rem" }}>
        Here HQ users can review collaboration requests (mock data for now).
      </p>

      <div className="list">
        {requests.map((r) => (
          <div key={r.id} className="card">
            <h2>{r.fromOrgName}</h2>
            <p>
              <strong>Event:</strong> {findEventTitle(r.eventId)}
            </p>
            <p>
              <strong>Contact:</strong> {r.fromContactEmail}
            </p>
            <p>{r.message}</p>
            <p>
              <strong>Status:</strong> {r.status}
            </p>
            <button onClick={() => handleUpdateStatus(r.id, "approved")}>
              Approve
            </button>
            <button
              style={{ marginLeft: "8px" }}
              onClick={() => handleUpdateStatus(r.id, "rejected")}
            >
              Reject
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HQDashboardPage;
