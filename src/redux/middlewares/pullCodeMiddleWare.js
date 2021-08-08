import * as actionTypes from "../actionTypes";

export async function pullCodeMiddleWare(dispatch, getState, { getFirebase, getFirestore }) {
    const firebase = getFirebase();
    const firestore = firebase.firestore();
    
    const { userId: codeChatWithUserId } = getState().codeChatWith;
    const { uid: currentUserId } = getState()?.firebase?.auth;

    // Pull code from current user's DB to which then codeChatWith user has pushed the code
    let currentUserRef = await firestore.collection("users").doc(currentUserId).get();
    let currentUserData = currentUserRef.data();
    let { editorCodeValueToPull } = currentUserData;

    let codeValueObj = editorCodeValueToPull.find(codeValueObj => {
        console.log(codeValueObj);
        return codeValueObj.pushUserId === codeChatWithUserId;
    })
    console.log(codeValueObj);
    let codeValue = null;
    if (codeValueObj) codeValue = codeValueObj.codeValue;
    if (!codeValue) codeValue = "";

    
    dispatch({ type: actionTypes.UPDATE_CODE_VALUE, payload: {codeValue} });
}