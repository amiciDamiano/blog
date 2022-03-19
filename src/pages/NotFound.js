import { 
    Container, 
    Box, 
    Button, 
    Card, 
    CardActions, 
    CardContent, 
    Typography 
} from '@mui/material';
import React from 'react'
import { Link } from 'react-router-dom';
import { useDictionary } from '../hooks';

const NotFound = () => {

    const dictionary = useDictionary();

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
