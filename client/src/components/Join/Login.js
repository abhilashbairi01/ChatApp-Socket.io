import React, { useState } from "react";
import io from "socket.io-client";
import Chat from "../Chat/Chat";
const socket = io.connect("https://chat-app-abhi.herokuapp.com/");
function Login() {
  const [username, setUsername] = useState("");
  const [roomid, setroomid] = useState("");
  const [showChat,setshowchat] = useState(false);
  const joinroom = () => {
    if (username !== "" && roomid !== "") {
      socket.emit("join_room", roomid);
      setshowchat(true)
    }
  };
  return (
    <div>
      {!showChat?
      (
        <>
      <h2>Want to Establish a chat?</h2>
      <input
        type="text"
        placeholder="name"
        onChange={(event) => {
          setUsername(event.target.value);
        }}
      ></input>
      <br />
      <br />
      <input
        type="text"
        placeholder="room id"
        onChange={(event) => {
          setroomid(event.target.value);
        }}
      ></input>
      <br />
      <br />
      <button onClick={joinroom}>join</button>
      <br/>
      </>
      ):(
      <Chat socket={socket} username={username} roomid={roomid}/>
      )}
    </div>
  );
}

export default Login;
