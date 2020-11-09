import React from "react";

import "./Login.css";

import { auth, provider } from "../firebase";

import { Button } from "@material-ui/core";

const Login = () => {
  const signIn = () => {
    auth.signInWithPopup(provider).catch((error) => alert(error.message));
  };

  return (
    <div className="login">
      <div className="login__logo">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Telegram_logo.svg/512px-Telegram_logo.svg.png"
          alt="telegram"
        />
      </div>
      <h1>Welcome to telegram!</h1>
      <Button onClick={signIn}>Sign In</Button>
    </div>
  );
};

export default Login;
