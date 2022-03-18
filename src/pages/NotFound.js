import { 
    Container, 
    Box, 
    Button, 
    Card, 
    CardActions, 
    CardContent, 
    Typography 
} from '@mui/material';
import React, { useContext } from 'react'
import { LanguageContext } from '../contexts';
import { Link } from 'react-router-dom';

const NotFound = () => {

    const { state: { dictionary } } = useContext(LanguageContext);

    return (
        <Box
            component={Container}
            sx={{
                alignItems: 'center',
                justifyContent: 'center',
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
                    <Link to="/" style={{ textDecoration: 'none' }}>
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
