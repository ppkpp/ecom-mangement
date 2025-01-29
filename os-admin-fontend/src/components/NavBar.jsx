import React from "react";
import { NavLink } from "react-router-dom";
import { FaBars, FaBell, FaSignOutAlt, FaUser } from "react-icons/fa";

export const NavBar = ({ user,toggleSidebar, logout }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div className="container-fluid">
        {/* Sidebar Toggle Button */}
        <button
          type="button"
          id="sidebarCollapse"
          className="btn sidebar-toggle "
          onClick={toggleSidebar}
        >
          <FaBars className="icon" />
        </button>
        {/* Title in the Toolbar */}
        <div className="d-flex align-items-center ms-3">
          <p className="user-title m-0 fw-bold">{user.username}</p>
          <p className="user-role m-0 ms-2 text-muted">({user.role})</p>
        </div>
        {/* Navigation Links */}
        <div className="collapse navbar-collapse">
          <ul className="nav navbar-nav ms-auto">
            {/* Notification Icon with Badge */}
            <li className="nav-item position-relative">
              <NavLink
                to="/order-noti"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                <FaBell className="icon me-3" />
                <span className="badge">1</span>
              </NavLink>
            </li>

            {/* Profile */}
            <li className="nav-item">
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                <FaUser className="icon me-3" />
              </NavLink>
            </li>

            {/* Logout */}
            <li className="nav-item">
              <button className="nav-link logout-btn" onClick={logout}>
                <FaSignOutAlt className="icon logout-icon me-3" />
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
