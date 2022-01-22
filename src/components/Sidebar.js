import React, { useContext } from 'react'
import {
    SwipeableDrawer,
    TextField,
    CssBaseline,
    Paper,
    Toolbar,
} from '@mui/material';
import { LanguageContext, ThemeContext } from '../contexts';
import { styled } from '@mui/material/styles';
import ColorModeSwitch from './ColorModeSwitch';
import Drawer from './Drawer';
import AppBar from './AppBar';

const SidebarHeader = ({ dark, toggleDarkMode }) => {
    const { state: { dictionary } } = useContext(LanguageContext);
    return (
        <DrawerHeader>
            <AppBar inDrawer sx={{ right: 'auto', width: 249 }}>
                <Toolbar>
                    <ColorModeSwitch value={dark} onChange={toggleDarkMode} />
                    <TextField
                        key={'search'}
                        color='info'
                        label={`${dictionary['search']}...`}
                        variant="outlined"
                        type="search"
                        size="small"
                        sx={{ mx: 1 }}
                    />
                </Toolbar>
            </AppBar>
        </DrawerHeader >
    )
}

const Sidebar = ({ children }) => {

    const iOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);
    const { state: {
        sidebarOpen,
        dark
    },
        closeSidebar,
        openSidebar,
        toggleDarkMode
    } = useContext(ThemeContext);
    return (
        <>
            <CssBaseline />
            <SwipeableDrawer
                variant="permanent"
                anchor="left"
                open
                onClose={closeSidebar}
                onOpen={openSidebar}
                disableBackdropTransition={!iOS}
                disableDiscovery={iOS}
                sx={{
                    width: 250,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: 250,
                        boxSizing: 'border-box',
                    },
                    display: { xs: 'none', sm: 'block' },
                }}
            >
                <SidebarHeader dark={dark} toggleDarkMode={toggleDarkMode} />
                {children}
            </SwipeableDrawer>
            <Drawer
                component={Paper}
                key="sidebar-mobile"
                sx={{
                    width: 250,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: 250,
                        boxSizing: 'border-box',
                    },
                    zIndex: (theme) => theme.zIndex.drawer + 2,
                    display: { xs: 'block', sm: 'none' },
                }}
                anchor="left"
                open={sidebarOpen}
            >
                <SidebarHeader dark={dark} toggleDarkMode={toggleDarkMode} />
                {children}
            </Drawer>
        </>
    )
}

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(1, 0, 0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

export default Sidebar
