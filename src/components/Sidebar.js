import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import "./Sidebar.css";

import SidebarThread from "./SidebarThread";

import { Avatar, IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import BorderColorOutlinedIcon from "@material-ui/icons/BorderColorOutlined";
import {
  QuestionAnswerOutlined,
  Settings,
  PhoneOutlined,
} from "@material-ui/icons";

import db, { auth } from "../firebase";
import { selectUser } from "../features/userSlice";

const Sidebar = () => {
  const user = useSelector(selectUser);
  const [threads, setThreads] = useState([]);

  useEffect(() => {
    db.collection("threads").onSnapshot((snapshot) =>
      setThreads(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );
  }, []);

  const addThread = () => {
    const threadName = prompt("Enter thread name");

    if (threadName) {
      db.collection("threads").add({
        threadName: threadName,
      });
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <div className="sidebar__search">
          <SearchIcon />
          <input className="sidebar__input" placeholder="Search" />
        </div>
        <IconButton onClick={addThread} variant="outlined" id="sidebar__button">
          <BorderColorOutlinedIcon />
        </IconButton>
      </div>

      <div className="sidebar__threads">
        {threads.map(({ id, data: { threadName } }) => (
          <SidebarThread key={id} id={id} threadName={threadName} />
        ))}
      </div>

      <div className="sidebar__bottom">
        <Avatar src={user.photo} onClick={() => auth.signOut()} />
        <IconButton>
          <PhoneOutlined />
        </IconButton>
        <IconButton>
          <QuestionAnswerOutlined />
        </IconButton>
        <IconButton>
          <Settings />
        </IconButton>
      </div>
    </div>
  );
};

export default Sidebar;
