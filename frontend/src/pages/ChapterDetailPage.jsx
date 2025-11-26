import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { API_BASE_URL } from "../config";

function ChapterDetailPage() {
  const { id } = useParams();
  const [chapter, setChapter] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Fetch Chapter Details
        const chapterRes = await fetch(`${API_BASE_URL}/chapters/${id}`);
        const chapterData = await chapterRes.json();

        if (!chapterRes.ok) {
          throw new Error(chapterData.message || "Failed to fetch chapter");
        }
        setChapter(chapterData);

        // 2. Fetch Events for this chapter
        const eventsRes = await fetch(`${API_BASE_URL}/events?chapterId=${id}`);
        const eventsData = await eventsRes.json();

        // Safety Check: Ensure eventsData is actually an array
        if (Array.isArray(eventsData)) {
          setEvents(eventsData);
        } else {
          console.error("Events API returned non-array:", eventsData);
          setEvents([]); // Fallback to empty array
        }
      } catch (err) {
        console.error("Error loading chapter details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <p style={{ padding: "20px" }}>Loading...</p>;
  if (!chapter) return <p style={{ padding: "20px" }}>Chapter not found.</p>;

  return (
    <div>
      <h1>{chapter.organizationId?.name || "Org"} @ {chapter.schoolName}</h1>
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
              <li key={ev._id}>
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