
import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./NavBar.css"; 

function NavBar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="nav-header">
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
          <Link className={isActive("/login") ? "active" : ""} to="/login">
            Login
          </Link>
        </div>
      </div>
    </header>
  );
}

export default NavBar;
