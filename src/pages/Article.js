import { Grid, Paper, Typography, Link, ListItem } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useArticleId } from '../hooks';
import Loading from './Loading';
import Markdown from 'markdown-to-jsx';
import Prism from "prismjs";
// import { languages } from "prismjs/components";
import "../assets/styles/prism.css";
import { useEffect } from 'react';

const Article = () => {
    const { id } = useParams();
    const { article } = useArticleId(id);

    useEffect(() => {
        if(article) {
            // Prism.languages.extend("jsx", languages.jsx)
            console.log(Prism)
            
            console.log("prism", Prism)
            Prism.highlightAll();
        }
    }, [article]);

    if (!article) {
        return <Loading />;
    }

    return (
        <div>
            <Grid container>
                <Grid item xs={12} md={12} lg={12}>
                    <Paper elevation={1} sx={{ width: "100%", p: theme => theme.spacing(2) }}>
                        <Markdown 
                            options={{
                                overrides: {
                                    p: { component: Typography, props: { paragraph: true } },
                                    a: { component: Link, props: { color: 'secondary', target: '_blank' }},
                                    li: {
                                        component: (props) => <ListItem sx={{ marginTop: theme => theme.spacing(1)}}>
                                            <Typography {...props} component="span" />
                                        </ListItem>,
                                    },
                                    pre: { component: (props) => <Paper {...props} elevation={5} component={"pre"} /> }
                                }
                            }}
                        >
                            {article.content}
                        </Markdown>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}

export default Article;