import { useEffect } from "react";
import useDictionary from "./useDictionary";

const useTranslatedTitle = (key, prop = null) => {

    const dictionary = useDictionary();
    
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