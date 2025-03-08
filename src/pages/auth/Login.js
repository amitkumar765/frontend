import React, { useEffect, useState } from "react";
import "./Auth.css";
import Card from "../../components/card/Card";
import { BiLogIn } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "../../components/passwordInput/PasswordInput";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { validateEmail } from "../../redux/features/auth/authServices";
import { login, RESET } from "../../redux/features/auth/authSlice";
import Loader from "../../components/loader/Loader";

const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  const [formData, setFormData] = useState(initialState);
  const { email, password } = formData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, isLoggedIn, isSuccess } = useSelector(
    (state) => state.auth //auth coming from authSlice file i.e. name: "auth"
  );

  const loginUser = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return toast.error("All fields are required.");
    }
    if (!validateEmail(email)) {
      return toast.error("Please enter a valid email.");
    }

    const userData = {
      email,
      password,
    };
    await dispatch(login(userData));
  };

  useEffect(() => {
    if (isSuccess && isLoggedIn) {
      navigate("/profile");
    }

    dispatch(RESET());
  }, [isLoggedIn, isSuccess, dispatch, navigate]);

  return (
    <div className="container">
      {isLoading && <Loader />}
      <Card>
        <div className="form">
          <div className="--flex-center">
            <BiLogIn size={35} color="#999" />
          </div>
          <h2 className="--text-center --login-text">Login</h2>
          <div className="--flex-center">
            <button className="--btn --btn-google">Login With Google</button>
          </div>
          <br />
          <p className="--text-center --fw-bold">or</p>
          <br />

          <form onSubmit={loginUser}>
            <input
              type="email"
              placeholder="Email"
              required
              name="email"
              value={email}
              onChange={handleInputChange}
              className="--login-input"
            />
            <PasswordInput
              placeholder="Password"
              name="password"
              value={password}
              onChange={handleInputChange}
            />
            <button
              type="submit"
              className="--btn --btn-primary --btn-block --btn-login"
            >
              Login
            </button>
          </form>
          <Link to="/forgot">Forgot Password</Link>
          <span className="register">
            <Link to="/">Home</Link>
            <p>&nbsp; Don't have an account? &nbsp;</p>
            <Link to="/register">Register</Link>
          </span>
        </div>
      </Card>
    </div>
  );
};

export default Login;
