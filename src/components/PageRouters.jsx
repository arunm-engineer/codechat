import React from 'react';
import { Switch, Link, Route } from "react-router-dom";
import Login from './Login';
import Signup from './Signup';
import CodeChatPage from './CodeChatPage';
import PrivateRoute from './PrivateRoute';

export default function PageRouters() {
    return (
        <Switch>
            <Route path="/login" component={Login}/>
            <Route path="/signup" component={Signup}/>
            <PrivateRoute path="/codechat" component={CodeChatPage}/>
            <PrivateRoute path="/" component={CodeChatPage}/>
        </Switch>
    )
}