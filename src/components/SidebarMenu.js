/* eslint-disable react-hooks/exhaustive-deps */
import { ExpandLessTwoTone, ExpandMoreTwoTone, CategoryTwoTone, FolderTwoTone, LogoutTwoTone } from '@mui/icons-material';
import {
    Avatar,
    Box,
    Collapse,
    Divider,
    List,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemIcon,
    ListItemText
} from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext, ThemeContext } from '../contexts';
import { useCategories, useDictionary } from '../hooks';
import { STORE_TOKEN, STORE_USER } from '../utilities';
import ColorModeSwitch from './ColorModeSwitch';
import Login from './Login';
import GlassCard from './GlassCard';
import WaveSwitch from './WaveSwitch';
import Register from './Register';

const SidebarMenu = () => {

    const { categories } = useCategories();
    const location = useLocation();
    const navigate = useNavigate();
    const dictionary = useDictionary();
    const [categoriesOpen, setCategoriesOpen] = useState(true);
    const { state: { wave, dark }, toggleWave, toggleDarkMode } = useContext(ThemeContext);
    const { state: { user }, setUser, logout } = useContext(AuthContext);

    useEffect(() => {
        const _user = JSON.parse(localStorage.getItem(STORE_USER));
        const _token = localStorage.getItem(STORE_TOKEN);
        setUser(_user, _token);
    }, []);

    const toggleCategories = () => {
        setCategoriesOpen(_state => !_state);
    };

    return (
        <Box component={GlassCard} sx={{
            display: "flex",
            backgroundColor: "transparent",
            flex: 1,
            borderRadius: 0,
            height: "-webkit-fill-available",
            maxHeight: "calc(100% - 56px)",
            flexDirection: "column",
            justifyContent: "space-between"
        }}>
            <Box sx={{ backgroundColor: "transparent", overflowY: "auto", flex: 1 }}>
                <List >
                    <ListItemButton onClick={toggleCategories}>
                        <ListItemIcon>
                            <CategoryTwoTone />
                        </ListItemIcon>
                        <ListItemText primary={dictionary["categories"]} />
                        {categoriesOpen ? <ExpandLessTwoTone /> : <ExpandMoreTwoTone />}
                    </ListItemButton>
                    <Collapse in={categoriesOpen}>
                        <List disablePadding>
                            {categories.map((category, index) => (
                                <ListItemButton
                                color="secondary"
                                    component={Link}
                                    sx={{ mb: 1, pl: 4 }}
                                    to={`/${category.name}`}
                                    selected={location.pathname.startsWith(`/${category.name}`)}
                                    key={`${category.name}-${index}`}>
                                    <ListItemIcon>
                                        <FolderTwoTone htmlColor={location.pathname.startsWith(`/${encodeURI(category.name)}`) ? category.color : ''} />
                                    </ListItemIcon>
                                    <ListItemText>{dictionary[category.name]?.title || category.name}</ListItemText>
                                </ListItemButton>
                            ))}
                        </List>
                    </Collapse>
                </List>
            </Box>
            <Divider />
            <Box sx={{ justifySelf: "flex-end" }}>
                <List>
                    <ListItem>
                        <WaveSwitch
                            checked={wave}
                            onChange={toggleWave}
                        />
                        <ColorModeSwitch checked={dark} onChange={toggleDarkMode} />
                    </ListItem>
                    {!user
                        ? <React.Fragment>
                            <Login />
                            <Register inSidebar />
                        </React.Fragment>
                        : <React.Fragment>
                            <ListItemButton
                                component={Link}
                                to={'/profile'}
                                selected={location.pathname.startsWith(`/profile`)}
                                alignItems="center">
                                <ListItemAvatar>
                                    <Avatar referrerPolicy="no-referrer" imgProps={{ referrerPolicy: "no-referrer" }} src={user.photoURL} alt={user.email} />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={user.displayName || dictionary["profile"]["title"]}
                                // primary={dictionary["profile"]["title"]}
                                />
                            </ListItemButton>
                            <ListItemButton alignItems="center" onClick={() => logout(navigate)} >
                                <ListItemIcon sx={{ justifyContent: "center" }}>
                                    <LogoutTwoTone />
                                </ListItemIcon>
                                <ListItemText
                                    primary="Logout"
                                />
                            </ListItemButton>
                        </React.Fragment>
                    }
                </List>
            </Box>
        </Box>
    )
}

export default SidebarMenu
