import React from "react";
import MapView from "../components/MapView";
import { mockChapters } from "../data/mockChapters";

function MapPage() {
  return (
    <div>
      <h1>Chapters Map</h1>
      <p style={{ color: "#9ca3af", fontSize: "0.9rem" }}>
        Explore where this organization has chapters across universities.
        Click on a marker to view chapter details.
      </p>

      <MapView chapters={mockChapters} />
    </div>
  );
}

export default MapPage;
