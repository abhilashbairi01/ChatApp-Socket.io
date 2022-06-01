import React, { useEffect, useState } from "react";
import './Chat.css'
function Chat({ socket, username, roomid }) {
    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList,setMessageList] = useState([])
     
    const sendMessage = async () => {
      if (currentMessage !== "") {
        const messageData = {
          room: roomid,
          author: username,
          message: currentMessage,
          time:
            new Date(Date.now()).getHours() +
            ":" +
            new Date(Date.now()).getMinutes(),
        };
  
        await socket.emit("send_message", messageData);
        setMessageList((list) => [...list, messageData]);
        setCurrentMessage("");
      }
    };
  
    useEffect(() => {
      socket.off("receive_message").on("receive_message", (data) => {
        setMessageList((list) => [...list,data]);
        console.log(data)
      });
    }, [socket]);

  return (
    <div>
      <div id="header">
        <i>Live Chat</i>
      </div>
      <br />
      <div id="body">
        <input
          type="text"
          value={currentMessage}
          placeholder="chat"
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyPress={(event) => {
            event.key === "Enter" && sendMessage();
          }}
        />
        <button onClick={sendMessage}>send</button>
        <div>
          {
            messageList.map((messagecontent) =>{
              return <p id={username === messagecontent.author ? "you" : "other"} >{messagecontent.message}</p>;
            }
            )
          }
        </div>
      </div>

    </div>
  );
}

export default Chat;
