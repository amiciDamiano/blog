import Prism from 'prismjs';
import { ListItem, Typography, Link, Box } from '@mui/material';
import Markdown from 'markdown-to-jsx';
import React, { useEffect } from 'react';
// import "../assets/styles/prism-light.css";

const LightMarkdown = (props) => {

    useEffect(() => {
        Prism.highlightAll();
    });

    return (
        <>
            <style scoped><link rel="stylesheet" href={`${process.env.PUBLIC_URL}/styles/prism-light.css`} /></style>
            <Markdown
                options={{
                    wrapper: (props) => <Box {...props} sx={{ px: theme => theme.spacing(4) }} />,
                    overrides: {
                        p: { component: Typography, props: { paragraph: true } },
                        a: { component: Link, props: { color: 'secondary', target: '_blank' } },
                        li: {
                            component: (props) => <ListItem sx={{ marginTop: theme => theme.spacing(1) }}>
                                <Typography {...props} component="span" />
                            </ListItem>
                        },
                        img: { props: { style: { marginLeft: 5, marginRight: 5 } } }
                    }
                }}
                {...props}
            >{props.children}</Markdown>
        </>
    )
}

export default LightMarkdown
