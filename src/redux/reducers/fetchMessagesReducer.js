import { initialState } from "../initialState";
import * as actionTypes from "../actionTypes";

export function fetchMessagesReducer(state=initialState.chatMessages, action) {
    switch(action.type) {
        case actionTypes.FETCH_MESSAGES:
            return [...action.payload];
        default:
            return state;
    }
}