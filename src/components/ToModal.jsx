import React, { useState } from 'react';
import { makeStyles, Avatar, Modal, Backdrop, Fade, Button, Divider } from '@material-ui/core';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as actionTypes from "../redux/actionTypes";

function ToModal(props) {
    const useStyles = makeStyles((theme) => ({
        root: {
            '& > *': {
                margin: theme.spacing(1),
                paddingLeft: "7%"
            },
        },
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        paper: {
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
            width: "35vw",
            maxHeight: "60vh",
            borderRadius: "10px",
            textAlign: "center",
            outline: "none",
            backgroundColor: "#0C0C0F"
        },
        usersContainer: {
            overflow: "auto",
            height: "90%"
        },
        userSection: {
            display: "flex",
            backgroundColor: "#353b48",
            height: "2.5rem",
            alignItems: "center",
            marginBottom: "0.5rem",
            borderRadius: "3px",
            cursor: "pointer",
        },
        avatar: {
            marginLeft: "1rem",
            marginRight: "1rem"
        },
        title: {
            height: "10%",
            color: "#57606f",
            fontFamily: "Kanit, sans-serif",
            fontSize: "1.5rem",
        },
        username: {
            color: "#f1f2f6",
        }
    }))
    let classes = useStyles();

    const { users, open, handleOpen, handleClose } = props;

    const updateCodeChatWith = (codeChatWithObj) => {
        props.updateCodeChatWith(codeChatWithObj);
        handleClose();
    }

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={open}>
                <div className={classes.paper}>
                    <div className={classes.title}><span style={{ color: "#2ecc71" }}>Code</span> Chat with</div>
                    <div className={classes.usersContainer}>
                        {
                            users.map(userObj => {
                                return (
                                    <div key={userObj.userId}>
                                        <div
                                            id={userObj.userId}
                                            onClick={handleClose}
                                            onClick={() => updateCodeChatWith(userObj)}
                                            className={classes.userSection}>
                                            <div className={classes.avatar} ><Avatar alt="Profile" src={userObj.profileImageURL} style={{ height: "1.5rem", width: "1.5rem" }} /></div>
                                            <div className={classes.username}>{userObj.username}</div>
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
            </Fade>
        </Modal >
    )
}

const mapStateToProps = (store, ownProps) => {
    return {
        ...store,
        ...ownProps,
    };
}

const mapDistpatchToProps = (dispatch) => {
    return {
        updateCodeChatWith: (codeChatWithObj) => {
            console.log(codeChatWithObj);
            dispatch({ type: actionTypes.UPDATE_CODE_CHAT_WITH, payload: codeChatWithObj })
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDistpatchToProps)(ToModal));