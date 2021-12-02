import React from 'react';
import "../css/Header.css";
import { Avatar, IconButton, Menu, MenuItem, Fade } from '@material-ui/core';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { signOutMiddleWare } from "../redux/middlewares/signOutMiddleWare";
import * as actionTypes from "../redux/actionTypes";
// import LogoutIcon from '@material-ui/icons/ExitToApp';

function Header(props) {
    const { photoURL } = props?.firebase?.auth;
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleAnchorElClick = (e) => setAnchorEl(e.currentTarget);
    const handleClose = () => setAnchorEl(null);

    const handleSignOut = () => {
        props.signOut();
        props.clearCodeEditorValue();
    }

    return (
        <div className="header-section">
            <div className="h-title-section">
                <div className="h-title-highlighted-section">
                    <div className="h-title-highlighted-name">Code</div>
                    <div className="h-title-highlighter"></div>
                </div>
                <div className="h-title-unhighlighted-section">Chat</div>
            </div>

            <IconButton style={{marginRight: "3rem"}} onClick={handleAnchorElClick}>
                <Avatar alt="Profile" src={photoURL ? photoURL : ""} style={{ height: "2rem", width: "2rem" }} />
            </IconButton>
            <Menu
                id="fade-menu"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
            >
                <MenuItem onClick={handleSignOut}>Logout&ensp;<i className="fas fa-sign-out-alt"></i></MenuItem>
            </Menu>
        </div>
    )
}

const mapStateToProps = (store) => {
    return store;
}

const mapDistpatchToProps = (dispatch) => {
    return {
        signOut: () => {
            dispatch(signOutMiddleWare);
        },
        clearCodeEditorValue: () => {
            dispatch({ type: actionTypes.UPDATE_CODE_VALUE, payload: "" })
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDistpatchToProps)(Header));