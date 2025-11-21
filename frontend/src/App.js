import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import MapPage from "./pages/MapPage";
import EventsPage from "./pages/EventsPage";
import ChapterDetailPage from "./pages/ChapterDetailPage";
import LoginPage from "./pages/LoginPage";
import HQDashboardPage from "./pages/HQDashboardPage";

function App() {
  return (
    <div className="App">
      <NavBar />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/chapters/:id" element={<ChapterDetailPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/hq" element={<HQDashboardPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
