/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useRef, useState } from 'react';
import GlassCard from './GlassCard';
import { Avatar, Grid, TextField, Stack, IconButton, Box, Button } from '@mui/material';
import { AuthContext } from '../contexts';
import { Check, Delete, Loop, PhotoCamera, Send, Undo } from '@mui/icons-material';
import { useDictionary, useForm } from '../hooks';
import { isRequired } from '../hooks/useForm';
import { useSnackbar } from 'notistack';
import { getAuth } from 'firebase/auth';

const ProfileInformations = () => {

    const fileRef = useRef();
    const dictionary = useDictionary();
    const [emailSended, setEmailSended] = useState(false);
    const { state: { user }, changeProfile, sendEmailConfirm, setUser } = useContext(AuthContext);
    const { enqueueSnackbar } = useSnackbar();
    const validations = [
        ({ displayName }) => isRequired(displayName) || { displayName: dictionary["profile"]["errors"]["displayName"]["required"] }
    ]
    const {
        values: profileInfo,
        changeHandler,
        errors,
        touched,
        isValid
    } = useForm({
        displayName: user.displayName,
        photoURL: user.photoURL,
        email: user.email
    }, validations);
    
    useEffect(() => {
        let checkForVerifiedInterval;
        if(!user.emailVerified && emailSended) {
            const auth = getAuth();
            checkForVerifiedInterval = setInterval(() => {
                auth.currentUser.reload();
                if(auth.currentUser.emailVerified) {
                    enqueueSnackbar(dictionary["auth"]["emailVerified"], { variant: "success" });
                    const token = auth.currentUser.refreshToken;
                    setUser({...auth.currentUser }, token);
                    clearInterval(checkForVerifiedInterval);
                }
            }, 1000);
        }
        return () => checkForVerifiedInterval && clearInterval(checkForVerifiedInterval);
    }, [emailSended]);

    const sendEmail = async () => {
        const error = await sendEmailConfirm();
        if(error) {
            enqueueSnackbar(dictionary["auth"]["errors"][error.code], { variant: "error" });
        } else {
            enqueueSnackbar(dictionary["auth"]["emailSended"], { variant: "success" })
            setEmailSended(true);
        }
    };
    const saveEdit = async () => {    
        const currentPhotoUrl = await changeProfile({
            ...profileInfo,
            currentPhoto: user.photoURL, 
            filename: fileRef.current.files[0]?.name, 
            userId: user.uid 
        });
        if(typeof currentPhotoUrl === "object") {
            // in case of errors
            enqueueSnackbar(dictionary["auth"]["errors"][currentPhotoUrl.code], { variant: "error"} )
            console.error(currentPhotoUrl);
        } else {
            changeHandler("photoURL", currentPhotoUrl);
            enqueueSnackbar(dictionary["profile"]["success"], { variant: "success"} )
        }
    };
    const resetPicture = () => {
        changeHandler("photoURL", user.photoURL);
    };
    const changePicture = ({ target }) => {
        changeHandler("photoURL", URL.createObjectURL(target.files[0]));
    };
    const deleteTempPhoto = () => {
        fileRef.current.value = null;
        changeHandler("photoURL", undefined);
    };

    return (
        <Stack direction={{xs: "column", sm: "row"}} spacing={2} sx={{ mt: _ => _.spacing(2) }}>
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
                        user.photoURL && (profileInfo.photoURL !== user.photoURL) && (
                            <IconButton
                                sx={{
                                    backgroundColor: "rgba(0,0,0,0.3)",
                                    color: theme => theme.palette.common.white
                                }}
                                onClick={resetPicture}
                            >
                                <Undo />
                            </IconButton>
                        )
                    }
                    {
                        profileInfo.photoURL && (
                            <IconButton
                                sx={{
                                    backgroundColor: "rgba(0,0,0,0.3)",
                                    color: theme => theme.palette.common.white
                                }}
                                onClick={deleteTempPhoto}
                            >
                                <Delete />
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
                        {!profileInfo.photoURL ? <PhotoCamera /> : <Loop />}
                    </IconButton>
                </Stack>
                <Avatar
                    sx={{ height: "auto", width: "100%", maxWidth: 300 }}
                    variant="rounded"
                    component={GlassCard}
                    src={profileInfo.photoURL}
                    alt={user.email}
                />
            </Box>
            <Box
                sx={{ flex: {xs: 1, md: 2} }}
            >
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            disabled
                            label="Email"
                            size="small"
                            value={profileInfo.email || ""}
                        />
                    </Grid>
                    <Grid item xs={12} md={6} >
                        <TextField
                            fullWidth
                            label={dictionary["profile"]["username"]}
                            size="small"
                            error={Boolean(touched.displayName && errors.displayName)}
                            helperText={touched.displayName && errors.displayName}
                            onChange={({ target }) => changeHandler("displayName", target.value)}
                            value={profileInfo.displayName || ""}
                        />
                    </Grid>
                    {/* <Grid item xs={12} md={6}>
                    </Grid> */}
                    <Grid item xs={12}>
                        <Stack direction="row" justifyContent="space-between">
                        <Button
                            variant={"contained"}
                            disableRipple={user.emailVerified}
                            sx={{ 
                                pointerEvents: user.emailVerified && "none", 
                                cursor: user.emailVerified && "default" 
                            }}
                            color={user.emailVerified ? "success" : "error"}
                            startIcon={user.emailVerified ? <Check /> : <Send />}
                            onClick={user.emailVerified ? null : sendEmail}
                        >
                            {user.emailVerified ? "VERIFIED" : dictionary["profile"]["sendConfirmationEmail"]}
                        </Button>
                            <Button 
                                variant="contained"
                                disabled={!isValid}
                                onClick={saveEdit}
                            >
                                    {dictionary["save"]}
                            </Button>
                        </Stack>
                    </Grid>
                </Grid>
            </Box>
        </Stack>
    )
}

export default ProfileInformations