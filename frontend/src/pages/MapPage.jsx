import React, { useState, useEffect } from "react";
import MapView from "../components/MapView";
import { API_BASE_URL } from "../config";

function MapPage() {
  // Initialize with empty array [] so it's never undefined
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/chapters`)
      .then((res) => res.json())
      .then((data) => {
        // Safety Check: If backend sends an error, don't break the app
        if (Array.isArray(data)) {
          setChapters(data);
        } else {
          console.error("Data error:", data);
          setChapters([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p style={{ padding: "20px" }}>Loading Map...</p>;

  return (
    <div>
      <h1>Chapters Map</h1>
      <p style={{ color: "#9ca3af", fontSize: "0.9rem" }}>
        Explore where this organization has chapters across universities.
        Click on a marker to view chapter details.
      </p>

      <MapView chapters={chapters} />
    </div>
  );
}

export default MapPage;