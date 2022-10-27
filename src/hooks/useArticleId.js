/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { db } from "../firebase";
import { ref, getStorage, getBlob } from 'firebase/storage';
import { doc, getDoc } from "firebase/firestore";

const storage = getStorage();

const useArticleId = (id, navigate) => {
    const [article, setArticle] = useState();

    useEffect(() => {
        const checkRoute = async () => {
            const _doc = await getDoc(doc(db, "articles", id));
            if(!_doc.exists()) {
                navigate("/404")
            } else {
                let _article = _doc.data();
                document.title = _article.title;
                const blob = await getBlob(ref(storage, `/articles_page/${_article.content}`));
                _article.content = await blob.text();
                setArticle(_article);
            }
        };
        
        checkRoute();
    }, []);
    
    return { article };
};

export default useArticleId;
