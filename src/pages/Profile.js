import React, { useContext } from 'react'
import { Box, Card, CardActionArea, CardContent, CardMedia, Container, Stack, Typography } from '@mui/material';
import { AuthContext } from '../contexts';
import { useDictionary, useUserArticles } from '../hooks';
import Loading from './Loading';
import GlassCard from '../components/GlassCard';
import { Link } from 'react-router-dom';

const Profile = () => {

    const { state: { user } } = useContext(AuthContext);
    const { articles } = useUserArticles(user);
    const dictionary = useDictionary();
    
    return (
        <Box component={Container} sx={{ textAlign: 'center' }}>
            <Typography sx={{ mb: theme => theme.spacing(2) }} variant="h2" >{dictionary["profile"]["myArticles"]}</Typography>
            {articles === null && <Loading />}
            <Stack spacing={2}>
                {articles?.map(article => (
                    <GlassCard sx={{ textAlign: 'left' }} key={article.title}>
                        <CardActionArea sx={{ display: { xs: 'block', md: 'flex', lg: 'flex' } }} component={Link} to={`/${article.category}/${article.id}`}>
                            {article.image && (
                                <CardMedia
                                    component="img"
                                    sx={{ width: { xs: 250, md: 250, lg: 250 } }}
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
    )
}

export default Profile;