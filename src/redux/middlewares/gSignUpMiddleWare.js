import * as actionTypes from "../actionTypes";
import 'firebase/storage';
import 'firebase/firestore';

export async function gSignUpMiddleWare(dispatch, getState, { getFirebase, getFirestore }) {
    const firebase = getFirebase();
    const storage = firebase.storage();
    const firestore = firebase.firestore();
    const auth = firebase.auth();


    dispatch({ type: actionTypes.G_SIGN_UP_LOADING })
    // signInWithPopup
    // 1. Sign up with Google
    // 2. Retrieve User details
    // 3. Update in Firestore databsae
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
        .then(userResult => {
            const user = userResult.user;
            createOrUpdateUserToDB(user, firebase, firestore, dispatch);
        })
        .catch(err => {
            dispatch({ type: actionTypes.G_SIGN_UP_ERROR, errorMessage: err })
            setTimeout(() => {
                dispatch({ type: actionTypes.G_SIGN_UP_REMOVE_ERROR })
            }, 1000)
        })
    // dispatch({ type: actionTypes.SIGN_UP_LOADING })

}

// For G-sign Up we must not update all fields to new values,
// Since D-Sign up can be used for easy login
// So we must not update data if user data already exists i n Firestore DB
async function createOrUpdateUserToDB(user, firebase, firestore, dispatch) {
    let { uid: userId, email, displayName: username, photoURL: profileImageURL } = user;
    let currentUserRef = await firestore.collection("users").doc(userId).get();
    let currentUserData = currentUserRef.data();

    if (!currentUserData) {
        firestore.collection("users").doc(userId).set({
            userId,
            username,
            email,
            profileImageURL,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            editorCodeValueToPull: []
        })

        // Create a doc for user for storing chats data
        firestore.collection("chats").doc(userId).set({
            chatMessages: []
        })
    }
    dispatch({ type: actionTypes.G_SIGN_UP_SUCCESS })
}