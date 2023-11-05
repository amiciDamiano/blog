import { useContext, useEffect, useRef } from 'react';
import useArticlePagination from './useArticlePagination';
import { ref, uploadBytes, uploadString } from 'firebase/storage';
import { useSnackbar } from 'notistack';
import { db, storage } from '../firebase';
import { getExtension } from '../utilities';
import { addDoc, collection } from 'firebase/firestore';
import { AuthContext } from '../contexts';

const useArticleCreate = (dictionary) => {
    const { state: { user } } = useContext(AuthContext);

    const FIRST_PAGE = `# ${dictionary['article']['create']}
${dictionary['article']['text']}

> ${dictionary['article']['paragraph']}

${dictionary['article']['table']}`;
    const NEW_PAGE = `# ${dictionary['article']['new_page']}`;
    const { enqueueSnackbar } = useSnackbar();
    const {
        pages,
        page,
        index,
        article,
        setPages,
        setPage,
    } = useArticlePagination([FIRST_PAGE]);
    
    const previousPagesLength = useRef(pages.length);

    useEffect(() => {
        if (previousPagesLength.current !== pages.length) {
            if (previousPagesLength.current < pages.length) {
                // added a page navigate to that page, it will be added next to the current page
                setPage(_ => _ + 1);

            } else if (previousPagesLength.current > pages.length) {
                // removed a page navigate to prev page
                setPage(_ => {
                    if(_ === 1) {
                        return 1
                    }
                    return _ - 1
                });
            }
        }
        previousPagesLength.current = pages.length;
    }, [pages, setPage]);

    const setArticle = value => {
        setPages(_ => {
            const __ = [..._];
            __[index] = value;
            return __;
        });
    };
    
    const handleSave = async ({ description, photoURL, title, category, filename, tags }) => {
        const articleImageName = `${title}.${getExtension(filename)}`;
        const articleImageRef = ref(storage, `articles/${articleImageName}`);
        const articleImage = await (await fetch(photoURL)).blob()
        const promises = [uploadBytes(articleImageRef, articleImage)];
        for(let pageIdx in pages) {
            const articlesPage = ref(storage, `articles_page/${title}/${pageIdx}.md`)
            promises.push(uploadString(articlesPage, pages[pageIdx]));
        }
        await Promise.all(promises);
        await addDoc(collection(db, "articles"), {
            title,
            author: user.uid,
            category,
            content: title,
            createDate: new Date(),
            description,
            image: articleImageName,
            tags,
        });
        enqueueSnackbar(dictionary["article"]["insert_success"], { variant: "success" });
    }
    const addPage = () => {
        setPages(_ => {
            const __ = [..._];
            __.splice(page, 0, NEW_PAGE);
            return __;
        });
    }
    const deletePage = () => {
        setPages(_ => {
            const __ = [..._];
            __.splice(index, 1);
            return __;
        });
    }
    return {
        article,
        setArticle,
        handleSave,
        addPage,
        deletePage,
        page,
        setPage,
        totPages: pages.length,
        dictionary,
    };
}

export default useArticleCreate