import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Stack, Typography } from '@mui/material'
import React from 'react'
import { useDictionary } from '../hooks'
import { CancelTwoTone, CheckTwoTone } from '@mui/icons-material';
import Lottie from 'lottie-react';
import { WarningData } from '../assets/lotties';

const ConfirmDialog = ({
    open,
    setOpen,
    title,
    content = undefined,
    handleConfirm,
    buttonText = undefined,
    cancelButtonText = undefined
}) => {
    const dictionary = useDictionary();
    const _buttonText = buttonText || dictionary["confirm"];
    const _cancelButtonText = cancelButtonText || dictionary["cancel"];
    const _title = title || dictionary["attention"]
    const _content = content || dictionary["are_you_sure"]
    return (
        <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle>
                <Stack direction="row" alignItems="center" justifyContent="space-between" >
                    <Typography variant="h5">
                        {_title}
                    </Typography>
                    <IconButton onClick={() => setOpen(false)}>
                        <CancelTwoTone />
                    </IconButton>
                </Stack>
            </DialogTitle>
            <DialogContent>
                <Stack spacing={2} direction="row" alignItems="center">
                    <Lottie style={{ height: 75 }} loop={false} animationData={WarningData} />
                    <Typography>{_content}</Typography>
                </Stack>
            </DialogContent>
            <DialogActions>
                <Stack spacing={2} direction="row" alignItems="center" justifyContent="flex-end">
                    <Button
                        size="small"
                        onClick={() => setOpen(false)}
                        variant="outlined"
                        color="warning"
                        startIcon={<CancelTwoTone />}
                    >
                        {_cancelButtonText}
                    </Button>
                    <Button
                        size="small"
                        onClick={handleConfirm}
                        variant="contained"
                        color="error"
                        startIcon={<CheckTwoTone />}
                    >
                        {_buttonText}
                    </Button>
                </Stack>
            </DialogActions>
        </Dialog>
    )
}

export default ConfirmDialog