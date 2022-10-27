import {
    AppBar,
    Button,
    Dialog,
    DialogContent,
    Grid,
    IconButton,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Stack,
    TextField,
    Toolbar,
    Typography,
    useMediaQuery,
    Link,
} from '@mui/material';
import { Close, Login as LoginIcon } from '@mui/icons-material';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts';
import { useDictionary, useForm } from '../hooks';
import { isEmail, isRequired } from '../hooks/useForm';
import GoogleButton from './GoogleButton';
import Register from './Register';
import { useSnackbar } from 'notistack';

const INITIAL_STATE = {
    email: "",
    password: "",
};
const Login = ({ inRegister = false }) => {
    const [open, setOpen] = useState(false);
    const dictionary = useDictionary();
    const validations = [
        ({ email }) => isRequired(email) || { email: dictionary["login"]["errors"]["email"] },
        ({ email }) => isEmail(email) || { email: dictionary["login"]["errors"]["isNotEmail"] },
        ({ password }) => isRequired(password) || { password: dictionary["login"]["errors"]["password"] },
    ];
    const isMobile = useMediaQuery(theme => theme.breakpoints.down("md"));
    const { login, googleLogin } = useContext(AuthContext);
    const { enqueueSnackbar } = useSnackbar();
    const {
        values: { email, password },
        changeHandler,
        errors,
        touched,
        isValid
    } = useForm(INITIAL_STATE, validations);

    const handleLogin = async e => {
        e.preventDefault();
        const error = await login({ email, password });
        if (error) {
            enqueueSnackbar(`${dictionary["login"]["errors"][error.code]}`, { variant: "error" });
        }
    };
    // useEffect(() => {
    //     if (!open) {
    //         reset();
    //     }
    // }, [open]);

    return (
        <React.Fragment>
            { !inRegister ? (
                <ListItemButton onClick={() => setOpen(true)}>
                    <ListItemIcon>
                        <LoginIcon />
                    </ListItemIcon>
                    <ListItemText primary={dictionary["login"]["title"]} />
                </ListItemButton>

            ) : (
                <Link sx={{ cursor: "pointer" }} onClick={() => setOpen(true)}>
                    {dictionary["register"]["alreadyRegistered"]}
                </Link>
            )}
            <Dialog
                fullScreen={isMobile}
                fullWidth
                maxWidth="sm"
                open={open}
                onClose={() => setOpen(false)}>
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            {dictionary["login"]["title"]}
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
                                <GoogleButton text={"Sign in with google"} onClick={googleLogin} />
                            </Stack>
                        </Grid>
                        <Grid item xs={12} md={6} lg={6}>
                            <Grid component="form" container spacing={2}>
                                <Grid item xs={12} md={12} lg={12}>
                                    <TextField
                                        fullWidth
                                        type="email"
                                        size="small"
                                        label={dictionary["login"]["email"]}
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
                                        label={dictionary["login"]["password"]}
                                        error={Boolean(touched.password && errors.password)}
                                        helperText={touched.password && errors.password}
                                        value={password}
                                        onChange={({ target }) => changeHandler("password", target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12} md={12} lg={12}>
                                    <Stack direction="row" sx={{ justifyContent: "space-between" }}>
                                        <Register inRegister={inRegister} closeLogin={() => setOpen(false)} />
                                        <Button
                                            sx={{ alignSelf: "flex-end" }}
                                            type="submit"
                                            disabled={!isValid}
                                            onClick={handleLogin}
                                            variant="contained"
                                        >
                                            {dictionary["login"]["submit"]}
                                        </Button>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
}

export default Login