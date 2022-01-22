import { Grid, Paper, Typography } from '@mui/material'
import React, { useEffect } from 'react'

const Article = () => {

    useEffect(() => {
        document.title = 'Articoli'
    }, []);

    return (
        <div align="center">
            <Typography variant='h1'>Article Title</Typography>
            <Grid container>
                <Grid item xs={12} md={6} lg={4}>
                    <Paper sx={{ width: "100%", textAlign: 'center' }}>
                        <Typography variant='body1'>
                            Lorem Ipsum
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}

export default Article;
