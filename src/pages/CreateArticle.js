import { Box, CircularProgress, Fab, Pagination, Stack, TextField, Tooltip, useTheme } from '@mui/material';
import React, { useState } from 'react';
import MarkdownViewer from '../components/MarkdownViewer';
import ResizableStack from '../components/ResizableStack';
import { InsertPageBreakTwoTone, NoteAddTwoTone, SaveTwoTone } from '@mui/icons-material';
import { useAppBarHeight, useArticleCreate, useDictionary } from '../hooks';
import ConfirmDialog from '../components/ConfirmDialog';
import ConfirmCreateArticle from '../components/ConfirmCreateArticle';

const CreateArticle = () => {
    const theme = useTheme();
    const dictionary = useDictionary();
    const appbarHeight = useAppBarHeight();
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [confirmSave, setConfirmSave] = useState(false);
    const {
        article,
        setArticle,
        handleSave,
        addPage,
        deletePage,
        page,
        setPage,
        totPages,
    } = useArticleCreate(dictionary);

    return (
        <React.Fragment>
            <Box p={1}>
                <Stack position="fixed" right={theme.spacing(1)} top={`calc(${appbarHeight}px + ${theme.spacing(1)})`} direction="column" spacing={2} alignItems="center" justifyContent="center">
                    <Tooltip placement="left" title={dictionary["article"]["save"]}>
                        <Fab onClick={() => setConfirmSave(true)} size="small" color="primary">
                            <SaveTwoTone />
                        </Fab>
                    </Tooltip>
                    <Tooltip placement="left" title={dictionary["article"]["add_page"]}>
                        <Fab onClick={addPage} size="small" color="primary">
                            <NoteAddTwoTone />
                        </Fab>
                    </Tooltip>
                    <Tooltip placement="left" title={dictionary["article"]["del_page"]}>
                        <span>
                            <Fab disabled={totPages <= 1} onClick={() => setConfirmDelete(true)} size="small" color="primary">
                                <InsertPageBreakTwoTone />
                            </Fab>
                        </span>
                    </Tooltip>
                </Stack>
                <Stack direction="column" spacing={2}>
                    <Stack justifyContent="center" direction="row" alignItems="center">
                        <Pagination count={totPages} page={page} onChange={(e, value) => setPage(value)} />
                    </Stack>
                    <ResizableStack direction="row">
                        <TextField
                            multiline
                            sx={{
                                "& fieldset": {
                                    border: "0!important"
                                },
                                m: 0,
                                p: 0,
                                backgroundColor: "transparent",
                                width: "100%",
                                height: "100%",
                                border: 0,
                            }}
                            value={article}
                            onChange={({ target }) => setArticle(target.value)}
                        />
                        <Box height="100%" display={!article && "flex"} justifyContent="center" alignItems="center">
                            {article
                                ? (
                                    <Box p={2}>
                                        <MarkdownViewer content={article} />
                                    </Box>
                                )
                                : <CircularProgress />
                            }
                        </Box>
                    </ResizableStack>
                </Stack>
            </Box>
            <ConfirmCreateArticle 
                open={confirmSave}
                setOpen={setConfirmSave}
                handleConfirm={(confirmForm) => handleSave(confirmForm)}
            />
            <ConfirmDialog 
                open={confirmDelete} 
                setOpen={setConfirmDelete}
                handleConfirm={() => {
                    deletePage();
                    setConfirmDelete(false);
                }}
            />
        </React.Fragment>
    )
}

export default CreateArticle