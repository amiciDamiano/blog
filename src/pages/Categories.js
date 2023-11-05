import React from 'react'
import { Box, Container, CardActionArea, CardContent, CardMedia, Grid, Typography } from '@mui/material'
import { useCategories, useTranslatedTitle } from '../hooks';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import GlassCard from '../components/GlassCard';

const Categories = () => {

    let { categories } = useCategories();

    useTranslatedTitle('categories');
    
    return (
        <Box component={Container} sx={{ textAlign: 'center' }}>
            {categories.length <= 0 && <Loading />}
            <Grid container spacing={2}>
                {
                    categories.map(category => (
                        <Grid key={category.name} item xs={12} md={6} lg={4}>
                            <GlassCard>
                                <CardActionArea component={Link} to={`${category.name}`}>
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image={category.image}
                                        src='img'
                                        alt={category.name}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom sx={{ textTransform: 'capitalize' }} variant="h5" component="div">
                                            {category.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {category.name}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </GlassCard>
                        </Grid>
                    ))
                }
            </Grid>
        </Box>
    );
}

export default Categories;
