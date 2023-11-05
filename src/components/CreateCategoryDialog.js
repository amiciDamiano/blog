import { 
    CancelTwoTone, 
    CheckTwoTone, 
    DeleteTwoTone, 
    InsertDriveFileTwoTone, 
    LoopTwoTone, 
    PhotoCameraTwoTone, 
} from '@mui/icons-material';
import {
    Avatar,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    IconButton,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import React, { useEffect, useRef } from 'react'
import GlassCard from './GlassCard';
import { useCategoryCreate, useForm } from '../hooks';
import { replaceParams } from '../utilities';
import { isRequired } from '../hooks/useForm';
import ColorPicker from './ColorPicker';

const CreateCategoryDialog = ({ onCancel, setOpen, open, dictionary }) => {
    const fileRef = useRef();
    const colorRef = useRef();

    const { createCategory } = useCategoryCreate(dictionary);
    
    const validations = [
        ({ photoURL }) => isRequired(photoURL) || { photoURL: dictionary["category"]["errors"]["photo_required"] },
        ({ name }) => isRequired(name) || { name: dictionary["category"]["errors"]["name_required"] },
    ];

    const {
        values,
        changeHandler,
        errors,
        touched,
        isValid,
        setValues,
        reset
    } = useForm({
        photoURL: "",
        name: ""
    }, validations);

    useEffect(() => {
        if (open) {
            setValues({ name: open });
        } else {
            reset();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open]);

    const changePicture = ({ target }) => {
        changeHandler("photoURL", URL.createObjectURL(target.files[0]));
    };
    const deleteTempPhoto = () => {
        fileRef.current.value = null;
        changeHandler("photoURL", undefined);
    };
    const handleConfirm = () => {
        createCategory({ ...values, color: colorRef.current, filename: fileRef.current.files[0]?.name })
    };

    return (
        <Dialog open={Boolean(open)} onClose={() => {
            onCancel();
            setOpen(null);
        }}>
            <DialogTitle>
                <Stack spacing={2} direction="row" alignItems="center" justifyContent="space-between" >
                    <Typography variant="h5">
                        {open ? replaceParams(dictionary["category"]["insert_category"], [values.name]) : ''}
                    </Typography>
                    <IconButton sx={{ ml: 2 }} onClick={() => {
                        onCancel();
                        setOpen(null);
                    }}>
                        <CancelTwoTone />
                    </IconButton>
                </Stack>
            </DialogTitle>
            <DialogContent>
                <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mt: _ => _.spacing(2) }}>
                    <Box
                        sx={{ flex: 1, maxWidth: 300, height: "auto", position: "relative" }}
                    >
                        <Stack sx={{
                            position: "absolute",
                            top: 10,
                            right: 10,
                            zIndex: 2
                        }} direction="row" spacing={2}>
                            {
                                values.photoURL && (
                                    <IconButton
                                        sx={{
                                            backgroundColor: "rgba(0,0,0,0.3)",
                                            color: theme => theme.palette.common.white
                                        }}
                                        onClick={deleteTempPhoto}
                                    >
                                        <DeleteTwoTone />
                                    </IconButton>
                                )
                            }
                            <IconButton
                                sx={{
                                    backgroundColor: "rgba(0,0,0,0.3)",
                                    color: theme => theme.palette.common.white
                                }}
                                aria-label="upload picture"
                                component="label"
                            >
                                <input ref={fileRef} hidden accept="image/*" type="file" onChange={changePicture} />
                                {!values.photoURL ? <PhotoCameraTwoTone /> : <LoopTwoTone />}
                            </IconButton>
                        </Stack>
                        <Avatar
                            sx={{ height: !values.photoURL ? 134 : "auto", width: "100%", maxWidth: 300 }}
                            variant="rounded"
                            component={GlassCard}
                            src={values.photoURL}
                            alt={"category photo"}
                        >
                            <InsertDriveFileTwoTone sx={{ height: 134, width: 134 }} />
                        </Avatar>
                    </Box>
                    <Box
                        sx={{ flex: { xs: 1, md: 2 } }}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    size="small"
                                    label={dictionary["category"]["insert_name"]}
                                    fullWidth
                                    helperText={touched.name && errors.name}
                                    error={Boolean(touched.name && errors.name)}
                                    value={values.name}
                                    onChange={({ target }) => changeHandler("name", target.value)}
                                />
                            </Grid>
                            <Grid sx={{ position: "relative", display: "inline-block" }} item xs={12} sm={6}>
                                <ColorPicker 
                                    label={dictionary["category"]["insert_color"]}
                                    ref={colorRef} 
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </Stack>
            </DialogContent>
            <DialogActions>
                <Stack spacing={2} direction="row" alignItems="center" justifyContent="flex-end">
                    <Button
                        size="small"
                        onClick={() => {
                            onCancel();
                            setOpen(null);
                        }}
                        variant="outlined"
                        color="warning"
                        startIcon={<CancelTwoTone />}
                    >
                        {dictionary["cancel"]}
                    </Button>
                    <Button
                        size="small"
                        onClick={handleConfirm}
                        variant="contained"
                        color="error"
                        disabled={!isValid}
                        startIcon={<CheckTwoTone />}
                    >
                        {dictionary["confirm"]}
                    </Button>
                </Stack>
            </DialogActions>
        </Dialog>
    );
}

export default CreateCategoryDialog