import { initialState } from "../initialState";
import * as actionTypes from "../actionTypes";

export function messageReducer(state=initialState, action) {
    switch(action.type) {
        case actionTypes.MESSAGING_SUCCESS:
            return state;
        default:
            return state;
    }
}