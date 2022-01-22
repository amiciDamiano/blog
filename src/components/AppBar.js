import { AppBar as MuiAppBar } from '@mui/material';
import { styled } from '@mui/material/styles';

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => !['open', 'inDrawer'].includes(prop),
    // prop !== 'open' || prop !== 'inDrawer',
})(({ theme, open, inDrawer }) => ({
    // border: inDrawer ? '1px solid red': 'none',
    zIndex: (theme) => theme.zIndex.drawer + 9999999,
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${250}px)`,
        marginLeft: inDrawer ? '0px' : `${250}px`,
        // marginLeft: `${250}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

export default AppBar;