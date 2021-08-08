import React, { useState, useEffect } from 'react';
import "../css/CodeEditor.css";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/shadowfox.css";
import "codemirror/theme/dracula.css";
import "codemirror/theme/icecoder.css";
import "codemirror/theme/neat.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/python/python";
import "codemirror/mode/clike/clike";
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/edit/matchbrackets';
import "codemirror/addon/fold/foldcode";
import "codemirror/addon/fold/foldgutter";
import "codemirror/addon/fold/brace-fold";
import "codemirror/addon/fold/comment-fold";
import "codemirror/addon/fold/foldgutter.css";
import { Controlled as ControlledEditor } from "react-codemirror2";
import EditorHeader from './EditorHeader';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as actionTypes from "../redux/actionTypes";

function CodeEditor(props) {
    
    const { theme, fontSize, language } = props.editorHeaderSettings;
    const { codeValue } = props.editorCodeValue;

    const handleChange = (editor, data, value) => {
        props.updateCodeValue({ codeValue: value });
    }

    // Setting editor fontsize by target element
    useEffect(() => {
        let fontTargetElement = document.querySelector(".CodeMirror-wrap");
        fontTargetElement.style.fontSize = fontSize;
    }, [fontSize])

    return (
        <div style={{fontSize: "3rem"}} className="codeeditor-main-section">
            <EditorHeader />
            <ControlledEditor 
                onBeforeChange={handleChange}
                value={codeValue}
                className="code-mirror-wrapper"
                options={{
                    lineWrapping: true,
                    lint: true,
                    mode: language,
                    theme: theme,
                    lineNumbers: true,
                    foldGutter: true,
                    gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
                    autoCloseBrackets: true,
                    matchBrackets: true,
                }}
            />
        </div>
    )
}

const mapStateToProps = (store) => {
    return store;
}

const mapDistpatchToProps = (dispatch) => {
    return {
        updateCodeValue: (codeValue) => {
            dispatch({ type: actionTypes.UPDATE_CODE_VALUE, payload: codeValue })
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDistpatchToProps)(CodeEditor));