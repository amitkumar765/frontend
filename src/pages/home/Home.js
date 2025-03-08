import React from "react";
import "./Home.css";
import loginImg from "../../assets/login.svg";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <section className="container hero">
        <div className="hero-text">
          <h2>Ultimate MERN Stack Authentication System</h2>
          <p>
            Learn and Master Authentication and Authorization using MERN Stack.
          </p>
          <p>
            Implement User Registration, Login, Password Reset, Social Login,
            User Permission, Email Notification etc.
          </p>
          <div className="hero-buttons --flex-start">
            <button className="--btn --btn-danger">
              <Link to="/register" className="--btn --btn-danger">
                Register
              </Link>
            </button>
            <button className="--btn --btn-primary">
              <Link to="/login" className="--btn --btn-primary">
                Login
              </Link>
            </button>
          </div>
        </div>
        <div className="hero-image">
          <img src={loginImg} alt="Auth" />
        </div>
      </section>
    </div>
  );
}

export default Home;
