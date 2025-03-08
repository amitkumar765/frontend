import React from "react";
import "./Header.css";
import { BiLogIn } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout, RESET } from "../../redux/features/auth/authSlice";
import { ShowOnLogin, ShowOnLogout } from "../protect/hiddenLink";
import { UserName } from "../../pages/profile/Profile";

const Header = () => {
  const location = useLocation();

  // Function to check if the link is active (if the current path matches one of the desired paths)
  const checkActive = (match, location) => {
    // Check if the link matches either /profile or /changePassword or /users
    return (
      location.pathname === "/profile" ||
      location.pathname === "/changePassword" ||
      location.pathname === "/users"
    );
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const goHome = () => {
    navigate("/");
  };

  const logoutUser = async () => {
    dispatch(RESET());
    await dispatch(logout());
    navigate("/");
  };

  return (
    <header className="header">
      <nav>
        <div className="logo" onClick={goHome}>
          <BiLogIn size={35} />
          <span className="text">AUTH:A</span>
        </div>
        <ul className="home-links">
          <ShowOnLogin>
            <li className="--flex-center">
              <FaUserCircle size={20} color="white" />
              <UserName />
            </li>
          </ShowOnLogin>
          <ShowOnLogout>
            <li>
              <button className="--btn-nav --btn-primary">
                <Link to="/login" className="login">
                  Login
                </Link>
              </button>
            </li>
          </ShowOnLogout>
          <ShowOnLogin>
            <li className="profile">
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  isActive || checkActive(null, location)
                    ? "--profile active"
                    : "--profile"
                }
              >
                Profile
              </NavLink>
            </li>
            <li className="profile ">
              <NavLink
                to="/changePassword"
                className={({ isActive }) =>
                  isActive || checkActive(null, location)
                    ? "--profile active"
                    : "--profile"
                }
              ></NavLink>
            </li>
            <li className="profile ">
              <NavLink
                to="/users"
                className={({ isActive }) =>
                  isActive || checkActive(null, location)
                    ? "--profile active"
                    : "--profile"
                }
              ></NavLink>
            </li>

            <li>
              <button
                onClick={logoutUser}
                className="--btn-nav --btn-secondary"
              >
                Logout
              </button>
            </li>
          </ShowOnLogin>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
