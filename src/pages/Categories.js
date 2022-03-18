import { Box, Container, Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from '@mui/material'
import { Link } from 'react-router-dom';
import React, { useContext } from 'react'
import { LanguageContext } from '../contexts';
import { useCategories, useTranslatedTitle } from '../hooks';
import Loading from './Loading';

const Categories = () => {

    let { categories } = useCategories();
    const { state: { dictionary } } = useContext(LanguageContext);

    useTranslatedTitle('categories');
    
    return (
        <Box component={Container} sx={{ textAlign: 'center' }}>
            {categories.length <= 0 && <Loading />}
            {/* <Typography variant='h1'>{dictionary['categories']}</Typography> */}
            <Grid container spacing={2}>
                {
                    categories.map(category => (
                        <Grid key={category.name} item xs={12} md={6} lg={4}>
                            <Card>
                            {/* <Link style={{ textDecoration: 'none', color: 'inherit' }} to={`${category.name}`}> */}
                                <CardActionArea component={Link} to={`${category.name}`}>
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image={category.image}
                                        src='img'
                                        alt={dictionary[category.name].title}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom sx={{ textTransform: 'capitalize' }} variant="h5" component="div">
                                            {dictionary[category.name].title}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {dictionary[category.name].description}
                                        </Typography>
                                    </CardContent>
                                    {/* <CardActions sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }} >
                                            <Button size="small">{dictionary['goToArticles']}</Button>
                                        </CardActions> */}
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))
                }
            </Grid>
        </Box>
    );
}

export default Categories;
