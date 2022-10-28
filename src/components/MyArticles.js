import React, { useContext } from 'react'
import { Box, CardActionArea, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { AuthContext } from '../contexts';
import { useUserArticles } from '../hooks';
import GlassCard from './GlassCard';
import { Link } from 'react-router-dom';

const MyArticles = () => {
    const { state: { user } } = useContext(AuthContext);
    const { articles } = useUserArticles(user);
    
    return (
        <Grid container spacing={2}>
            {articles?.map(article => (
                <Grid item xs={12} sm={6} md={4} key={article.id} >
                    <GlassCard sx={{ textAlign: 'left' }} key={article.title}>
                        <CardActionArea sx={{ display: "block" }} component={Link} to={`/${article.category}/${article.id}`}>
                            {article.image && (
                                <Box sx={{ height: 140, width: "100%", display: "flex", alignItems: "center" }}>
                                    <CardMedia
                                        component="img"
                                        sx={{ width: "100%" }}
                                        image={article.image}
                                        src='img'
                                        alt={article.title}
                                    />
                                </Box>
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
                </Grid>
            ))}
        </Grid>
    )
}

export default MyArticles