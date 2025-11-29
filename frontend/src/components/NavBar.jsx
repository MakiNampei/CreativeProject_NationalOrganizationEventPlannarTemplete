import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./NavBar.css"; 

function NavBar() {
  const location = useLocation();

  const [dark, setDark] = useState(true);

  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("light-mode", !dark);
  }, [dark]);

   useEffect(() => {
    const audio = document.getElementById("bgm-audio");
    if (!audio) return;

    audio.volume = 0.4;

    audio
      .play()
      .then(() => {
        setIsPlaying(true);
      })
      .catch(() => {
        setIsPlaying(false);
      });
  }, []);
  const isActive = (path) => location.pathname === path;

  function handleToggleDark() {
    setDark((prev) => !prev);
  }

  function handleToggleBgm() {
    const audio = document.getElementById("bgm-audio");
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.log("Audio play blocked:", err);
        });
    }
  }

  return (
    <header className="nav-header">
      <audio id="bgm-audio" loop>
        <source src="/bgm.mp3" type="audio/mpeg" />
      </audio>
      <div className="nav-inner">
        <div className="nav-logo">
          <span>OrgMap</span>
        </div>
        <nav className="nav-links">
          <Link className={isActive("/") ? "active" : ""} to="/">
            Home
          </Link>
          <Link className={isActive("/map") ? "active" : ""} to="/map">
            Map
          </Link>
          <Link className={isActive("/events") ? "active" : ""} to="/events">
            Events
          </Link>
          <Link className={isActive("/hq") ? "active" : ""} to="/hq">
            HQ Dashboard
          </Link>
        </nav>
        <div className="nav-auth">
          <button className="nav-toggle" onClick={handleToggleDark}>
            {dark ? "☾ Dark" : "☀ Light"}
          </button>
          <button className="nav-toggle bgm-btn" onClick={handleToggleBgm}>
            {isPlaying ? "⏸ BGM" : "▶ BGM"}
          </button>
          <Link className={isActive("/login") ? "active" : ""} to="/login">
            Login
          </Link>
        </div>
      </div>
    </header>
  );
}

export default NavBar;
