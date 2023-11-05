import React, { useRef, useState } from 'react'
import { useCategories, useDictionary, useForm, useTags } from '../hooks';
import {
    CancelTwoTone,
    CheckTwoTone,
    DeleteTwoTone,
    InsertDriveFileTwoTone,
    LoopTwoTone,
    PhotoCameraTwoTone
} from '@mui/icons-material';
import {
    Autocomplete,
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
    createFilterOptions
} from '@mui/material';
import GlassCard from './GlassCard';
import { isRequired } from '../hooks/useForm';
import CreateCategoryDialog from './CreateCategoryDialog';
import TagList from './TagList';

const filter = createFilterOptions();

const ConfirmCreateArticle = ({ open, setOpen, handleConfirm }) => {
    const dictionary = useDictionary();
    const fileRef = useRef();
    const [openCreateCategory, setOpenCreateCategory] = useState(null);
    const [insertedTags, setTags] = useState([]);
    const { tags } = useTags();
    const validations = [
        ({ title }) => isRequired(title) || { title: dictionary["article"]["errors"]["title_required"] },
        ({ category }) => isRequired(category) || { category: dictionary["article"]["errors"]["category_requried"] }
    ];
    const { categories } = useCategories();
    const {
        values,
        changeHandler,
        errors,
        touched,
        isValid
    } = useForm({
        photoURL: "",
        title: "",
        category: ""
    }, validations);

    const changePicture = ({ target }) => {
        changeHandler("photoURL", URL.createObjectURL(target.files[0]));
    };
    const deleteTempPhoto = () => {
        fileRef.current.value = null;
        changeHandler("photoURL", undefined);
    };
    const addTag = ({ target }) => {
        if (target.value && !insertedTags.includes(target.value)) {
            setTags(_ => [..._, target.value]);
            setTimeout(() => target.value = null);
        };
    };
    return (
        <React.Fragment>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" >
                        <Typography variant="h5">
                            {dictionary["article"]["insert_data"]}
                        </Typography>
                        <IconButton onClick={() => setOpen(false)}>
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
                                alt={"article photo"}
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
                                        fullWidth
                                        label={dictionary["article"]["insert_title"]}
                                        size="small"
                                        error={Boolean(touched.title && errors.title)}
                                        helperText={touched.title && errors.title}
                                        onChange={({ target }) => changeHandler("title", target.value)}
                                        value={values.title || ""}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Autocomplete
                                        fullWidth
                                        renderInput={params => <TextField
                                            {...params}
                                            label={dictionary["article"]["insert_category"]}
                                            size="small"

                                            error={Boolean(touched.category && errors.category)}
                                            helperText={touched.category && errors.category}
                                        />}
                                        freeSolo
                                        options={categories?.map(_ => _.name) || []}
                                        onChange={(e, value) => {
                                            const newValue = value?.inputValue || value;
                                            if (!newValue) {
                                                changeHandler("category", newValue);
                                            }
                                            if (categories.map(_ => _.name).includes(newValue)) {
                                                changeHandler("category", newValue);
                                            } else {
                                                setOpenCreateCategory(newValue);
                                                changeHandler("category", newValue)
                                            }
                                        }}
                                        selectOnFocus
                                        clearOnBlur
                                        handleHomeEndKeys
                                        getOptionLabel={(option) => {
                                            if (typeof option === 'string') {
                                                return option;
                                            }
                                            if (option.inputValue) {
                                                return option.inputValue;
                                            }
                                            return option.title;
                                        }}
                                        value={values.category || ""}
                                        filterOptions={(options, params) => {
                                            const filtered = filter(options, params);
                                            if (params.inputValue !== '') {
                                                filtered.push({
                                                    inputValue: params.inputValue,
                                                    title: `${dictionary["add"]} "${params.inputValue}"`,
                                                });
                                            }
                                            return filtered;
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Stack direction="column" spacing={2}>
                                        <Autocomplete
                                            freeSolo
                                            autoHighlight
                                            size="small"
                                            renderInput={params => (
                                                <TextField
                                                    label={dictionary["article"]["insert_tag"]}
                                                    size="small"
                                                    fullWidth {...params}
                                                    onKeyPress={e => {
                                                        if (e.key === "Enter") {
                                                            addTag(e);
                                                        }
                                                    }}
                                                    onBlur={addTag}
                                                />
                                            )}
                                            options={tags.map(_ => _.name)}
                                        />
                                        <TagList
                                            tags={insertedTags}
                                            canDelete
                                            onDelete={index => setTags(_ => {
                                                const __ = [..._];
                                                __.splice(index, 1);
                                                return __;
                                            })}
                                        />
                                    </Stack>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label={dictionary["article"]["insert_description"]}
                                        size="small"
                                        error={Boolean(touched.description && errors.description)}
                                        helperText={touched.description && errors.description}
                                        onChange={({ target }) => changeHandler("description", target.value)}
                                        value={values.description || ""}
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
                            onClick={() => setOpen(false)}
                            variant="outlined"
                            color="warning"
                            startIcon={<CancelTwoTone />}
                        >
                            {dictionary["cancel"]}
                        </Button>
                        <Button
                            size="small"
                            onClick={() => handleConfirm({ ...values, filename: fileRef.current.files[0]?.name, tags: insertedTags })}
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
            <CreateCategoryDialog
                setOpen={setOpenCreateCategory}
                open={openCreateCategory}
                dictionary={dictionary}
                onCancel={() => changeHandler("category", null)}
            />
        </React.Fragment>
    )
}

export default ConfirmCreateArticle