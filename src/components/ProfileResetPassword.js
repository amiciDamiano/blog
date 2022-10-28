import React, { useContext } from 'react';
import { Stack, TextField, Button, Box } from '@mui/material';
import { useDictionary, useForm } from '../hooks';
import { getAuth, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import { isRequired, isSame } from '../hooks/useForm';
import { useSnackbar } from 'notistack';
import TimeoutAndRedirect from './TimeoutAndRedirect';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts';

const ProfileResetPassword = () => {

    const dictionary = useDictionary();
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const { logout } = useContext(AuthContext);
    const validations = [
        ({ password }) => isRequired(password) || { password: dictionary["profile"]["errors"]["password"]["required"]}, 
        ({ newPassword }) => isRequired(newPassword) || { newPassword: dictionary["profile"]["errors"]["newPassword"]["required"]}, 
        ({ confirmNewPassword }) => isRequired(confirmNewPassword) || { confirmNewPassword: dictionary["profile"]["errors"]["confirmNewPassword"]["required"]}, 
        ({ confirmNewPassword, newPassword }) => isSame(confirmNewPassword, newPassword) || { confirmNewPassword: dictionary["profile"]["errors"]["confirmNewPassword"]["mustBeEqualToNewPassword"]}, 
    ];
    const {
        values: { password, newPassword, confirmNewPassword },
        changeHandler,
        errors,
        touched,
        isValid
    } = useForm({
        password: null,
        newPassword: null,
        confirmNewPassword: null
    }, validations);

    const changePassword = async () => {
        const auth = getAuth();
        const user = auth.currentUser;
        try {
            const credentials = EmailAuthProvider.credential(user.email, password);
            await reauthenticateWithCredential(user, credentials);
            await updatePassword(user, newPassword)
            enqueueSnackbar(<TimeoutAndRedirect logout={logout} navigate={navigate} />, { variant: "success", autoHideDuration: 10000 })
        } catch(error) {
            console.error(error.code);
            enqueueSnackbar(dictionary["auth"]["errors"][error.code], { variant: "error" })
        }
    };

    const SaveButton = () => (
        <Button
            variant="contained"
            disabled={!isValid}
            onClick={changePassword}
        >
            {dictionary["save"]}
        </Button>
    );

    return (
        <React.Fragment>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mt: _ => _.spacing(2) }}>
                <TextField
                    size="small"
                    label={dictionary["profile"]["password"]}
                    variant="outlined"
                    type="password"
                    error={Boolean(touched.password && errors.password)}
                    helperText={touched.password && errors.password}
                    autoComplete="password"
                    value={password || ""}
                    onChange={({ target }) => changeHandler("password", target.value)}
                />
                <TextField
                    size="small"
                    label={dictionary["profile"]["newPassword"]}
                    variant="outlined"
                    type="password"
                    error={Boolean(touched.newPassword && errors.newPassword)}
                    helperText={touched.newPassword && errors.newPassword}
                    autoComplete="new-password"
                    value={newPassword || ""}
                    onChange={({ target }) => changeHandler("newPassword", target.value)}
                    />
                <TextField
                    size="small"
                    label={dictionary["profile"]["confirmNewPassword"]}
                    variant="outlined"
                    type="password"
                    error={Boolean(touched.confirmNewPassword && errors.confirmNewPassword)}
                    helperText={touched.confirmNewPassword && errors.confirmNewPassword}
                    autoComplete="off"
                    value={confirmNewPassword || ""}
                    onChange={({ target }) => changeHandler("confirmNewPassword", target.value)}
                />
                <Box display={{ xs: "none", sm: "flex" }} justifyContent={"flex-start"}>
                    <SaveButton />
                </Box>
                <Stack direction="row" flex={1} justifyContent={"end"} display={{ xs: "flex", sm: "none" }} spacing={2}>
                    <SaveButton />
                </Stack>
            </Stack>
        </React.Fragment>
    )
}

export default ProfileResetPassword;