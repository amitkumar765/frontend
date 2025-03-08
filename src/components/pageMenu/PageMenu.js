import React from "react";
import { NavLink } from "react-router-dom";
import "./PageMenu.css";

// const activeLink = ({ isActive }) => (isActive ? "active" : "");

const PageMenu = () => {
  return (
    <nav className="--btn-google --mb --nav-menu">
      <ul className="home-links">
        <li className="profile ">
          <NavLink to="/profile" className="--profile --menu-link">
            Profile
          </NavLink>
        </li>
        <li className="profile ">
          <NavLink to="/changePassword" className="--profile --menu-link">
            Change Password
          </NavLink>
        </li>

        <li className="profile ">
          <NavLink to="/users" className="--profile --menu-link">
            Users
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default PageMenu;
