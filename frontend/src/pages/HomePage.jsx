import React from "react";

function HomePage() {
  return (
    <div>
      <h1>National Organization Chapters</h1>
      <p style={{ color: "#9ca3af", marginTop: "8px" }}>
        This app shows where a national organization (for example, Society of
        Women Engineers) has chapters at different universities. You can
        explore the map, see upcoming events, and manage collaboration
        requests from the HQ side.
      </p>

      <div className="card-grid">
        <div className="card">
          <h2>Map View</h2>
          <p>
            View all university chapters on an interactive map and click on a
            school to see more details.
          </p>
        </div>

        <div className="card">
          <h2>Events</h2>
          <p>
            Browse upcoming events from different chapters, including time,
            location, and if they are open for collaboration.
          </p>
        </div>

        <div className="card">
          <h2>HQ Dashboard</h2>
          <p>
            HQ users can log in to see incoming collaboration requests and
            decide whether to approve or reject them.
          </p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
