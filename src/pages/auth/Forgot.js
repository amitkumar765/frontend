import React, { useState } from "react";
import "./Auth.css";
import Card from "../../components/card/Card";
import { AiOutlineMail } from "react-icons/ai";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { validateEmail } from "../../redux/features/auth/authServices";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword, RESET } from "../../redux/features/auth/authSlice";
import Loader from "../../components/loader/Loader";

const Forgot = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  const { isLoading } = useSelector(
    (state) => state.auth //auth coming from authSlice file i.e. name: "auth"
  );

  const forgot = async (e) => {
    e.preventDefault();

    if (!email) {
      return toast.error("Please enter your email.");
    }
    if (!validateEmail(email)) {
      return toast.error("Please enter a valid email.");
    }

    const userData = {
      email,
    };

    await dispatch(forgotPassword(userData));
    await dispatch(RESET(userData));
  };
  return (
    <div className="container">
      {isLoading && <Loader />}
      <Card>
        <div className="--form-small">
          <div className="--flex-center">
            <AiOutlineMail size={35} color="#999" />
          </div>
          <h2 className="--text-center --login-text">Forgot Password</h2>

          <form onSubmit={forgot}>
            <input
              type="email"
              placeholder="Email"
              required
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="--login-input"
            />
            <button
              type="submit"
              className="--btn --btn-primary --btn-block --btn-login"
            >
              Get Reset Email
            </button>
          </form>
          <span className="--link-bottom">
            <Link to="/">- Home</Link>
            <Link to="/login">- Login</Link>
          </span>
        </div>
      </Card>
    </div>
  );
};

export default Forgot;
