import React from 'react'
import { useArticlePagination } from '../hooks';
import MarkdownViewer from './MarkdownViewer';
import Author from './Author';
import { Box, Pagination, Stack, Typography } from '@mui/material';
import { fireDateToDate } from '../utilities';
import moment from 'moment';
import GlassCard from './GlassCard';

const MarkdownPaged = ({ pages, author, createDate, ...data }) => {
    const { page, article, setPage } = useArticlePagination(pages);
    return (
        <Stack spacing={2} directin="column">
            <Box sx={{ px: theme => theme.spacing(4) }}>
                <Stack sx={{ p: theme => theme.spacing(2) }} component={GlassCard} justifyContent="space-between" direction="row" alignItems="center">
                    <Author id={author} />
                    {pages.length > 1 && (
                        <Pagination count={pages.length} page={page} onChange={(e, value) => setPage(value)} />
                    )}
                    <Typography sx={{ display: { xs: "none" } }}>
                        {moment(fireDateToDate(createDate)).format("DD/MM/YYYY HH:mm")}
                    </Typography>
                </Stack>
            </Box>
            <MarkdownViewer content={article} />
            {pages.length > 1 && (
                <Box sx={{ px: theme => theme.spacing(4) }}>
                    <Stack sx={{ p: theme => theme.spacing(2) }} component={GlassCard} justifyContent="center" direction="row" alignItems="center">
                        <Pagination count={pages.length} page={page} onChange={(e, value) => setPage(value)} />
                    </Stack>
                </Box>
            )}
        </Stack>
    )
}

export default MarkdownPaged