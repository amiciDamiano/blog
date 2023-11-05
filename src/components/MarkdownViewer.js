import { useTheme } from '@mui/material';
import React from 'react';
import DarkMarkdown from './DarkMarkdown';
import LightMarkdown from './LightMarkdown';

const MarkdownViewer = ({ content }) => {
    const theme = useTheme();

    if (theme.palette.mode === "light") {
        return <LightMarkdown>{content}</LightMarkdown>
    } else {
        return <DarkMarkdown>{content}</DarkMarkdown>
    }
}

export default MarkdownViewer