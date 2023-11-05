import { Box, Button, ListItem, TextField, Typography, Link as MuiLink, useTheme } from '@mui/material'
import Markdown from 'markdown-to-jsx'
import React from 'react'
// import { Link } from 'react-router-dom'

const MarkdownGeneric = (props) => {
    const theme = useTheme();
    return (
        <Markdown
            options={{
                wrapper: (props) => <Box {...props} sx={{ px: theme => theme.spacing(4) }} />,
                overrides: {
                    p: { component: Typography, props: { paragraph: true } },
                    a: { component: props => <MuiLink {...props} />, props: { style: { color: `${theme.palette.secondary.main}!important` }, target: '_blank' } },
                    li: {
                        component: (props) => <ListItem sx={{ display: "list-item", marginTop: theme => theme.spacing(1) }}>
                            <Typography {...props} component="span" />
                        </ListItem>
                    },
                    img: { props: { style: { marginLeft: 5, marginRight: 5 } } },
                    button: { component: Button },
                    input: { component: TextField }
                }
            }}
            {...props}
        >{props.children}</Markdown>
    )
}

export default MarkdownGeneric