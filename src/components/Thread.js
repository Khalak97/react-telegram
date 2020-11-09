import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import "./Thread.css";

import Message from "./Message";

import { Avatar, IconButton } from "@material-ui/core";
import { MicNoneOutlined, SendRounded, MoreHoriz } from "@material-ui/icons";

import firebase from "firebase";
import db from "../firebase";
import { selectUser } from "../features/userSlice";
import { selectThreadId, selectThreadName } from "../features/threadSlice";

const Thread = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const threadId = useSelector(selectThreadId);
  const threadName = useSelector(selectThreadName);
  const user = useSelector(selectUser);

  useEffect(() => {
    if (threadId) {
      db.collection("threads")
        .doc(threadId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) =>
          setMessages(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          )
        );
    }
  }, [threadId]);

  const sendMessage = (e) => {
    e.preventDefault();
    db.collection("threads")
      .doc(threadId)
      .collection("messages")
      .add({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        message: input,
        uid: user.uid,
        photo: user.photo,
        email: user.email,
        displayName: user.displayName,
      })
      .then(() => {
        setInput("");
      });
  };

  return (
    <div className="thread">
      <div className="thread__header">
        <div className="thread__headerInfo">
          <h4>{threadName}</h4>
        </div>
        <IconButton>
          <MoreHoriz className="thread__headerMore" />
        </IconButton>
      </div>

      <div className="thread__messages">
        {messages.map(({ id, data }) => (
          <Message key={id} data={data} />
        ))}
      </div>

      <div className="thread__input">
        <form onSubmit={sendMessage}>
          <input
            placeholder="Write a message..."
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <IconButton onClick={sendMessage}>
            <SendRounded />
          </IconButton>
          <IconButton>
            <MicNoneOutlined />
          </IconButton>
        </form>
      </div>
    </div>
  );
};

export default Thread;
