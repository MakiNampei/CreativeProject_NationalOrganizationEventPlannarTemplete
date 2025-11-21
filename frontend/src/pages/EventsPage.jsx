import React from "react";
import { mockEvents } from "../data/mockEvents";
import { mockChapters } from "../data/mockChapters";

function formatDateTime(dateTimeStr) {
  const d = new Date(dateTimeStr);
  return d.toLocaleString();
}

function findChapterName(chapterId) {
  const ch = mockChapters.find((c) => c.id === chapterId);
  return ch ? ch.schoolName : "Unknown chapter";
}

function EventsPage() {
  const sortedEvents = [...mockEvents].sort(
    (a, b) => new Date(a.dateTime) - new Date(b.dateTime)
  );

  return (
    <div>
      <h1>Upcoming Events</h1>
      <p style={{ color: "#9ca3af", fontSize: "0.9rem" }}>
        These are upcoming events from different university chapters.
      </p>

      <div className="list">
        {sortedEvents.map((ev) => (
          <div key={ev.id} className="card">
            <h2>{ev.title}</h2>
            <p>
              <strong>Chapter:</strong> {findChapterName(ev.chapterId)}
            </p>
            <p>
              <strong>Date & Time:</strong> {formatDateTime(ev.dateTime)}
            </p>
            <p>
              <strong>Location:</strong> {ev.location}
            </p>
            <p>{ev.description}</p>
            <p>
              <strong>Open for collab:</strong>{" "}
              {ev.isOpenForCollab ? "Yes" : "No"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EventsPage;
