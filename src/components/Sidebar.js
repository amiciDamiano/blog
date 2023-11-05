import React, { useContext, useEffect } from 'react'
import {
    SwipeableDrawer,
    Paper,
    Toolbar,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import { ThemeContext } from '../contexts';
import { styled } from '@mui/material/styles';
import Drawer from './Drawer';
import AppBar from './AppBar';
import { useDictionary } from '../hooks';
import Search from './Search';
import GlassCard from './GlassCard';

const SidebarHeader = ({ open, closeSidebar }) => {
    const dictionary = useDictionary();
    return (
        <DrawerHeader>
            <AppBar open={open} inDrawer sx={{ borderRadius: 0, background: "transparent", right: 'auto', width: 250 }}>
                <Toolbar component={GlassCard} sx={{ borderRadius: 0 }}>
                    <Search dictionary={dictionary} closeSidebar={closeSidebar} />
                </Toolbar>
            </AppBar>
        </DrawerHeader>
    )
}

const Sidebar = ({ children }) => {

    const iOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);
    const { state: {
        sidebarOpen
    },
        closeSidebar,
        openSidebar
    } = useContext(ThemeContext);
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('md'));
    
    useEffect(() => {
        if(matches) {
            closeSidebar();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [matches]);
    
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
                        backgroundColor: "transparent",
                        width: 250,
                        boxSizing: 'border-box',
                    },
                    display: { xs: 'none', md: 'block' },
                }}
            >
                <SidebarHeader open />
                {children}
            </SwipeableDrawer>
            <Drawer
                component={Paper}
                key="sidebar-mobile"
                sx={{
                    width: 250,
                    flexShrink: 0,
                    backgroundColor: "transparent",
                    overflowY: 'auto',
                    zIndex: theme => theme.zIndex.drawer + 2,
                    display: { xs: 'block', md: 'none' },
                }}
                anchor="left"
                open={sidebarOpen}
            >
                <SidebarHeader open={sidebarOpen} closeSidebar={closeSidebar} />
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
