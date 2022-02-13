import { useContext, useEffect } from "react";
import { LanguageContext } from "../contexts";

const useTranslatedTitle = (key, prop = null) => {

    const { state: { dictionary } } = useContext(LanguageContext);
    
    useEffect(() => {
        if(!prop) {
            document.title = dictionary[key];
        } else {
            document.title = dictionary[key][prop];
        }
    }, [dictionary, key]);
}

export default useTranslatedTitle;