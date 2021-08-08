import * as actionTypes from "../actionTypes";

export function signInMiddleWare(userData) {
    console.log('In sign in');
    // Middleware to be triggered, upper func is just to get user data for Sign In
    return async (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();

        // 1.Loading state
        dispatch({type: actionTypes.SIGN_IN_LOADING});
        // 2. Success or error state
        try {
            await firebase.auth().signInWithEmailAndPassword(userData.email, userData.password);
            dispatch({ type: actionTypes.SIGN_IN_SUCCESS })
        }
        catch(err) {
            dispatch({ type: actionTypes.SIGN_IN_ERROR, errorMessage: err })
            setTimeout(() => {
                dispatch({ type: actionTypes.SIGN_IN_REMOVE_ERROR })
            }, 1000)
        }
    }
}