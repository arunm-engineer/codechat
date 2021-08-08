import { initialState } from "../initialState";
import * as actionTypes from "../actionTypes";

export function pullCodeReducer(state=initialState.editorCodeValueToPull, action) {
    switch(action.type) {
        case actionTypes.PULL_EDITOR_CODE_VALUE:
            return {
                ...action.payload
            }
        default:
            return state;
    }
}
