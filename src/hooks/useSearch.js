import { useState } from 'react';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const categoriesRef = collection(db, "categories");
const articlesRef = collection(db, "articles");

const useSearch = () => {
    const [loading, setLoading] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [options, setOptions] = useState([]);
    const [searchString, setSearchString] = useState('');

    const getArticles = async (value) => {
        const docs = await getDocs(articlesRef);
        const result = [];
        docs.forEach(doc => {
            const article = doc.data();
            if (article.title.toLowerCase().indexOf(value.toLowerCase()) !== -1) {
                result.push({
                    category: "articles",
                    title: article.title,
                    path: `/${article.category}/${doc.id}`
                });
            }
        });
        return result;
    };
    const getCategories = async (value) => {
        const docs = await getDocs(categoriesRef);
        const result = [];
        docs.forEach(doc => {
            const category = doc.data();
            if (category.name.toLowerCase().indexOf(value.toLowerCase()) !== -1) {
                result.push({
                    category: "categories",
                    title: category.name,
                    path: `/${category.name}`
                });
            }
        });
        return result;
    };
    const changeHandler = async (event) => {
        if (event) {
            const { target: { value } } = event;
            setSearchString(value);
            if (event.type === "change" && value.length >= 3) {
                setLoading(true);
                const articles = await getArticles(value);
                const categories = await getCategories(value);
                setOptions([...articles, ...categories]);
                setLoading(false);
            } else {
                setOptions([]);
            }
        }
    }

    return { loading, searchOpen, setSearchOpen, options, changeHandler, searchString };
}

export default useSearch;