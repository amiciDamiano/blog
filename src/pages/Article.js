import React from 'react';
import { useTheme } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useArticleId } from '../hooks';
import Loading from './Loading';
import DarkMarkdown from '../components/DarkMarkdown';
import LightMarkdown from '../components/LightMarkdown';

const Article = () => {

    const navigate = useNavigate();
    const { id } = useParams();
    const theme = useTheme();

    const { article } = useArticleId(id, navigate);

    if (!article) {
        return <Loading />;
    }

    if(theme.palette.mode === "light") {
        return <LightMarkdown>{article.content}</LightMarkdown>
    } else {
        return <DarkMarkdown>{article.content}</DarkMarkdown>
    }
}

export default Article;