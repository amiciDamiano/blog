import { useState } from 'react'

const useArticlePagination = (initialPages) => {
    const [pages, setPages] = useState(initialPages);
    const [page, setPage] = useState(1);
    if(!pages) {
        return {};
    }
    const index = page - 1;
    const article = pages[index];
    const hasPrev = index > 0;
    const hasNext = page < (pages.length);
    
    const onNextPage = () => {
        setPage(_ => hasNext ? _ + 1 : _);
    };
    const onPrevPage = () => {
        setPage(_ => hasPrev ? _ - 1 : _);
    };
    
    return {
        pages,
        page,
        index,
        article,
        setPages,
        setPage,
        hasPrev,
        hasNext,
        onPrevPage,
        onNextPage,
    };
}

export default useArticlePagination