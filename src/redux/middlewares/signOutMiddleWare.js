import * as actionTypes from "../actionTypes";

export async function signOutMiddleWare(dispatch, getState, { getFirebase, getFirestore }) {
    const firebase = getFirebase();

    try {
        await firebase.auth().signOut();
        dispatch({ type: actionTypes.SIGN_OUT_SUCCESS });
    }
    catch(err) {
        dispatch({ type: actionTypes.SIGN_OUT_ERROR });
    }
}