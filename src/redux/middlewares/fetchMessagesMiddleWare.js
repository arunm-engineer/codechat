import * as actionTypes from "../actionTypes";

export async function fetchMessagesMiddleWare(dispatch, getState, { getFirebase, getFirestore }) {
    const firebase = getFirebase();
    const firestore = firebase.firestore();

    // Get current user
    let { uid: currentUserId } = getState()?.firebase?.auth;

    // Get all messages from current user's chat messages collection in DB
    // let currentUserRef = await firestore.collection("chats").doc(currentUserId).get();
    // let currentUserData = currentUserRef.data();
    // const { chatMessages: currentUserMessages } = currentUserData;

    // Get all messages from current user's chat messages collection in DB
    await firestore.collection("chats").onSnapshot(async snapshot => {
        let currentUserRef = snapshot.docs.find(doc => doc.id === currentUserId);
        let currentUserData = currentUserRef.data();
        
        const { chatMessages: currentUserMessages } = currentUserData;
        dispatch({ type: actionTypes.FETCH_MESSAGES, payload: currentUserMessages })
    })
}