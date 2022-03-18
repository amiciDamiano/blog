import { useEffect, useState } from 'react';
import { db } from "../firebase";
import { ref, getStorage, getBlob } from 'firebase/storage';
import { onSnapshot, collection, doc, getDoc } from "firebase/firestore";

const storage = getStorage();

const useArticleId = (id, navigate) => {
    const [article, setArticle] = useState();

    useEffect(() => {
        const checkRoute = async () => {
            const _doc = await getDoc(doc(db, "articles", id));
            if(!_doc.exists()) {
                navigate("/404")
            }
        };
        const unsubscribe = onSnapshot(collection(db, 'articles'), async snapshot => {
            let result;
            for(let doc of snapshot.docs) {
                if(doc.id === id) {
                  result = doc.data();
                  document.title = result.title;
                  const blob = await getBlob(ref(storage, `/articles_page/${result.content}`));
                  result.content = await blob.text();
                  break
                }
            }
            setArticle(result);
        });
        checkRoute();
        return unsubscribe;
    }, []);
    
    return { article };
};

export default useArticleId;
