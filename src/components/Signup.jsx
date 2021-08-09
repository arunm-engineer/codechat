import React, { useState, useEffect } from 'react';
import "../css/Authentication.css";
import { Link } from "react-router-dom";
import Divider from '@material-ui/core/Divider';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { signUpMiddleWare } from '../redux/middlewares/signUpMiddleWare';
import { gSignUpMiddleWare } from '../redux/middlewares/gSignUpMiddleWare';

function Signup(props) {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [file, setFile] = useState(null);

    const handleFile = (e) => {
        let inputFile = e?.target?.files[0];
        if (!inputFile) {
            setFile(null);
            return;
        }
        setFile(inputFile);
    }

    const handleSignUp = (e) => {
        e.preventDefault();
        if (username && email && password && file) {
            props.signUp({username, email, password, file});
            return;
        }
        alert("Please check your credentials again.");
    }

    const handleGSignUp = (e) => {
        e.preventDefault();
        props.gSignUp();
    }

    useEffect(() => {
        if (props.auth.uid) props.history.push("/");
    }, [props.auth])

    return (
        <div className="auth-page-card">
            <div className="site-info-section">
                <div className="title-section">
                    <div className="title-highlighted-section">
                        <div className="title-highlighted-name">Code</div>
                        <div className="title-highlighter"></div>
                    </div>
                    <div className="title-unhighlighted-section">Chat</div>
                </div>
                <div className="description-section">
                    Let the code do the talking
                </div>
            </div>
            
            <div className="auth-section">
                <div className="auth-card">
                    <div className="username-section input-section">
                        <label htmlFor="username" className="label display-block">Username</label>
                        <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" name="username" spellCheck="false" className="display-block input-items" />
                    </div>
                    <div className="email-section input-section">
                        <label htmlFor="email" className="label display-block">Email Address</label>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="email" spellCheck="false" className="display-block input-items" />
                    </div>
                    <div className="password-section input-section">
                        <label htmlFor="password" className="label display-block">Password</label>
                        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="password" spellCheck="false" className="display-block input-items" />
                    </div>
                    <div className="file-section input-section">
                        <div className="input-items file-input-section">
                            <i className="fas fa-cloud-upload-alt" style={{color: "#2ecc71"}}></i>
                            <span className="upload-title label">&ensp;Upload Profile Image</span>
                            <input onChange={handleFile} type="file" name="profile-image" className="display-block file-input" />
                        </div>
                    </div>
                    <div className="sign-in-btn-section input-section">
                        <button onClick={handleSignUp} className="sign-in-btn display-block input-items">SIGN UP</button>
                    </div>
                    <Divider variant="fullWidth" style={{backgroundColor: "#57606f", width: "80%", margin: "auto"}}></Divider>
                    <div className="gsign-in-btn-section input-section">
                        <button onClick={handleGSignUp} style={{backgroundColor: "transparent", border: "1px solid #57606f", color: "black", display: "flex", justifyContent: "center", alignItems: "center"}} className="sign-in-btn display-block input-items">
                            <img width="18" src="https://img.icons8.com/color/48/000000/google-logo.png"/>
                            <span className="gsign-up-text">SIGN UP</span>
                        </button>
                    </div>
                    <div className="signup-title" style={{color: "#a5b1c2", fontSize: "1rem", textAlign: "center"}}>
                        Have an existing account? <Link to="/login" style={{ 
                            textDecoration: "none",
                            color: "#10ac84",
                         }}>Sign In</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (store) => {
    return {
        auth: store.firebase.auth
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        signUp: (userData) => {
            dispatch(signUpMiddleWare(userData))
        },
        gSignUp: () => {
            dispatch(gSignUpMiddleWare)
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Signup));
