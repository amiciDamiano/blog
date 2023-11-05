import { Box, Card, Container, CardActionArea, CardContent, CardMedia, Typography, Stack } from '@mui/material';
import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Loading from './Loading';
import GlassCard from '../components/GlassCard';
import { useCategoryArticles, useDictionary, useTranslatedTitle } from '../hooks';
import Lottie from 'lottie-react';
import { LottieNoData } from '../assets/lotties';

const Category = () => {
    const { category } = useParams();
    const navigate = useNavigate();
    const dictionary = useDictionary();

    const { articles } = useCategoryArticles(category, navigate);

    useTranslatedTitle(category, 'title');

    return (
        <Box component={Container} sx={{ textAlign: 'center' }}>
            <Typography sx={{ mb: theme => theme.spacing(2) }} variant="h2" >{dictionary[category]?.title || category}</Typography>
            {articles.length <= 0 && <Lottie loop style={{ height: "calc(100vh - 72px - 24px - 24px - 64px - 16px)" }} animationData={LottieNoData} />}
            <Stack spacing={2}>
                {articles.map(article => (
                    <GlassCard sx={{ textAlign: 'left' }} key={article.title}>
                        <CardActionArea sx={{ display: { xs: 'block', md: 'flex', lg: 'flex' } }} component={Link} to={`${article.id}`}>
                            {article.image && (
                                <CardMedia
                                    component="img"
                                    sx={{ 
                                        maxWidth: { xs: 250, md: 250, lg: 250 },
                                        maxHeight: 170
                                    }}
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
                    </GlassCard>
                ))}
            </Stack>
        </Box>
    );
};

export default Category;
