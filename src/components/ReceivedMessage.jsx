import React from 'react';
import "../css/MessageBubble.css";
import { Avatar } from '@material-ui/core';


export default function ReceivedMessage(props) {
    const { userId, profileImageURL, username, mode, message, createdAt } = props.messageObj;
    console.log(props);
    return (
        <div className="received-msg">
            <div className="message-box received-msg-box">
                <div className="msg-avatar">
                    <Avatar src={profileImageURL} alt="Profile" style={{ height: "1.4rem", width: "1.4rem" }} />
                </div>
                <div className="message-details">
                    <div className="message">{message}</div>
                    <div className="received-time time">{createdAt}</div>
                </div>
            </div>
        </div>

    )
}