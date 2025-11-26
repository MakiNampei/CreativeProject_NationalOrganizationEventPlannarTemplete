import React, { useState, useEffect } from "react";
import { API_BASE_URL } from "../config";

function formatDateTime(dateTimeStr) {
  const d = new Date(dateTimeStr);
  return d.toLocaleString();
}

function EventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // State to track which event card has the form open
  const [activeFormId, setActiveFormId] = useState(null);

  // Form states
  const [formData, setFormData] = useState({
    fromOrgName: "",
    fromContactEmail: "",
    message: "",
  });
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', or null

  useEffect(() => {
    fetch(`${API_BASE_URL}/events`)
      .then((res) => res.json())
      .then((data) => {
        setEvents(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching events:", err);
        setLoading(false);
      });
  }, []);

  const handleOpenForm = (eventId) => {
    setActiveFormId(eventId);
    setSubmitStatus(null);
    setFormData({ fromOrgName: "", fromContactEmail: "", message: "" });
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e, eventId) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE_URL}/requests`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventId,
          ...formData,
        }),
      });

      if (res.ok) {
        setSubmitStatus("success");
        setTimeout(() => setActiveFormId(null), 2000); // Close form after 2s
      } else {
        setSubmitStatus("error");
      }
    } catch (err) {
      setSubmitStatus("error");
    }
  };

  if (loading) return <p style={{ padding: "20px" }}>Loading Events...</p>;

  return (
    <div>
      <h1>Upcoming Events</h1>
      <p style={{ color: "#9ca3af", fontSize: "0.9rem" }}>
        These are upcoming events from different university chapters.
      </p>

      <div className="list">
        {events.map((ev) => (
          <div key={ev._id} className="card">
            <h2>{ev.title}</h2>
            <p>
              <strong>Chapter:</strong> {ev.chapterId?.schoolName || "Unknown"}
            </p>
            <p>
              <strong>Date & Time:</strong> {formatDateTime(ev.dateTime)}
            </p>
            <p>
              <strong>Location:</strong> {ev.location}
            </p>
            <p>{ev.description}</p>
            
            <div style={{ marginTop: "12px", borderTop: "1px solid rgba(148, 163, 184, 0.2)", paddingTop: "12px" }}>
              <strong>Open for collab:</strong>{" "}
              {ev.isOpenForCollab ? (
                <span style={{ color: "#4ade80", fontWeight: "bold" }}>Yes</span>
              ) : (
                <span style={{ color: "#94a3b8" }}>No</span>
              )}

              {/* Show Button if Open for Collab and form is not active */}
              {ev.isOpenForCollab && activeFormId !== ev._id && (
                <button
                  onClick={() => handleOpenForm(ev._id)}
                  style={{
                    display: "block",
                    marginTop: "10px",
                    background: "#38bdf8",
                    border: "none",
                    borderRadius: "6px",
                    padding: "8px 12px",
                    cursor: "pointer",
                    color: "#0f172a",
                    fontWeight: "600",
                  }}
                >
                  Request Collaboration
                </button>
              )}

              {/* Form Section */}
              {activeFormId === ev._id && (
                <form
                  onSubmit={(e) => handleSubmit(e, ev._id)}
                  style={{
                    marginTop: "15px",
                    background: "rgba(0,0,0,0.2)",
                    padding: "15px",
                    borderRadius: "8px",
                  }}
                >
                  <h4 style={{ margin: "0 0 10px 0" }}>Collaboration Request</h4>
                  
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    <input
                      type="text"
                      name="fromOrgName"
                      placeholder="Your Organization Name"
                      value={formData.fromOrgName}
                      onChange={handleInputChange}
                      required
                      style={{ padding: "8px", borderRadius: "4px", border: "none" }}
                    />
                    <input
                      type="email"
                      name="fromContactEmail"
                      placeholder="Contact Email"
                      value={formData.fromContactEmail}
                      onChange={handleInputChange}
                      required
                      style={{ padding: "8px", borderRadius: "4px", border: "none" }}
                    />
                    <textarea
                      name="message"
                      placeholder="Message (e.g. We want to sponsor food...)"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows="3"
                      style={{ padding: "8px", borderRadius: "4px", border: "none" }}
                    />
                    
                    <div style={{ display: "flex", gap: "10px" }}>
                      <button
                        type="submit"
                        style={{
                          background: "#22c55e",
                          color: "white",
                          border: "none",
                          padding: "8px 16px",
                          borderRadius: "4px",
                          cursor: "pointer",
                          fontWeight: "bold"
                        }}
                      >
                        Send Request
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveFormId(null)}
                        style={{
                          background: "transparent",
                          color: "#cbd5f5",
                          border: "1px solid #94a3b8",
                          padding: "8px 16px",
                          borderRadius: "4px",
                          cursor: "pointer",
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>

                  {submitStatus === "success" && (
                    <p style={{ color: "#4ade80", marginTop: "10px", fontWeight: "bold" }}>
                      Request sent successfully!
                    </p>
                  )}
                  {submitStatus === "error" && (
                    <p style={{ color: "#ef4444", marginTop: "10px", fontWeight: "bold" }}>
                      Error sending request.
                    </p>
                  )}
                </form>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EventsPage;