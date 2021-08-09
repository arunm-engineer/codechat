import * as actionTypes from "../actionTypes";
import { v4 as uuidv4 } from 'uuid';

export function messageMiddleWare(message) {
    return async (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = firebase.firestore();

        const { uid: currentUserId, photoURL: currentuserPhotoURL, displayName: currentUserName } = getState()?.firebase?.auth;
        const { userId: codeChatWithUserId, profileImageURL: codeChatWithUserPhotoURL, username: codeChatWithUserName } = getState()?.codeChatWith;

        // Current user is the sender, codeChatWithUser is the receiver
        // Get chat messages of both user, 
        // since here we need to update one with "Sent message" and other with "Received message"
        let currentUserRef = await firestore.collection("chats").doc(currentUserId).get();
        let currentUserData = currentUserRef.data();
        const { chatMessages: currentUserMessages } = currentUserData;

        let codeChatWithUserRef = await firestore.collection("chats").doc(codeChatWithUserId).get();
        let codeChatWithUserData = codeChatWithUserRef.data();
        const { chatMessages: codeChatWithUserMessages } = codeChatWithUserData;
        
        let createdAtTimeObj = new Date();
        let createdAt = createdAtTimeObj.toString().split(" ")[4].substring(0, 5);
        // Create chat message objects to update with for both users
        let currentUserMessageObj = {
            profileImageURL: currentuserPhotoURL,
            username: currentUserName,
            mode: "SENT",
            message,
            uniqueMessageId: uuidv4(),
            sendTo: codeChatWithUserId,
            createdAt
        }

        // Both the users (sender & receiver) will contain photo, id, username of the sender only
        let codeChatWithUserMessageObj = {
            profileImageURL: currentuserPhotoURL,
            username: currentUserName,
            mode: "RECEIVED",
            message,
            uniqueMessageId: uuidv4(),
            receivedFrom: currentUserId,
            createdAt
        }

        // Update for current user
        firestore.collection("chats").doc(currentUserId).update({
            chatMessages: [...currentUserMessages, currentUserMessageObj]
        })
        // Update for codeChatWith user
        firestore.collection("chats").doc(codeChatWithUserId).update({
            chatMessages: [...codeChatWithUserMessages, codeChatWithUserMessageObj]
        })

        dispatch({ type: actionTypes.MESSAGING_SUCCESS })

    }
}