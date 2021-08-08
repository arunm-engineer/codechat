import { initialState } from "../initialState";
import * as actionTypes from "../actionTypes";

export function editorHeaderReducer(state=initialState.editorSettings, action) {
    switch(action.type) {
        case actionTypes.UPDATE_EDITOR_HEADER_SETTINGS:
            return { ...action.payload };
        default:
            return state;
    }

}