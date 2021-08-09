import * as actionTypes from "../actionTypes";

export async function fetchMessagesMiddleWare(dispatch, getState, { getFirebase, getFirestore }) {
    const firebase = getFirebase();
    const firestore = firebase.firestore();

    // Get current user
    let { uid: currentUserId } = getState()?.firebase?.auth;
    const { userId: codeChatWithUserId } = getState()?.codeChatWith;



    // Get all messages from current user's chat messages collection in DB
    await firestore.collection("chats").onSnapshot(async snapshot => {
        let currentUserRef = snapshot.docs.find(doc => doc.id === currentUserId);
        let currentUserData = currentUserRef.data();
        // This case will be handled by default in case of any kind of error from DB
        if (!currentUserData) dispatch({ type: "" });
        
        const { chatMessages: currentUserMessages } = currentUserData;
        let filteredCurrentUserMessages = currentUserMessages.filter(messageObj => {
            console.log(messageObj);
            if (messageObj.mode === "SENT") {
                console.log(messageObj.sendTo === codeChatWithUserId);
                console.log(messageObj.sendTo,"------", codeChatWithUserId);
                return messageObj.sendTo === codeChatWithUserId;
            }
            else {
                console.log(messageObj.receivedFrom === codeChatWithUserId);
                console.log(messageObj.receivedFrom,"------", codeChatWithUserId);
                return messageObj.receivedFrom === codeChatWithUserId;
            }
            
        })
        dispatch({ type: actionTypes.FETCH_MESSAGES, payload: filteredCurrentUserMessages })
    })
}