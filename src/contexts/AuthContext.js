import createContext from './createDataContext';
import {
    createUserWithEmailAndPassword,
    sendEmailVerification,
    signInWithEmailAndPassword,
    signOut,
    GoogleAuthProvider,
    signInWithPopup,
    updateProfile,
} from 'firebase/auth';
import { STORE_TOKEN, STORE_USER } from '../utilities';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage, authentication, db } from '../firebase';
import { doc, updateDoc } from 'firebase/firestore';

const SET_USER = "set_user";

const INITIAL_STATE = {
    user: null,
    token: null
};

const reducer = (state, action) => {
    switch (action.type) {
        case SET_USER: {
            const { user, token } = action.payload;
            localStorage.setItem(STORE_TOKEN, token);
            localStorage.setItem(STORE_USER, JSON.stringify(user));
            return { ...state, user, token };
        }
        default: {
            return state;
        }
    }
};

const login = dispatch => async ({ email, password }) => {
    try {
        await signInWithEmailAndPassword(authentication, email, password);
    } catch (e) {
        return e;
    }
};

const googleLogin = dispatch => async () => {
    try {
        const googleProvider = new GoogleAuthProvider();
        await signInWithPopup(authentication, googleProvider);
    } catch (e) {
        return e;
    }
};

const sendEmailConfirm = dispatch => async () => {
    const user = authentication.currentUser;
    try {
        await sendEmailVerification(user);
    } catch(e) {
        return e;
    }

};
const changeProfile = dispatch => async ({ displayName, photoURL, currentPhoto, userId, filename }) => {
    const user = authentication.currentUser;
    try {
        if (photoURL && (photoURL !== currentPhoto)) {
            const blob = await (await fetch(photoURL)).blob()
            const res = await uploadBytes(ref(storage, `/profiles/${userId}/${filename}`), blob)
            const imageURL = await getDownloadURL(res.metadata.ref);
            photoURL = imageURL;
        } else if(!photoURL) {
            photoURL = "";
        }
        await Promise.all([
            updateProfile(user, { displayName, photoURL }),
            updateDoc(doc(db, "users", userId), {
                username: displayName,
                image: filename
            })
        ]);
        user.reload();
        const token = user.refreshToken;
        dispatch({ type: SET_USER, payload: { user: {...user}, token } });
        return photoURL;
    } catch (e) {
        return e;
    }
};

const register = dispatch => async ({ email, password, confirmPassword }) => {
    if (password === confirmPassword) {
        try {
            const result = await createUserWithEmailAndPassword(authentication, email, password);
            await sendEmailVerification(result.user);
        } catch (e) {
            return e;
        }
    }
};

const logout = dispatch => async navigate => {
    signOut(authentication);
    dispatch({ type: SET_USER, payload: { user: null, token: "" } });
    navigate("/");
};

const setUser = dispatch => (user, token) => dispatch({ type: SET_USER, payload: { user, token } });

export const { Context, Provider } = createContext(
    reducer,
    {
        login,
        register,
        setUser,
        logout,
        googleLogin,
        changeProfile,
        sendEmailConfirm
        // ACTIONS
    },
    INITIAL_STATE
);