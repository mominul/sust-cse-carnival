"use client";

import React, { useState, useEffect } from "react";
import io from "socket.io-client";

// const socket = io("http://localhost:3001"); //
// const socket = io("ws://4508-27-147-232-86.ngrok-free.app/ws/search/"); //
const socket = io("wss://socketsbay.com/wss/v2/1/demo/"); //

const Socket = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    // const socket = new WebSocket('ws://e2ea-27-147-232-86.ngrok-free.app/ws/search/');

    // Connection opened
    socket.addEventListener("open", (event) => {
      const message = {
        query: "Apple M1",
      };
      socket.send(JSON.stringify(message));
    });

    // Listen for messages
    socket.addEventListener("message", (event) => {
      const receivedData = JSON.parse(event.data);
      console.log("Received data:", receivedData);
      // Handle the received data as needed
    });

    // Connection closed
    socket.addEventListener("close", (event) => {
      console.log("Connection closed:", event);
    });

    // Clean up on component unmount
    return () => {
      socket.close();
    };
  }, []);

  console.log(messages);

  return <div className="my-5">Socket</div>;
};

export default Socket;
