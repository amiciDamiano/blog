import { STORE_THEME_PREFERENCE, STORE_WAVE_PREFERENCE } from '../utilities';
import createContext from './createDataContext';

const OPEN_SIDEBAR = 'open_sidebar';
const CLOSE_SIDEBAR = 'close_sidebar';
const TOGGLE_DARK_MODE = 'toggle_dark_mode';
const SET_DARK_MODE = 'set_dark_mode';
const TOGGLE_WAVE = 'toggle_wave';
const SET_WAVE = 'set_wave';

const INITIAL_STATE = {
    sidebarOpen: false,
    dark: false,
    wave: false
};

const reducer = (state, action) => {
    switch(action.type) {
        case TOGGLE_WAVE: {
            localStorage.setItem(STORE_WAVE_PREFERENCE, !state.wave);
            return { ...state, wave: !state.wave };
        }
        case SET_WAVE: {
            return { ...state, wave: action.payload };
        }
        case TOGGLE_DARK_MODE: {
            localStorage.setItem(STORE_THEME_PREFERENCE, !state.dark);
            return { ...state, dark: !state.dark };
        }
        case SET_DARK_MODE: {
            return { ...state, dark: action.payload };
        }
        case OPEN_SIDEBAR: {
            return { ...state, sidebarOpen: true };
        }
        case CLOSE_SIDEBAR: {
            return { ...state, sidebarOpen: false };
        }
        default: {
            return state;
        }
    }
}

const toggleWave = (dispatch) => () => {
    dispatch({ type: TOGGLE_WAVE });
};
const setWave = (dispatch) => (value) => {
    dispatch({ type: SET_WAVE, payload: value });
};
const openSidebar = (dispatch) => () => {
    dispatch({ type: OPEN_SIDEBAR });
};
const closeSidebar = (dispatch) => () => {
    dispatch({ type: CLOSE_SIDEBAR });
};
const toggleDarkMode = (dispatch) => () => {
    dispatch({ type: TOGGLE_DARK_MODE });
};
const setDarkMode = (dispatch) => (value) => {
    dispatch({ type: SET_DARK_MODE, payload: value });
};
export const { Context, Provider } = createContext(
    reducer,
    {
        openSidebar,
        closeSidebar,
        toggleDarkMode,
        setDarkMode,
        setWave,
        toggleWave
        // ACTIONS
    },
    INITIAL_STATE
);