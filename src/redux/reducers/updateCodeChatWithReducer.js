import { initialState } from "../initialState";
import * as actionTypes from "../actionTypes";

export function updateCodeChatWithReducer(state=initialState.codeChatWith, action) {
    switch(action.type) {
        case actionTypes.UPDATE_CODE_CHAT_WITH:
            return {
                ...action.payload
            }
        default:
            return state;
    }
}