import { onSnapshot, collection } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db, storage } from "../firebase";
import { getDownloadURL, ref } from 'firebase/storage';

const useCategories = () => {

    const [ categories, setCategories ] = useState([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "categories"), async snapshot => {
            let result = [];
            for(let doc of snapshot.docs) {
                const data = doc.data();
                const image = await getDownloadURL(ref(storage, `/categories/${data.image}`));
                result.push({...data, image});
            }
            setCategories(result);
        });
        return unsubscribe;
    }, []);

    return { categories };
};

export default useCategories;