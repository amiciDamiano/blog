import { Box, Card, Container, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import React, { useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Loading from './Loading';
import { LanguageContext } from '../contexts';
import { useCategoryArticles, useTranslatedTitle } from '../hooks';

const Category = () => {
    const { category } = useParams();
    const navigate = useNavigate();
    const { state: { dictionary } } = useContext(LanguageContext);

    const { articles } = useCategoryArticles(category, navigate);

    useTranslatedTitle(category, 'title');

    return (
        <Box component={Container} sx={{ textAlign: 'center' }}>
            <Typography sx={{ mb: theme => theme.spacing(2) }} variant="h1" >{dictionary[category]?.title}</Typography>
            { articles.length <= 0 && <Loading /> }
            { articles.map(article => (
                <Card sx={{ textAlign: 'left' }} key={article.title}>
                    <CardActionArea sx={{ display: { xs: 'block', md: 'flex', lg: 'flex' } }} component={Link} to={`${article.id}`}>
                        {article.image && (
                            <CardMedia
                                component="img"
                                sx={{ width: {xs: 250, md: 250, lg: 250} }}
                                image={article.image}
                                src='img'
                                alt={article.title}
                            />
                        )} 
                        <CardContent sx={{ flex: 1 }}>
                            <Typography gutterBottom sx={{ textTransform: 'capitalize' }} variant="h5" component="div">
                                {article.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{
                                display: '-webkit-box',
                                overflow: 'hidden',
                                WebkitBoxOrient: 'vertical',
                                WebkitLineClamp: 6
                            }} >
                                {article.description}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            ))}
        </Box>
    );
};

export default Category;
