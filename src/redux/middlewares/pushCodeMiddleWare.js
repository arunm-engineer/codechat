import * as actionTypes from "../actionTypes";

export async function pushCodeMiddleWare(dispatch, getState, { getFirebase, getFirestore }) {
    const firebase = getFirebase();
    const firestore = firebase.firestore();
    
    const { codeValue } = getState().editorCodeValue;
    const { userId: codeChatWithUserId } = getState().codeChatWith;
    const { uid: currentUserId } = getState()?.firebase?.auth;

    // Read all code value of codeChatWith user and update his pullCodeValue
    // with your new pushCodeValue so that he can pull out the updated code
    let codeChatWithUserRef = await firestore.collection("users").doc(codeChatWithUserId).get();
    let codeChatWithUserData = codeChatWithUserRef.data();
    let { editorCodeValueToPull } = codeChatWithUserData;

    // Creating new doc of pushCode Value
    let editorCodeValueToPush = {
        pushUserId: currentUserId,
        codeValue
    }

    // Filter, code since you might have pushed code before as well, 
    // so to avoid duplicacy we filter all codes and push your codeValue as a new user's pushCodeValue
    let filteredEditorCodeValueToPull = editorCodeValueToPull.filter(codeValueObj => {
        return codeValueObj.pushUserId !== currentUserId;
    })

    // Collect all codeValues and update to firebase so that the other user can pull code
    editorCodeValueToPull = [editorCodeValueToPush, ...filteredEditorCodeValueToPull];

    // Update in Firebase DB with all new codes to pulled by codeChatWith user
    await firestore.collection("users").doc(codeChatWithUserId).update({
        editorCodeValueToPull
    })

    dispatch({ type: actionTypes.PUSH_EDITOR_CODE_VALUE });
}