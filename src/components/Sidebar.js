import React, { useContext } from 'react'
import {
    SwipeableDrawer,
    TextField,
    Paper,
    Toolbar,
    useTheme,
    Autocomplete,
    Typography,
    CircularProgress,
    ListItemButton,
    ListSubheader
} from '@mui/material';
import { ThemeContext } from '../contexts';
import { styled } from '@mui/material/styles';
import ColorModeSwitch from './ColorModeSwitch';
import Drawer from './Drawer';
import AppBar from './AppBar';
import { useDictionary, useSearch } from '../hooks';
import { Link } from 'react-router-dom';

const SidebarHeader = ({ dark, toggleDarkMode, open, closeSidebar }) => {
    const dictionary = useDictionary();
    const { loading, searchOpen, setSearchOpen, options, changeHandler, searchString } = useSearch();
    return (
        <DrawerHeader>
            <AppBar open={open} inDrawer sx={{ right: 'auto', width: 250 }}>
                <Toolbar>
                    <ColorModeSwitch checked={dark} onChange={toggleDarkMode} />
                    <Autocomplete
                        open={searchOpen}
                        onOpen={() => setSearchOpen(true)}
                        onClose={() => setSearchOpen(false)}
                        fullWidth
                        inputValue={searchString || ''}
                        onInputChange={changeHandler}
                        options={options}
                        loading={loading}
                        renderGroup={({ children, group }) => {
                            return <React.Fragment key={group}>
                                <ListSubheader>
                                    {dictionary[group]}
                                </ListSubheader>
                                {children}
                            </React.Fragment>
                        }}
                        renderOption={(params, option) => {
                            return <ListItemButton 
                                        {...params} 
                                        key={option.path} 
                                        component={Link} 
                                        to={option.path}
                                        onClick={() => { 
                                            setSearchOpen(false);
                                            changeHandler({type: "change", target: {value: ""}});
                                            closeSidebar();
                                        }}
                                    >
                                {option.title}
                            </ListItemButton>
                        }}
                        groupBy={option => option.category}
                        getOptionLabel={option => option.category || ''}
                        filterOptions={(x) => x}
                        renderInput={params => (
                            <TextField
                                {...params}
                                key={'search'}
                                color='info'
                                label={`${dictionary['search']}...`}
                                variant="outlined"
                                // type="search"
                                size="small"
                                InputProps={{
                                    ...params.InputProps,
                                    endAdornment: (
                                        <React.Fragment>
                                            {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                        </React.Fragment>
                                    ),
                                }}
                                sx={{ mx: 1 }}
                            />
                        )}
                    />
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
    const theme = useTheme();

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
                    maxHeight: '100vh',
                    overflowY: 'auto',
                    '& .MuiDrawer-paper': {
                        width: 250,
                        boxSizing: 'border-box',
                    },
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
