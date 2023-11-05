import React, { useContext } from 'react'
import { Box, CardActionArea, Tooltip, CardContent, CardMedia, Fab, Grid, Stack, Typography, Button } from '@mui/material';
import { AuthContext } from '../contexts';
import { useDictionary, useUserArticles } from '../hooks';
import GlassCard from './GlassCard';
import { Link } from 'react-router-dom';
import Lottie from 'lottie-react';
import { LottieNoData } from '../assets/lotties';
import { AddTwoTone } from '@mui/icons-material';

const MyArticles = () => {
    const { state: { user } } = useContext(AuthContext);
    const { articles } = useUserArticles(user);
    const dictionary = useDictionary();
    return (
        <Stack alignItems="flex-end" direction="column" spacing={2}>
            <Grid container spacing={2}>
                {(articles && articles.length <= 0) && (
                    <Grid sx={{ display: "flex", justifyContent: "center", alignItems: "center" }} item xs={12}>
                        <Stack spacing={2} direction="row" alignItems="center">
                            <Lottie animationData={LottieNoData} style={{ height: 250 }} />
                            <Tooltip title={dictionary["article"]["create"]}>
                                <Fab
                                    component={Link}
                                    to={"article"}
                                    color="primary"
                                >
                                    <AddTwoTone />
                                </Fab>
                            </Tooltip>
                        </Stack>
                    </Grid>
                )}
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
            <Stack spacing={2} direction="row" justifyContent="flex-end" alignItems="center">
                <Button
                    startIcon={<AddTwoTone />} 
                    size="small"
                    variant="contained"
                    component={Link} 
                    to="article"
                >
                    {dictionary["article"]["create"]}
                </Button>
            </Stack>
        </Stack>
    )
}

export default MyArticles