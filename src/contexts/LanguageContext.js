import createContext from './createDataContext';
import it from '../assets/dictionaries/it.json';
import en from '../assets/dictionaries/en.json';

const CHANGE_LANGUAGE = 'change_language';
const OPEN_LANGUAGE_MENU = 'open_language_menu';
const CLOSE_LANGUAGE_MENU = 'close_language_menu';

const INITIAL_STATE = {
    dictionary: it,
    language: 'Italiano',
    languageAbbr: 'it',
    menuOpened: false,
    languages: {
        'en': {
            label: 'English',
            dictionary: en
        },
        'it': {
            label: 'Italiano',
            dictionary: it
        }
    }
};

const reducer = (state, action) => {
    switch(action.type) {
        case CHANGE_LANGUAGE: {
            localStorage.setItem(process.env.REACT_APP_LANGUAGE_PREFERENCE, action.payload);
            return { ...state, menuOpened: false, languageAbbr: action.payload, language: state.languages[action.payload].label, dictionary: state.languages[action.payload].dictionary };
        }
        case OPEN_LANGUAGE_MENU: {
            return { ...state, menuOpened: true };
        }
        case CLOSE_LANGUAGE_MENU: {
            return { ...state, menuOpened: false };
        }
        default: {
            return state;
        }
    }
}

const onChangeLanguage = (dispatch) => (language) => {
    dispatch({ type: CHANGE_LANGUAGE, payload: language });
};
const openMenu = (dispatch) => () => {
    dispatch({ type: OPEN_LANGUAGE_MENU });
};
const closeMenu = (dispatch) => () => {
    dispatch({ type: CLOSE_LANGUAGE_MENU });
};

export const { Context, Provider } = createContext(
    reducer,
    {
        onChangeLanguage,
        openMenu,
        closeMenu,
        // ACTIONS
    },
    INITIAL_STATE
);