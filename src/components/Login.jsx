import React, { useState, useEffect } from 'react';
import "../css/Authentication.css";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { signInMiddleWare } from "../redux/middlewares/signInMiddleWare"

function Login(props) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignIn = () => {
        if (email && password) {
            props.signIn({email, password});
            return;
        }
        alert("Please check your credentials again.");
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
                    <div className="email-section input-section">
                        <label htmlFor="email" className="label display-block">Email Address</label>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="email" spellCheck="false" className="display-block input-items" />
                    </div>
                    <div className="password-section input-section">
                        <label htmlFor="password" className="label display-block">Password</label>
                        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="password" spellCheck="false" className="display-block input-items" />
                    </div>
                    <div className="sign-in-btn-section input-section">
                        <button onClick={handleSignIn} className="sign-in-btn display-block input-items">SIGN IN</button>
                    </div>
                    <div className="signup-title" style={{color: "#a5b1c2", fontSize: "1rem", textAlign: "center"}}>
                        New here? Create your account <Link to="/signup" style={{ 
                            textDecoration: "none",
                            color: "#10ac84",
                         }}>Sign Up</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (store) => {
    // console.log(store);
    return {
        auth: store.firebase.auth
    };
}

const mapDistpatchToProps = (dispatch) => {
    return {
        signIn: (userData) => {
            dispatch(signInMiddleWare(userData));
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDistpatchToProps)(Login));