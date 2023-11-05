import { onSnapshot, collection } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";

const useTags = () => {

    const [ tags, setTags ] = useState([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "tags"), async snapshot => {
            let result = [];
            for(let doc of snapshot.docs) {
                const data = doc.data();
                result.push({...data});
            }
            setTags(result);
        });
        return unsubscribe;
    }, []);

    return { tags };
};

export default useTags;