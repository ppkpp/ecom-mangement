import React, { useState } from "react";
import "../assets/styles/sidebar.css"; // Custom styles
import ReactLogo from "/app.webp";
import {
  FaSignOutAlt,
  FaHome,
  FaListAlt,
  FaProductHunt,
  FaNewspaper,
  FaUsers,
  FaRegBell,
  FaPhotoVideo,
  FaImage,
  FaImages,
  FaUserAltSlash,
  FaUserFriends,
  FaUserAstronaut,
  FaUserCog,
  FaUsersCog,
} from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";

export const SideBar = ({ isActive, logout }) => {
  // Access logout function from the auth context

  return (
    <>
      {/* Sidebar */}
      <nav id="sidebar" className={isActive ? "active" : ""}>
        <div className="p-4 pt-5">
          {/* Logo */}
          <a
            href="#"
            className="img logo rounded-circle mb-5"
            style={{ backgroundImage: `url(${ReactLogo})` }}
          ></a>

          {/* Sidebar Menu */}
          <ul className="list-unstyled components mb-5">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                <FaHome className="me-2" /> Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/category"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                <FaListAlt className="me-2" /> Category
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/product"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                <FaProductHunt className="me-2" /> Product
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/banner"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                <FaNewspaper className="me-2" /> Banners
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/orders"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                <FaListAlt className="me-2" /> Orders***
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/notification"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                <FaRegBell className="me-2" /> Notification
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/customer"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                <FaUserAstronaut className="me-2" /> Customers***
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/user"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                <FaUserCog className="me-2" /> Users
              </NavLink>
            </li>

            <li>
              <button
                className="nav-link btn btn-link text-start"
                onClick={() => logout()}
              >
                <FaSignOutAlt className="me-2" /> Logout
              </button>
            </li>
          </ul>

          {/* Footer */}
          <div className="footer"></div>
        </div>
      </nav>

      {/* Page Content */}
    </>
  );
};
