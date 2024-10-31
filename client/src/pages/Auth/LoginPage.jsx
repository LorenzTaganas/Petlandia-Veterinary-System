import React, { useState } from "react";
import placeholderImage from "../../assets/placeholder.png";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const LoginPage = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isLogin, setIsLogin] = useState(true);

  const toggleLoginPasswordVisibility = () => {
    setShowLoginPassword(!showLoginPassword);
  };

  const toggleSignupPasswordVisibility = () => {
    setShowSignupPassword(!showSignupPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="flex min-h-screen">
      <div className="w-1/2 flex justify-center items-center p-8 bg-white">
        {isLogin ? (
          <div className="flex flex-col space-y-4 w-full max-w-sm">
            <h2 className="text-2xl font-bold">Sign in to your account</h2>
            <p className="mt-2">Hi, Welcome to Petlandia</p>
            <TextField
              label="Email Address"
              variant="outlined"
              fullWidth
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
            />
            <TextField
              label="Password"
              type={showLoginPassword ? "text" : "password"}
              variant="outlined"
              fullWidth
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={toggleLoginPasswordVisibility}
                      edge="end"
                    >
                      {showLoginPassword ? <Visibility /> : <VisibilityOff />}{" "}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <button className="bg-blue-500 text-white px-4 py-2 rounded">
              Login
            </button>
            <p className="text-gray-500">
              New to Petlandia?{" "}
              <button
                onClick={() => setIsLogin(false)}
                className="text-blue-500 underline"
              >
                Sign up here
              </button>
            </p>
          </div>
        ) : (
          <div className="flex flex-col space-y-4 w-full max-w-sm">
            <h2 className="text-2xl font-bold">Create an account</h2>
            <p className="mt-2">Hi, Welcome to Petlandia</p>
            <TextField
              label="First Name"
              variant="outlined"
              fullWidth
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <TextField
              label="Last Name"
              variant="outlined"
              fullWidth
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <TextField
              label="Email Address"
              variant="outlined"
              fullWidth
              value={signupEmail}
              onChange={(e) => setSignupEmail(e.target.value)}
            />
            <TextField
              label="Contact No"
              variant="outlined"
              fullWidth
              value={contactNo}
              onChange={(e) => setContactNo(e.target.value)}
            />
            <TextField
              label="Password"
              type={showSignupPassword ? "text" : "password"}
              variant="outlined"
              fullWidth
              value={signupPassword}
              onChange={(e) => setSignupPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={toggleSignupPasswordVisibility}
                      edge="end"
                    >
                      {showSignupPassword ? <Visibility /> : <VisibilityOff />}{" "}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Confirm Password"
              type={showConfirmPassword ? "text" : "password"} // Show text if true
              variant="outlined"
              fullWidth
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={toggleConfirmPasswordVisibility}
                      edge="end"
                    >
                      {showConfirmPassword ? <Visibility /> : <VisibilityOff />}{" "}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <button className="bg-blue-500 text-white px-4 py-2 rounded">
              Sign Up
            </button>
            <p className="text-gray-500">
              Already have an account?{" "}
              <button
                onClick={() => setIsLogin(true)}
                className="text-blue-500 underline"
              >
                Login here
              </button>
            </p>
          </div>
        )}
      </div>

      <div className="w-1/2 flex flex-col justify-center items-center bg-gray-100">
        <img src={placeholderImage} alt="Logo" className="h-40 w-40 mb-4" />
      </div>
    </div>
  );
};

export default LoginPage;
