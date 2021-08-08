import * as actionTypes from "../actionTypes";

export async function fetchUsersMiddleWare(dispatch, getState, { getFirebase, getFirestore }) {
    const firebase = getFirebase();
    const firestore = firebase.firestore();

    // Get current user
    let { uid: currentUserId } = getState()?.firebase?.auth;

    // Fetch all users from the users collection from firestore
    await firestore.collection("users").onSnapshot(async snapshot => {
        let allUsers = snapshot.docs.map(doc => doc.data());

        let allUsersData = [];
        allUsers.forEach(user => {
            let { username, profileImageURL, userId } = user;
            allUsersData.push({ username, profileImageURL, userId });
        })

        // Filter and get all users data except "you"
        let filteredAllUsersData = allUsersData.filter((user) => {
            return user.userId !== currentUserId;
        })
        
        dispatch({ type: actionTypes.FETCH_USERS, payload: filteredAllUsersData });
    })
}