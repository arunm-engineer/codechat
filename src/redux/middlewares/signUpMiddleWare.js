import * as actionTypes from "../actionTypes";
import 'firebase/storage';
import 'firebase/firestore';

export function signUpMiddleWare(userData) {
    return async (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const storage = firebase.storage();
        const firestore = firebase.firestore();

        dispatch({ type: actionTypes.SIGN_UP_LOADING })

        // 1. Sign Up by creating an account
        let userSignUpData = await firebase.auth().createUserWithEmailAndPassword(userData.email, userData.password);
        let userUniqueID = userSignUpData.user.uid;
        console.log(userUniqueID);

        // 2. Store Profile Image file in Firebase's Storage
        const uploadFileListener = storage.ref(`/user_profiles/${userUniqueID}`).put(userData.file);

        // Storage upload Progress
        uploadFileListener.on("state_changed", progressTrackFn, errorFn, successFn);

        function progressTrackFn(snapshot) {
            let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(progress);
        }

        function errorFn(err) {
            dispatch({ type: actionTypes.SIGN_UP_ERROR, errorMessage: err })

            setTimeout(() => {
                dispatch({ type: actionTypes.SIGN_UP_REMOVE_ERROR })
            }, 1000)
        }

        async function successFn() {
            // 3. Store details of user in Firebase's Firestore
            // Get uploaded file URL
            let downloadFileURL = await uploadFileListener.snapshot.ref.getDownloadURL();

            // Create a doc for user data
            firestore.collection("users").doc(userUniqueID).set({
                username: userData.username,
                email: userData.email,
                userId: userUniqueID,
                profileImageURL: downloadFileURL,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                editorCodeValueToPull: []
            })

            // Create a doc for user for storing chats data
            firestore.collection("chats").doc(userUniqueID).set({
                chatMessages: []
            })

            dispatch({ type: actionTypes.SIGN_UP_SUCCESS })
        }

        
    }
}