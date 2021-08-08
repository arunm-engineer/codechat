import { initialState } from "../initialState";
import * as actionTypes from "../actionTypes";

export function pushCodeReducer(state=initialState.editorCodeValueToPull, action) {
    switch(action.type) {
        case actionTypes.PUSH_EDITOR_CODE_VALUE:
            return state;
        default:
            return state;
    }
}