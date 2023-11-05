import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useArticleId } from '../hooks';
import Loading from './Loading';
import MarkdownPaged from '../components/MarkdownPaged';

const Article = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    
    const { article } = useArticleId(id, navigate);

    if (!article) {
        return <Loading />;
    }

    return <MarkdownPaged {...article} />;
}

export default Article;