import { initialState } from "../initialState";
import * as actionTypes from "../actionTypes";

export function signUpReducer(state = initialState.authState, action) {
    switch (action.type) {
        case actionTypes.SIGN_UP_LOADING:
            return {
                error: "",
                loading: true
            }
        case actionTypes.SIGN_UP_SUCCESS:
            return {
                error: "",
                loading: false
            }
        case actionTypes.SIGN_UP_ERROR:
            return {
                error: action.errorMessage,
                loading: false
            }
        case actionTypes.SIGN_UP_REMOVE_ERROR:
            return {
                error: "",
                loading: false
            }
        default:
            return state;
    }
}