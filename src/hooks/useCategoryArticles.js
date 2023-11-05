import { useEffect, useState } from 'react';
import { db, storage } from "../firebase";
import { onSnapshot, collection, where, query, getDocs } from "firebase/firestore";
import { getDownloadURL, ref } from 'firebase/storage';

const useCategoryArticles = (category, navigate) => {
    
    const [ articles, setArticles ] = useState([]);

    useEffect(() => {
        const existRouteQuery = query(
            collection(db, "categories"), 
            where("name", "==", category)
        );
        const checkRoute = async () => {
            const docs = await getDocs(existRouteQuery);
            if(!docs.size) {
                navigate("/404")
            }
        };
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
        checkRoute();
        return unsubscribe;
    }, [category]);

    return { articles };
};

export default useCategoryArticles;
