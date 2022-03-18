import { useContext, useEffect } from "react";
import { LanguageContext } from "../contexts";

const useTranslatedTitle = (key, prop = null) => {

    const { state: { dictionary } } = useContext(LanguageContext);
    
    useEffect(() => {
        if(!prop) {
            document.title = dictionary[key];
        } else {
            if(dictionary && dictionary[key] && dictionary[key][prop]) {
                document.title = dictionary[key][prop];
            } else {
                document.title = dictionary.pageNotFound.title;
            }
        }
    }, [dictionary, key]);
}

export default useTranslatedTitle;