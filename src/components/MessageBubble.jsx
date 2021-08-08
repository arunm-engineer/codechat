import React from 'react';
import "../css/MessageBubble.css";
import { Avatar } from '@material-ui/core';


export default function MessageBubble(props) {
    const{ userId, profileImageURL, username, mode, message, createdAt } = props.messageObj;
    console.log(props);
    return (
        <div style={{ backgroundColor: (mode === "SENT") ? "#8395a7" : "#353b48" }} className="message-box">
            <div className="msg-avatar">
                <Avatar src={profileImageURL} alt="Profile" style={{ height: "1.4rem", width: "1.4rem" }} />
            </div>
            <div className="message-details">
                <div className="message">{message}</div>
                <div style={{ color: (mode === "SENT") ? "#f1f2f6" : "#ced6e0" }} className="time">{createdAt}</div>
            </div>
        </div>
    )
}
