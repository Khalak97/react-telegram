import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./App.css";

import Telegram from "./components/Telegram";
import Login from "./components/Login";

import { auth } from "./firebase";
import { login, logout, selectUser } from "./features/userSlice";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          login({
            uid: authUser.uid,
            photo: authUser.photoURL,
            email: authUser.email,
            displayName: authUser.displayName,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, []);
  return <div className="app">{user ? <Telegram /> : <Login />}</div>;
}

export default App;
