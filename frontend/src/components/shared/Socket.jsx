// "use client";

// import React, { useState, useEffect } from "react";
// import io from "socket.io-client";
// import WebSocket from "ws";
// import { Button } from "../ui/button";
// import { Input } from "../ui/input";

// // const socket = io("http://localhost:3001"); //
// // const socket = io("ws://4508-27-147-232-86.ngrok-free.app/ws/search/"); //
// // const socket = io("https://socket-io-chat.now.sh"); //

// const Socket = () => {
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");
//   const [socket, setSocket] = useState(null);

//   // useEffect(() => {
//   //   // Connect to the WebSocket server

//   //   // console.log("entered socket useEffect");
//   //   const socket = io("http://localhost:3001");

//   //   // console.log("passed socket instance");

//   //   // make a socket.emit to the server to send the initial message -- query

//   //   socket.emit("message", "Initial Hello from front end!");

//   //   socket.on("message", (data) => {
//   //     console.log("getting query inside useEffect");

//   //     console.log(data);
//   //     setMessages([...messages, data]);
//   //   });

//   //   setSocket(socket);
//   // }, []);

//   // const sendMessage = () => {
//   //   // const newMessage = "Hello from front end!";

//   //   console.log("sending message");
//   //   socket.emit("message", newMessage);

//   //   // if emit is successful, then add the message to the state

//   //   // setMessages([...messages, newMessage]);
//   // };

//   useEffect(() => {
//     // Connect to the WebSocket server

//     // console.log("entered socket useEffect");
//     const socket = io("ws://4508-27-147-232-86.ngrok-free.app/ws/search/");

//     // console.log("passed socket instance");

//     // make a socket.emit to the server to send the initial message -- query

//     socket.emit("query", "search query from frontend");

//     socket.on("message", (data) => {
//       console.log("getting query inside useEffect");

//       console.log(data);
//       setMessages([...messages, data]);
//     });

//     setSocket(socket);
//   }, []);

//   const sendMessage = () => {
//     // const newMessage = "Hello from front end!";

//     console.log("sending message");
//     socket.emit("query", newMessage);

//     // if emit is successful, then add the message to the state

//     // setMessages([...messages, newMessage]);
//   };

//   console.log("messages", messages);

//   return (
//     <div className="my-5">
//       <div className="flex gap-1">
//         <Input
//           value={newMessage}
//           onChange={(e) => setNewMessage(e.target.value)}
//         />

//         <Button onClick={sendMessage}>Send</Button>
//       </div>

//       <div>
//         {messages.map((message, index) => (
//           <p key={index}>{message}</p>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Socket;

"use client";

import React, { useState, useEffect } from "react";
// import io from "socket.io-client";
// import WebSocket from "ws";
import { Button } from "../ui/button";
// import WebSocket from "websocket";
import { w3cwebsocket as W3CWebSocket } from "websocket";

import { Input } from "../ui/input";

// const socket = io("http://localhost:3001"); //
// const socket = io("ws://4508-27-147-232-86.ngrok-free.app/ws/search/"); //
// const socket = io("https://socket-io-chat.now.sh"); //

const Socket = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  // const [socket, setSocket] = useState(null);

  // const socket = new WebSocket.w3cwebsocket("ws://127.0.0.1:8000/ws/search/");
  // const socket = new WebSocket.w3cwebsocket(
  //   "ws://5452-27-147-232-86.ngrok-free.app/ws/search/"
  // );

  useEffect(() => {
    const socket = new WebSocket(
      "wss://5452-27-147-232-86.ngrok-free.app/ws/search/"
    );

    socket.onopen = () => {
      console.log("WebSocket connected");
      // You may send an initial message here if required
      // socket.send(JSON.stringify({ query: "Initial message" }));
    };

    socket.addEventListener("open", (event) => {
      socket.send("Hello Server!");
    });

    socket.onmessage = (message) => {
      console.log("Received message:", message.data);

      // setMessages([...messages, message.data]);
      // Handle incoming messages from the server
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
      // Handle WebSocket errors
    };

    socket.onclose = () => {
      console.log("WebSocket closed");
      // Handle WebSocket closure
    };
  }, []);

  const sendMessage = () => {
    console.log("sending message");
    socket?.send(JSON.stringify({ query: newMessage }));
    // socket.send(JSON.stringify({ query: newMessage }));
  };

  console.log("messages", messages);

  return (
    <div className="my-5">
      <div className="flex gap-1">
        <Input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />

        <Button onClick={sendMessage}>Send</Button>
      </div>

      <div>
        {messages.map((message, index) => (
          <p key={index}>{message}</p>
        ))}
      </div>
    </div>
  );
};

export default Socket;
