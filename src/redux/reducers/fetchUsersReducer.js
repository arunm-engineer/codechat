import { initialState } from "../initialState";
import * as actionTypes from "../actionTypes";

export function fetchUsersReducer(state=initialState.users, action) {
    switch(action.type) {
        case actionTypes.FETCH_USERS:
            return action.payload;
        default:
            return state;
    }
}