import { addDoc, collection } from "firebase/firestore";
import { db, storage } from "../firebase";
import { ref, uploadBytes } from "firebase/storage";
import { getExtension } from "../utilities";
import { useSnackbar } from "notistack";

const useCategoryCreate = dictionary => {

    const { enqueueSnackbar } = useSnackbar();

    const createCategory = async ({ photoURL, name, color, filename }) => {
        const image = `${name}.${getExtension(filename)}`
        const imageRef = ref(storage, `categories/${image}`);
        const imageBlob = await (await fetch(photoURL)).blob()
        try {
            await uploadBytes(imageRef, imageBlob)
            await addDoc(collection(db, "categories"), {
                image,
                name,
                color
            });
            enqueueSnackbar(dictionary["profile"]["success"], { variant: "success" })
        } catch(e) {
            console.error(e);
        }
    };

    return { createCategory }
}

export default useCategoryCreate