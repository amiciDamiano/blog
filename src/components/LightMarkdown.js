import Prism from 'prismjs';
import React, { useEffect } from 'react';
import { PUBLIC_URL } from '../utilities';
import MarkdownGeneric from './MarkdownGeneric';

const LightMarkdown = (props) => {

    useEffect(() => {
        Prism.highlightAll();
    });

    return (
        <>
            <style scoped><link rel="stylesheet" href={`${PUBLIC_URL}/styles/prism-light.css`} /></style>
            <MarkdownGeneric {...props} />
        </>
    )
}

export default LightMarkdown
