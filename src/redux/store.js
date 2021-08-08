import {createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import { rootReducer } from "./reducers/rootReducer";
import {getFirebase} from "react-redux-firebase";
import {reduxFirestore, getFirestore} from "redux-firestore";
import firebase from"firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { composeWithDevTools } from "redux-devtools-extension";
import firebaseConfig from "../secrets";

// Initialize the app
firebase.initializeApp(firebaseConfig);
firebase.firestore();


export const store = createStore(
    rootReducer, 
    composeWithDevTools(
        applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })), reduxFirestore(firebase)
    )
);