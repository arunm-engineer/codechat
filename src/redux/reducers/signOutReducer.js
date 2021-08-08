import { initialState } from "../initialState";
import * as actionTypes from "../actionTypes"

export default function signOutReducer(state=initialState.authState, action) {

    switch(action.type) {
        case actionTypes.SIGN_OUT_SUCCESS:
            return {
                error: "",
                loading: false
            }
        case actionTypes.SIGN_OUT_ERROR:
            return {
                error: "",
                loading: false
            }
        default:
            return state;
    }
}