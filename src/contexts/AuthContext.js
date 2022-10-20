import createContext from './createDataContext';
import { 
    createUserWithEmailAndPassword, 
    getAuth, 
    signInWithEmailAndPassword, 
    signOut, 
    GoogleAuthProvider, 
    signInWithPopup 
} from 'firebase/auth';
import { STORE_TOKEN, STORE_USER } from '../utilities';

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
        const authentication = getAuth();
        await signInWithEmailAndPassword(authentication, email, password);
    } catch(e) {
        return e;
    }
};

const googleLogin = dispatch => async () => {
    try {
        const googleProvider = new GoogleAuthProvider();
        const authentication = getAuth();
        await signInWithPopup(authentication, googleProvider);
    } catch(e) {
        return e;
    }
};

const register = dispatch => async ({ email, password, confirmPassword }) => {
    if (password === confirmPassword) {
        try {
            const authentication = getAuth();
            await createUserWithEmailAndPassword(authentication, email, password)
        } catch(e) {
            return e;
        }
    }
};

const logout = dispatch => async navigate => {
    const authentication = getAuth();
    signOut(authentication);
    dispatch({ type: SET_USER, payload: { user: null, token: "" }});
    navigate("/");
};

const setUser = dispatch => (user, token) => dispatch({ type: SET_USER, payload: { user, token }});

export const { Context, Provider } = createContext(
    reducer,
    {
        login,
        register,
        setUser,
        logout,
        googleLogin
        // ACTIONS
    },
    INITIAL_STATE
);