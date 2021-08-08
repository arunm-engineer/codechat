import React, { useState, useEffect } from 'react';
import "../css/Chatbox.css";
import MessageBubble from './MessageBubble';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as actionTypes from "../redux/actionTypes";
import { messageMiddleWare } from '../redux/middlewares/messageMiddleWare';
import { Avatar, Modal, Backdrop, Fade, Button, Divider } from '@material-ui/core';
import ToModal from './ToModal';
import { fetchMessagesMiddleWare } from '../redux/middlewares/fetchMessagesMiddleWare';


function Chatbox(props) {
    // console.log(props);

    // Controlling ToModal from here to operate "Code chat with -> user easily and perform operation"
    const [open, setOpen] = useState(true);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const [message, setMessage] = useState("");
    const { profileImageURL, username } = props.codeChatWith;
    const { chatMessages } = props;
    const { photoURL: currentuserPhotoURL, displayName: currentUserName } = props?.firebase?.auth;

    const showNotificationOnUserSendMessage = () => {
        if (Notification.permission === "granted") {
            const notification = new Notification(currentUserName, {
                body: message,
                icon: currentuserPhotoURL
            })
        }
    }

    const handleSendMessage = () => {
        if (!props?.codeChatWith?.username) {
            alert("Pick your friend to CodeChat with!! \nUse search from Messaging section");
            return;
        }
        props.sendMessage(message);
        showNotificationOnUserSendMessage();
        setMessage("");
    }

    useEffect(() => {
        if (!props?.codeChatWith?.username) return;
        props.fetchMessages();
    }, [props?.codeChatWith])

    return (
        <>
            <ToModal handleOpen={handleOpen} handleClose={handleClose} open={open} />
            <div className="chatbox-main-section">
                <div className="chat-header">
                    <div className="user-avatar" ><Avatar alt="Profile" src={profileImageURL} style={{ height: "1.5rem", width: "1.5rem" }} /></div>
                    <div className="chatbox-username-section">
                        <span>{username}</span>
                        <i
                            onClick={handleOpen}
                            className="fas fa-search search-user"></i>
                    </div>
                </div>
                <div className="chat-body">
                    {
                        chatMessages.map(messageObj => {
                            return <MessageBubble key={messageObj.uniqueMessageId} messageObj={messageObj} />
                        })
                    }
                </div>
                <div className="chat-editor">
                    <div className="chat-textbox">
                        <textarea value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            spellCheck={false}></textarea>
                    </div>
                    <div className="chat-send-icon"
                        onClick={handleSendMessage}>
                        <i className="fas fa-paper-plane"></i>
                    </div>
                </div>
            </div>
        </>
    )
}

const mapStateToProps = (store) => {
    return store;
}

const mapDistpatchToProps = (dispatch) => {
    return {
        sendMessage: (message) => {
            dispatch(messageMiddleWare(message))
        },
        fetchMessages: () => {
            dispatch(fetchMessagesMiddleWare)
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDistpatchToProps)(Chatbox));