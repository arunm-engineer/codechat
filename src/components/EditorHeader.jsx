import React, { useEffect } from 'react';
import "../css/EditorHeader.css";
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as actionTypes from "../redux/actionTypes";
import { pushCodeMiddleWare } from '../redux/middlewares/pushCodeMiddleWare';
import { pullCodeMiddleWare } from '../redux/middlewares/pullCodeMiddleWare';

function EditorHeader(props) {
    const { theme, fontSize, language } = props.editorHeaderSettings;

    const updateSettings = (e) => {
        const theme = document.querySelector(".editor-theme").value;
        const fontSize = document.querySelector(".editor-font").value;
        const language = document.querySelector(".editor-language").value;

        props.updateEditorHeaderSettings({ theme, fontSize, language });
    }

    // Select user with whom you need to CodeChat
    // This step is mandatory, without this you cannot "Push or Pull" code
    const handlePushCode = () => {
        if (!props?.codeChatWith?.username) {
            alert("Pick your friend to CodeChat with!! \nUse search from Messaging section");
            return;
        }
        props.pushCode();
    }
    const handlePullCode = () => {
        if (!props?.codeChatWith?.username) {
            alert("Pick your friend to CodeChat with!! \nUse search from Messaging section");
            return;
        }
        props.pullCode();
    }

    useEffect(() => {
        updateSettings();
    }, [])

    return (
        <div className="editor-header-main">
            <select className="editor-theme editor-settings"
                onChange={updateSettings}
                value={theme}>
                <option value="shadowfox">Shadowfox</option>
                <option value="dracula">Dracula</option>
                <option value="icecoder">Icecoder</option>
                <option value="neat">Neat</option>
            </select>
            <select className="editor-font editor-settings"
                onChange={updateSettings}
                value={fontSize}>
                <option value="16px">16px</option>
                <option value="18px">18px</option>
                <option value="20px">20px</option>
                <option value="22px">22px</option>
            </select>
            <select className="editor-language editor-settings"
                onChange={updateSettings}
                value={language}>
                <option value="javascript">JavaScript</option>
                <option value="text/x-java">Java</option>
                <option value="text/x-c++src">C++</option>
                <option value="python">Python</option>
            </select>
            <div className="action-btn push-btn"
            onClick={handlePushCode}>
                <span>PUSH</span>
            </div>
            <div className="action-btn pull-btn"
            onClick={handlePullCode}>
                <span>PULL</span>
            </div>
        </div>
    )
}

const mapStateToProps = (store) => {
    return store;
}

const mapDistpatchToProps = (dispatch) => {
    return {
        updateEditorHeaderSettings: (settings) => {
            dispatch({ type: actionTypes.UPDATE_EDITOR_HEADER_SETTINGS, payload: settings })
        },
        pushCode: () => {
            dispatch(pushCodeMiddleWare)
        },
        pullCode: () => {
            dispatch(pullCodeMiddleWare)
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDistpatchToProps)(EditorHeader));