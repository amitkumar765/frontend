import React, { useEffect, useState } from "react";
import Card from "../../components/card/Card";
import "./ChangePassword.css";
import PageMenu from "../../components/pageMenu/PageMenu";
import PasswordInput from "../../components/passwordInput/PasswordInput";
import { FaTimes } from "react-icons/fa";
import { BsCheck2All } from "react-icons/bs";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  changePassword,
  logout,
  RESET,
} from "../../redux/features/auth/authSlice";
import { Spinner } from "../../components/loader/Loader";
import { sendAutomatedEmail } from "../../redux/features/email/emailSlice";

const initialState = {
  oldPassword: "",
  password: "",
  password2: "",
};

const ChangePassword = () => {
  useRedirectLoggedOutUser("/login");
  const [formData, setFormData] = useState(initialState);
  const { oldPassword, password, password2 } = formData;

  const [sCase, setSCase] = useState(false);
  const [uCase, setUCase] = useState(false);
  const [num, setNum] = useState(false);
  const [sChar, setSChar] = useState(false);
  const [passLength, setPassLength] = useState(false);

  const { isLoading, user } = useSelector(
    (state) => state.auth //auth coming from authSlice file i.e. name: "auth"
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const timesIcon = <FaTimes color="red" size={15} />;
  const checkIcon = <BsCheck2All color="green" size={15} />;

  const switchIcon = (condition) => {
    if (condition) {
      return checkIcon;
    }
    return timesIcon;
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const updatePassword = async (e) => {
    e.preventDefault();

    if (!oldPassword || !password || !password2) {
      return toast.error("Password do not match.");
    }

    if (password !== password2) {
      return toast.error("All fields are required.");
    }

    const userData = {
      oldPassword,
      password,
    };

    // const emailData = {
    //   subject: "Password changed - AUTH:A",
    //   send_to: user.email,
    //   reply_to: "noreply@sikkul.com",
    //   template: "changePassword",
    //   url: "/forgot",
    // };

    await dispatch(changePassword(userData));
    // await dispatch(sendAutomatedEmail(emailData));
    await dispatch(logout());
    await dispatch(RESET(userData));
    navigate("/login");
  };

  return (
    <>
      <section className="--profile-section">
        <div className="--container-profile4">
          <PageMenu />
          <h2 className="--profile-h2">Change Password</h2>

          <div className="--profile-sub-container --change-password">
            <Card cardClass={"card5"}>
              <>
                <form onSubmit={updatePassword} className="--profile-form2">
                  <p>
                    <label>Current Password:</label>
                    <PasswordInput
                      placeholder="Current Password"
                      name="oldPassword"
                      value={oldPassword}
                      onChange={handleInputChange}
                    />
                  </p>
                  <p>
                    <label>New Password:</label>
                    <PasswordInput
                      placeholder="New Password"
                      name="password"
                      value={password}
                      onChange={handleInputChange}
                    />
                  </p>
                  <p>
                    <label>Confirm New Password:</label>
                    <PasswordInput
                      placeholder="Confirm New Password"
                      name="password2"
                      value={password2}
                      onChange={handleInputChange}
                    />
                  </p>

                  {/* Password Strength */}
                  <Card cardClass="group">
                    <ul className="form-un-list --change-password">
                      <li className="form-list">
                        <span>New Password Must Be:</span>
                        <br />
                        <span className="indicator">
                          {switchIcon(sCase)}
                          &nbsp; Lowercase (a-z)
                        </span>
                      </li>
                      <li className="form-list">
                        <span className="indicator">
                          {switchIcon(uCase)}
                          &nbsp; Uppercase (A-Z)
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

                  {isLoading ? (
                    <Spinner />
                  ) : (
                    <button
                      type="submit"
                      className="--btn --btn-danger --btn-block"
                    >
                      Change Password
                    </button>
                  )}
                </form>
              </>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
};

export default ChangePassword;
