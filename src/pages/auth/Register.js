import React, { useEffect, useState } from "react";
import "./Auth.css";
import Card from "../../components/card/Card";
import { TiUserAddOutline } from "react-icons/ti";
import { FaTimes } from "react-icons/fa";
import { BsCheck2All } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "../../components/passwordInput/PasswordInput";
import { toast } from "react-toastify";
import {
  lowerCase,
  numbers,
  sChars,
  upperCase,
  validateEmail,
} from "../../redux/features/auth/authServices";
import { useDispatch, useSelector } from "react-redux";
import {
  register,
  RESET,
  sendVerificationEmail,
} from "../../redux/features/auth/authSlice";
import Loader from "../../components/loader/Loader";

const initialState = {
  name: "",
  email: "",
  password: "",
  password2: "",
};

const Register = () => {
  const [formData, setFormData] = useState(initialState);
  const { name, email, password, password2 } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, isLoggedIn, isSuccess, message } = useSelector(
    (state) => state.auth //auth coming from authSlice file i.e. name: "auth"
  );

  const [uCase, setUCase] = useState(false);
  const [sCase, setSCase] = useState(false);
  const [num, setNum] = useState(false);
  const [sChar, setSChar] = useState(false);
  const [passLength, setPassLength] = useState(false);

  const timesIcon = <FaTimes color="red" size={15} />;
  const checkIcon = <BsCheck2All color="green" size={15} />;

  const switchIcon = (condition) => {
    if (condition) {
      return checkIcon;
    }
    return timesIcon;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    // Check Lowercase
    if (password.match(/([a-z])/)) {
      setSCase(true);
    } else {
      setSCase(false);
    }
    // Check Uppercase
    if (password.match(/([A-Z])/)) {
      setUCase(true);
    } else {
      setUCase(false);
    }
    // Check for Numbers
    if (password.match(/([0-9])/)) {
      setNum(true);
    } else {
      setNum(false);
    }
    // Check for Special Character
    if (
      password.match(
        /([!,%,&,@,#,},",',{,<,>,|,;,:,.,$,`,=,+,[,(,),^,*,?,_,~])/
      )
    ) {
      setSChar(true);
    } else {
      setSChar(false);
    }
    // Check for Password Length
    if (password.length > 7) {
      setPassLength(true);
    } else {
      setPassLength(false);
    }
  }, [password]);

  const registerUser = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !password2) {
      return toast.error("All fields are required.");
    }
    if (password.length < 8) {
      return toast.error("Password must have at least 8 characters.");
    }
    if (!validateEmail(email)) {
      return toast.error("Please enter a valid email.");
    }
    if (password !== password2) {
      return toast.error("Both password must have same.");
    }
    if (!lowerCase(password)) {
      return toast.error("Password must have lowercase (a-z).");
    }
    if (!upperCase(password)) {
      return toast.error("Password must have uppercase (A-Z).");
    }
    if (!numbers(password)) {
      return toast.error("Password must have number (0-9).");
    }
    if (!sChars(password)) {
      return toast.error("Password must have special character (!@#$%^&*).");
    }

    const userData = {
      name,
      email,
      password,
    };
    await dispatch(register(userData));
    await dispatch(sendVerificationEmail());
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
            <TiUserAddOutline size={35} color="#999" />
          </div>
          <h2 className="--text-center --login-text">Register</h2>

          <form onSubmit={registerUser}>
            <input
              type="text"
              placeholder="Name"
              required
              name="name"
              value={name}
              onChange={handleInputChange}
              className="--login-input"
            />
            <input
              type="text"
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
            <PasswordInput
              placeholder="Confirm Password"
              name="password2"
              value={password2}
              onChange={handleInputChange}
              onPaste={(e) => {
                e.preventDefault();
                toast.error("Cannot paste into input field.");
                return false;
              }}
            />

            {/* Password Strength */}
            <Card cardClass="group">
              <ul className="form-un-list">
                <li className="form-list">
                  <span>Password must have:</span>
                  <br />
                  <span className="indicator">
                    {switchIcon(sCase)}
                    &nbsp; Lowercase (a-z).
                  </span>
                </li>
                <li className="form-list">
                  <span className="indicator">
                    {switchIcon(uCase)}
                    &nbsp; Uppercase (A-Z).
                  </span>
                </li>
                <li className="form-list">
                  <span className="indicator">
                    {switchIcon(num)}
                    &nbsp; Number (0-9).
                  </span>
                </li>
                <li className="form-list">
                  <span className="indicator">
                    {switchIcon(sChar)}
                    &nbsp; Special Character (!@#$%^&*).
                  </span>
                </li>
                <li className="form-list">
                  <span className="indicator">
                    {switchIcon(passLength)}
                    &nbsp; At least 8 Characters.
                  </span>
                </li>
              </ul>
            </Card>

            <button type="submit" className="--btn --btn-primary --btn-block">
              Register
            </button>
          </form>

          <span className="register">
            <Link to="/">Home</Link>
            <p>&nbsp; Already have an account? &nbsp;</p>
            <Link to="/login">Login</Link>
          </span>
        </div>
      </Card>
    </div>
  );
};

export default Register;
