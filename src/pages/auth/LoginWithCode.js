import React, { useState } from "react";
import "./Auth.css";
import Card from "../../components/card/Card";
import { GrInsecure } from "react-icons/gr";
import { Link } from "react-router-dom";

const LoginWithCode = () => {
  const [loginCode, setLoginCode] = useState("");

  const loginUser = () => {};
  return (
    <div className="container">
      <Card>
        <div className="--form-small">
          <div className="--flex-center">
            <GrInsecure size={35} color="#999" />
          </div>
          <h2 className="--text-center --login-text">Enter Access Code</h2>

          <form onSubmit={loginUser}>
            <input
              type="text"
              placeholder="Access Code"
              required
              name="loginCode"
              value={loginCode}
              onChange={(e) => setLoginCode(e.target.value)}
              className="--login-input"
            />
            <button
              type="submit"
              className="--btn --btn-primary --btn-block --btn-login"
            >
              Proceed to Login
            </button>
            <span className="--flex-center">
              Check your email for login access code
            </span>
          </form>
          <span className="--link-bottom">
            <p>
              <Link to="/">- Home</Link>
            </p>
            <p className="v-link --color-primary">
              <b>Resend Code</b>
            </p>
          </span>
        </div>
      </Card>
    </div>
  );
};

export default LoginWithCode;
