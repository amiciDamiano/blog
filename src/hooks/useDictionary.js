import { useContext } from 'react'
import { LanguageContext } from '../contexts';

const useDictionary = () => {
    
    const { state: { dictionary } } = useContext(LanguageContext);
    
    return dictionary;
};

export default useDictionary;