import React, { useEffect, useState } from "react";
import { user } from "../Component/Join.jsx";
import socketIO from "socket.io-client";
import '../Style/chat.css';
import SendIcon from '@mui/icons-material/Send';
import Message from "./Message.jsx";
import ReactScrollToBottom from "react-scroll-to-bottom";
import closeicon from "../image/closepng.png"
const ENDPOINT ="http://localhost:4500/";

const Chat = () => {
    const [id, setId] = useState("");
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const[force,setForce]=useState(false);

    const socket = socketIO(ENDPOINT, { transports: ['websocket'] });

    const send = () => {
        const message = inputValue;
        socket.emit('message', { message, id });
        setInputValue("");
    }

    useEffect(() => {
        console.log("Connecting to server...");
        socket.on('connect', () => {
            setId(socket.id);
            console.log("Connected to server:", socket.id);
            alert("Connected");
        });

        socket.emit('joined', { user });

        socket.on('userJoined', (data) => {
            console.log("User joined:", data.user);
            setMessages([...messages, data]);
        });

        socket.on('welcome', (data) => {
            console.log("Received welcome:", data);
            setMessages([...messages, data]);
        });

        socket.on('leaveUser', (data) => {
            console.log("User left:", data.user);
            setMessages([...messages, data]);
            setForce(!force)
        });

        return () => {
            console.log("Disconnecting from server...");
            socket.emit('disconnects');
            socket.off();
        };
    }, [force]);

    useEffect(() => {
        socket.on('sendMessage', (data) => {
            console.log("Received message:", data);
            setMessages([...messages, data]);
        });

        return () => {
            socket.off();
        };
    }, [messages]);

    return (
        <div className="chatPage">
            <div className="chatContainer">
                <div className="chatHeader">
                    <h2>CHAT <span>APP</span></h2>
                    <a href="/"> <img src={closeicon} alt="close" /> </a>
                </div>
                <ReactScrollToBottom className="chatBox">
                    {messages.map((item, i) => (
                        <Message
                            key={i}
                            user={item.id === id ? '' : item.user}
                            message={item.message}
                            classs={item.id === id ? 'right' : 'left'}
                        />
                    ))}
                </ReactScrollToBottom>
                <div className="inputBox">
                    <input
                        type="text"
                        id="chatInput"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                    <button onClick={send} id="sendBtn"><SendIcon/></button>
                </div>
            </div>
        </div>
    );
}

export default Chat;
