import createContext from './createDataContext';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth';
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
}

const login = dispatch => async ({ email, password }) => {
    const authentication = getAuth();
    const { user, _tokenResponse } = await signInWithEmailAndPassword(authentication, email, password);
    const token = _tokenResponse.refreshToken;
    dispatch({ type: SET_USER, payload: { user, token } });
};
const register = dispatch => async ({ email, password, confirmPassword }) => {
    if (password === confirmPassword) {
        const authentication = getAuth();
        const { user, _tokenResponse } = await createUserWithEmailAndPassword(authentication, email, password)
        const token = _tokenResponse.refreshToken;
        dispatch({ type: SET_USER, payload: { user, token } });
    }
};

export const { Context, Provider } = createContext(
    reducer,
    {
        login,
        register
        // ACTIONS
    },
    INITIAL_STATE
);