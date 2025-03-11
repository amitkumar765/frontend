import React, { useState, useEffect } from "react";
import "./Auth.css";
import Card from "../../components/card/Card";
import { MdPassword } from "react-icons/md";
import { Link, useNavigate, useParams } from "react-router-dom";
import PasswordInput from "../../components/passwordInput/PasswordInput";
import { FaTimes } from "react-icons/fa";
import { BsCheck2All } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/loader/Loader";
import { toast } from "react-toastify";
import {
  lowerCase,
  numbers,
  sChars,
  upperCase,
} from "../../redux/features/auth/authServices";
import { RESET, resetPassword } from "../../redux/features/auth/authSlice";

const initialState = {
  password: "",
  password2: "",
};

const Reset = () => {
  const [formData, setFormData] = useState(initialState);
  const { password, password2 } = formData;
  const { resetToken } = useParams();

  const [uCase, setUCase] = useState(false);
  const [num, setNum] = useState(false);
  const [sChar, setSChar] = useState(false);
  const [passLength, setPassLength] = useState(false);

  const { isLoading } = useSelector(
    (state) => state.auth //auth coming from authSlice file i.e. name: "auth"
  );

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

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Check Lowercase and Uppercase
    if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) {
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

  const reset = async (e) => {
    e.preventDefault();

    if (!password || !password2) {
      return toast.error("All fields are required.");
    }
    if (password.length < 8) {
      return toast.error("Password must have at least 8 characters.");
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
      password,
    };

    await dispatch(resetPassword({ userData, resetToken }));
    navigate("/changePassSuc");
    dispatch(RESET());
  };

  return (
    <div className="container">
      {isLoading && <Loader />}

      <Card>
        <div className="--form-small">
          <div className="--flex-center">
            <MdPassword size={35} color="#999" />
          </div>
          <h2 className="--text-center --login-text">Reset Password</h2>

          <form onSubmit={reset}>
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
            />

            {/* Password Strength */}
            <Card cardClass="group">
              <ul className="form-un-list">
                <li className="form-list">
                  <span className="indicator">
                    {switchIcon(uCase)}
                    &nbsp; Lowercase & Uppercase
                  </span>
                </li>
                <li className="form-list">
                  <span className="indicator">
                    {switchIcon(num)}
                    &nbsp; Number (0-9)
                  </span>
                </li>
                <li className="form-list">
                  <span className="indicator">
                    {switchIcon(sChar)}
                    &nbsp; Special Character (!@#$%^&*)
                  </span>
                </li>
                <li className="form-list">
                  <span className="indicator">
                    {switchIcon(passLength)}
                    &nbsp; At least 8 Character
                  </span>
                </li>
              </ul>
            </Card>
            <button
              type="submit"
              className="--btn --btn-primary --btn-block --btn-login"
            >
              Reset Password
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

export default Reset;
