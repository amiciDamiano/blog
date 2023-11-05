import { getContrastRatio } from "@mui/material";

export const STORE_TOKEN = process.env.REACT_APP_TOKEN;
export const STORE_USER = process.env.REACT_APP_USER;
export const STORE_THEME_PREFERENCE = process.env.REACT_APP_THEME_PREFERENCE;
export const STORE_WAVE_PREFERENCE = process.env.REACT_APP_WAVE_PREFERENCE;
export const STORE_LANGUAGE_PREFERENCE = process.env.REACT_APP_LANGUAGE_PREFERENCE;
export const PUBLIC_URL = process.env.PUBLIC_URL;
export const getTextColor = (background) => getContrastRatio("#fff", background) > 4.5 ? '#fff' : '#111'
export const replaceParams = (string, params) => {
    params.forEach((v, i) => {
        string = string.replace(`$${i}`, v);
    });
    return string;
}
export const getRandomColor = () => `#${Math.floor(Math.random()*16777215).toString(16)}`;
export const getExtension = filename => filename.split('.').at(-1);
export const fireDateToDate = (timestamp) => timestamp.toDate();