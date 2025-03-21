import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API_URL = `${BACKEND_URL}/api/users/`;

// Validate email
export const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

// Password lowercase
export const lowerCase = (password) => {
  return password.match(/([a-z])/);
};
// Password uppercase
export const upperCase = (password) => {
  return password.match(/([A-Z])/);
};
// Password number
export const numbers = (password) => {
  return password.match(/([0-9])/);
};
// Password special character
export const sChars = (password) => {
  return password.match(
    /([!,%,&,@,#,},",',{,<,>,|,;,:,.,$,`,=,+,[,(,),^,*,?,_,~])/
  );
};

// Register User
const register = async (userData) => {
  const response = await axios.post(API_URL + "register", userData);
  return response.data;
};

// Login User
const login = async (userData) => {
  const response = await axios.post(API_URL + "login", userData);
  return response.data;
};

// Logout User
const logout = async () => {
  const response = await axios.get(API_URL + "logout");
  return response.data.message;
};

// Get Login Status
const loginStatus = async () => {
  const response = await axios.get(API_URL + "loginStatus");
  return response.data;
};

// Get User Profile
const getUser = async () => {
  const response = await axios.get(API_URL + "getUser");
  return response.data;
};

//Update User Profile
const updateUser = async (userData) => {
  const response = await axios.patch(API_URL + "updateUser", userData);
  return response.data;
};

//Send Verification Email
const sendVerificationEmail = async () => {
  const response = await axios.post(API_URL + "sendVerificationEmail");
  return response.data.message;
};

// Verify User
const verifyUser = async (verificationToken) => {
  const response = await axios.patch(
    `${API_URL}verifyUser/${verificationToken}`
  );
  return response.data.message;
};

// Change Password
const changePassword = async (userData) => {
  const response = await axios.patch(API_URL + "changePassword", userData);
  return response.data.message;
};

// Forgot Password
const forgotPassword = async (userData) => {
  const response = await axios.post(API_URL + "forgotPassword", userData);
  return response.data.message;
};
// Reset Password
const resetPassword = async (userData, resetToken) => {
  const response = await axios.patch(
    `${API_URL}resetPassword/${resetToken}`,
    userData
  );
  return response.data.message;
};

const authService = {
  register,
  login,
  logout,
  loginStatus,
  getUser,
  updateUser,
  sendVerificationEmail,
  verifyUser,
  changePassword,
  forgotPassword,
  resetPassword,
};

export default authService;
