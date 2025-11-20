import React from "react";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="app-header">
        <h1>National Chapters Map</h1>
        <p>
          Explore where our organization has chapters across universities, and
          see their events & collaboration opportunities.
        </p>
      </header>

      <main className="app-main">
        <section className="card">
          <h2>1. Map of Universities</h2>
          <p>
            Here we will show a map with markers for each university that has a
            chapter (React + map API).
          </p>
        </section>

        <section className="card">
          <h2>2. Upcoming Events</h2>
          <p>
            We will list upcoming events from different chapters, with time,
            place, and whether they are open for collaboration.
          </p>
        </section>

        <section className="card">
          <h2>3. HQ Dashboard</h2>
          <p>
            HQ users can log in, see all collaboration requests, and approve or
            reject them.
          </p>
        </section>
      </main>

      <footer className="app-footer">
        <small> 2025 National Student Organization</small>
      </footer>
    </div>
  );
}

export default App;
