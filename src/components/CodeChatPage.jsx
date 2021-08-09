import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Header from './Header';
import CodeEditor from './CodeEditor';
import Chatbox from './Chatbox';
import "../css/CodeChatPage.css";
import { fetchUsersMiddleWare } from '../redux/middlewares/fetchUsersMiddleWare';
import CircularProgress from '@material-ui/core/CircularProgress';

function CodeChatPage(props) {

    const { loading } = props?.authStateSignIn;

    useEffect(() => {
        props.fetchUsers();
    }, [])

    return (
        <div>
            <Header />
            <div className="codechat-main-section">
                <CodeEditor />
                <Chatbox />
            </div>
        </div>
    )
}

const mapStateToProps = (store) => {
    return store;
}

const mapDistpatchToProps = (dispatch) => {
    return {
        fetchUsers: () => {
            dispatch(fetchUsersMiddleWare)
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDistpatchToProps)(CodeChatPage));