import React from "react";
import { FaCircleCheck } from "react-icons/fa6";
import "./changePassSuc.css";
import Footer from "../../components/footer/Footer";

const ChangePassSuc = () => {
  return (
    <>
      <div className="middle-container">
        <div className="logo">
          <FaCircleCheck className="thick_logo" />
        </div>
        <h3>Password change successful!</h3>
        <p>Your account password Change successful. Please re-login.</p>
        <p>Have a great day.</p>
        <Footer />
      </div>
    </>
  );
};

export default ChangePassSuc;
