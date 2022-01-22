import { Box, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Paper, Typography } from '@mui/material';
import React, { useContext } from 'react'
import { LanguageContext } from '../contexts';
import { Link } from 'react-router-dom';

const NotFound = () => {

    const { state: { dictionary } } = useContext(LanguageContext);

    return (
        <Box
            component={Paper}
            sx={{
                alignItems: 'center',
                justifyContent: 'center',
                m: 0,
            }}
        >
            <Card>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {dictionary.pageNotFound.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {dictionary.pageNotFound.description}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Link to="" style={{ textDecoration: 'none' }}>
                        <Button size="small">
                            {dictionary.pageNotFound.goHome}
                        </Button>
                    </Link>
                </CardActions>
            </Card>
        </Box>
    )
}

export default NotFound;
