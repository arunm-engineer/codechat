import { combineReducers } from "redux";
import { signInReducer } from "./signInReducer";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "react-redux-firebase";
import { signUpReducer } from "./signUpReducer";
import { gsignUpReducer } from "./gSignUpReducer";
import { editorHeaderReducer } from "./editorHeaderReducer";
import { updateEditorCodeValueReducer } from "./updateEditorCodeValueReducer";
import { fetchUsersReducer } from "./fetchUsersReducer";
import { updateCodeChatWithReducer } from "./updateCodeChatWithReducer";
import { pushCodeReducer } from "./pushCodeReducer";
import { pullCodeReducer } from "./pullCodeReducer";
import { fetchMessagesReducer } from "./fetchMessagesReducer";

export const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    authStateSignIn: signInReducer,
    authStateSignUp: signUpReducer,
    authStateGSignUp: gsignUpReducer,
    editorHeaderSettings: editorHeaderReducer,
    editorCodeValue: updateEditorCodeValueReducer,
    users: fetchUsersReducer,
    codeChatWith: updateCodeChatWithReducer,
    editorCodeValueToPush: pushCodeReducer,
    editorCodeValueToPull: pullCodeReducer,
    chatMessages: fetchMessagesReducer,
})