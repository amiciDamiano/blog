import { useEffect, useState } from 'react';
import { db } from "../firebase";
import { onSnapshot, collection } from "firebase/firestore";
import { getDownloadURL, getStorage, ref } from 'firebase/storage';

const storage = getStorage();
const useCategoryArticles = (category) => {
    
    const [ articles, setArticles ] = useState([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "articles"), async snapshot => {
            let result = [];
            for(let doc of snapshot.docs) {
                const data = doc.data();
                if(category === data.category) {
                    let image = '';
                    if(data.image) {
                        image = await getDownloadURL(ref(storage, `/articles/${data.image}`));
                    }
                    result.push({ ...data, image, id: doc.id });
                    if(result.length > 7) {
                        break;
                    }
                }
            }
            setArticles(result);
        });
        return unsubscribe;
    }, []);

    return { articles };
};

export default useCategoryArticles;
