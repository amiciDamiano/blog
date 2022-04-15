import { Close } from '@mui/icons-material';
import { AppBar, Button, Dialog, DialogContent, Grid, IconButton, Link, Stack, TextField, Toolbar, Typography, useMediaQuery } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../contexts';
import { useDictionary, useForm } from '../hooks';
import { isEmail, isRequired } from '../hooks/useForm';
import GoogleButton from './GoogleButton';
const INITIAL_STATE = {
    email: "",
    password: "",
    confirmPassword: ""
};
const Register = () => {

    const [open, setOpen] = useState(false);
    const { register } = useContext(AuthContext);
    const dictionary = useDictionary();
    const isMobile = useMediaQuery(theme => theme.breakpoints.down("md"));
    const validations = [
        ({ email }) => isRequired(email) || { email: dictionary["register"]["errors"]["email"] },
        ({ email }) => isEmail(email) || { email: dictionary["register"]["errors"]["isNotEmail"] },
        ({ password }) => isRequired(password) || { password: dictionary["register"]["errors"]["password"] },
        ({ confirmPassword }) => isRequired(confirmPassword) || { confirmPassword: dictionary["register"]["errors"]["confirmPasswordRequired"] },
        ({ password, confirmPassword }) => confirmPassword === password || { confirmPassword: dictionary["register"]["errors"]["notMatchPassword"] },
    ];
    const {
        values: { email, password, confirmPassword },
        changeHandler,
        errors,
        touched,
        isValid,
        reset
    } = useForm(INITIAL_STATE, validations);

    const handleRegister = (e) => {
        e.preventDefault();
        register({ email, password, confirmPassword });
        setOpen(false);
    };

    useEffect(() => {
        if(!open) {
            reset();
        }
    }, [open]);

    return (
        <React.Fragment>
            <Link onClick={() => setOpen(true)}>
                {dictionary["login"]["noAccount"]}
            </Link>
            <Dialog
                fullScreen={isMobile}
                fullWidth
                maxWidth="sm"
                draggable
                open={open}
                onClose={() => setOpen(false)}>
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            {dictionary["register"]["title"]}
                        </Typography>
                        <IconButton onClick={() => setOpen(false)}>
                            <Close />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6} lg={6}>
                            <Stack spacing={2}>
                                <GoogleButton text={"Sign up with google"} onClick={() => console.log("google button")} />
                            </Stack>
                        </Grid>
                        <Grid item xs={12} md={6} lg={6}>
                            <Grid component="form" container spacing={2}>
                                <Grid item xs={12} md={12} lg={12}>
                                    <TextField
                                        fullWidth
                                        type="email"
                                        size="small"
                                        label={dictionary["register"]["email"]}
                                        error={Boolean(touched.email && errors.email)}
                                        helperText={touched.email && errors.email}
                                        value={email}
                                        onChange={({ target }) => changeHandler("email", target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12} md={12} lg={12}>
                                    <TextField
                                        fullWidth
                                        type="password"
                                        autoComplete="current-password"
                                        size="small"
                                        label={dictionary["register"]["password"]}
                                        error={Boolean(touched.password && errors.password)}
                                        helperText={touched.password && errors.password}
                                        value={password}
                                        onChange={({ target }) => changeHandler("password", target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12} md={12} lg={12}>
                                    <TextField
                                        fullWidth
                                        type="password"
                                        autoComplete="confirm-password"
                                        size="small"
                                        label={dictionary["register"]["confirmPassword"]}
                                        error={Boolean(touched.confirmPassword && errors.confirmPassword)}
                                        helperText={touched.confirmPassword && errors.confirmPassword}
                                        value={confirmPassword}
                                        onChange={({ target }) => changeHandler("confirmPassword", target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12} md={12} lg={12}>
                                    <Stack direction="row" sx={{ justifyContent: "space-between" }}>
                                        <Link onClick={() => setOpen(false)}>
                                            {dictionary["register"]["alreadyRegistered"]}
                                        </Link>
                                        <Button
                                            type="submit"
                                            disabled={!isValid}
                                            onClick={handleRegister}
                                            variant="contained"
                                        >
                                            {dictionary["register"]["submit"]}
                                        </Button>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    )
}

export default Register;