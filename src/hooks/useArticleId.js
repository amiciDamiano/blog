/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { db, storage } from "../firebase";
import { ref, getBlob, listAll } from 'firebase/storage';
import { doc, getDoc } from "firebase/firestore";

const getTextPromise = async ref => {
    const blob = await getBlob(ref);
    return await blob.text();
};

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
                const res = await listAll(ref(storage, `/articles_page/${_article.content}`));
                _article.pages = await Promise.all(res.items.map(getTextPromise))
                setArticle(_article);
            }
        };
        checkRoute();
    }, []);
    
    return { article };
};

export default useArticleId;
