import React from 'react';
import "../css/MessageBubble.css";
import { Avatar } from '@material-ui/core';


export default function SentMessage(props) {
    const { profileImageURL, username, mode, message, createdAt } = props.messageObj;
    console.log(props);
    return (
        <div className="sent-msg">
            <div  className="message-box sent-msg-box">
                <div className="msg-avatar">
                    <Avatar src={profileImageURL} alt="Profile" style={{ height: "1.4rem", width: "1.4rem" }} />
                </div>
                <div className="message-details">
                    <div className="message">{message}</div>
                    <div className="sent-time time">{createdAt}</div>
                </div>
            </div>
        </div>
    )
}
// style={{ backgroundColor: (mode === "SENT") ? "#8395a7" : "#353b48" }}
// style={{ color: (mode === "SENT") ? "#f1f2f6" : "#ced6e0" }}