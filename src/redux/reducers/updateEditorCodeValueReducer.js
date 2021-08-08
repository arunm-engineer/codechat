import { initialState } from "../initialState";
import * as actionTypes from "../actionTypes";

export function updateEditorCodeValueReducer(state=initialState.editorCodeValue, action) {
    switch(action.type) {
        case actionTypes.UPDATE_CODE_VALUE:
            return { ...action.payload }
        default:
            return state;
    }
}