import React from "react";
import { useParams } from "react-router-dom";
import { mockChapters } from "../data/mockChapters";
import { mockEvents } from "../data/mockEvents";

function ChapterDetailPage() {
  const { id } = useParams();

  const chapter = mockChapters.find((c) => c.id === id);
  const events = mockEvents.filter((e) => e.chapterId === id);

  if (!chapter) {
    return <p>Chapter not found.</p>;
  }

  return (
    <div>
      <h1>{chapter.organizationName} @ {chapter.schoolName}</h1>
      <p style={{ color: "#9ca3af" }}>
        {chapter.city}, {chapter.state}
      </p>

      <section className="card">
        <h2>Chapter History</h2>
        <p>{chapter.history}</p>
      </section>

      <section className="card">
        <h2>Upcoming Events</h2>
        {events.length === 0 ? (
          <p>No upcoming events for this chapter.</p>
        ) : (
          <ul>
            {events.map((ev) => (
              <li key={ev.id}>
                <strong>{ev.title}</strong> – {new Date(ev.dateTime).toLocaleString()}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

export default ChapterDetailPage;
