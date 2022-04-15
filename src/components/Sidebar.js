import React, { useContext } from 'react'
import {
    SwipeableDrawer,
    Paper,
    Toolbar,
} from '@mui/material';
import { ThemeContext } from '../contexts';
import { styled } from '@mui/material/styles';
import ColorModeSwitch from './ColorModeSwitch';
import Drawer from './Drawer';
import AppBar from './AppBar';
import { useDictionary } from '../hooks';
import Search from './Search';

const SidebarHeader = ({ dark, toggleDarkMode, open, closeSidebar }) => {
    const dictionary = useDictionary();
    return (
        <DrawerHeader>
            <AppBar open={open} inDrawer sx={{ right: 'auto', width: 250 }}>
                <Toolbar>
                    <ColorModeSwitch checked={dark} onChange={toggleDarkMode} />
                    <Search dictionary={dictionary} closeSidebar={closeSidebar} />
                </Toolbar>
            </AppBar>
        </DrawerHeader>
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
                    display: { xs: 'none', md: 'block' },
                }}
            >
                <SidebarHeader open dark={dark} toggleDarkMode={toggleDarkMode} />
                {children}
            </SwipeableDrawer>
            <Drawer
                component={Paper}
                key="sidebar-mobile"
                sx={{
                    width: 250,
                    flexShrink: 0,
                    // maxHeight: '100vh',
                    overflowY: 'auto',
                    // '& .MuiDrawer-paper': {
                    //     width: 250,
                    //     boxSizing: 'border-box',
                    // },
                    zIndex: theme => theme.zIndex.drawer + 2,
                    display: { xs: 'block', md: 'none' },
                }}
                anchor="left"
                open={sidebarOpen}
            >
                <SidebarHeader open={sidebarOpen} closeSidebar={closeSidebar} dark={dark} toggleDarkMode={toggleDarkMode} />
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
    // flexGrow: 1,
    justifyContent: 'flex-end',
}));

export default Sidebar;
