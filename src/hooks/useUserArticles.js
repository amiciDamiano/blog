import { useEffect, useState } from 'react';
import { db } from "../firebase";
import { onSnapshot, collection } from "firebase/firestore";
import { getDownloadURL, getStorage, ref } from 'firebase/storage';

const storage = getStorage();

const useUserArticles = (user) => {

    const [articles, setArticles] = useState(null);

    useEffect(() => {
        let isMount = true;
        const unsubscribe = onSnapshot(collection(db, "articles"), async snapshot => {
            if (isMount) {
                let result = [];
                for (let doc of snapshot.docs) {
                    const data = doc.data();
                    if (user.uid === data.author) {
                        let image = '';
                        if (data.image) {
                            image = await getDownloadURL(ref(storage, `/articles/${data.image}`));
                        }
                        result.push({ ...data, image, id: doc.id });
                        if (result.length > 7) {
                            break;
                        }
                    }
                }
                setArticles(result);
            }
        });
        return () => {
            unsubscribe();
            isMount = false;
        };
    }, [user]);

    return { articles };
};

export default useUserArticles;