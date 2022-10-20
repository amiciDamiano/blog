import { ExpandLess, ExpandMore, Category, Folder, Logout } from '@mui/icons-material';
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
import WaveSwitch from './WaveSwitch';

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
        <Box sx={{
            display: "flex",
            backgroundColor: "transparent",
            flex: 1,
            height: "-webkit-fill-available",
            maxHeight: "calc(100% - 64px)",
            flexDirection: "column",
            justifyContent: "space-between"
        }}>
            <Box sx={{ backgroundColor: "transparent", overflowY: "auto", flex: 1 }}>
                <List sx={{ backgroundColor: "transparent" }}>
                    <ListItemButton onClick={toggleCategories}>
                        <ListItemIcon>
                            <Category />
                        </ListItemIcon>
                        <ListItemText primary={dictionary["categories"]} />
                        {categoriesOpen ? <ExpandLess /> : <ExpandMore />}
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
                                        <Folder htmlColor={location.pathname.startsWith(`/${category.name}`) ? category.color : ''} />
                                    </ListItemIcon>
                                    <ListItemText>{dictionary[category.name].title}</ListItemText>
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
                        ? <Login />
                        : <React.Fragment>
                            <ListItemButton 
                                component={Link}
                                to={'/profile'}
                                alignItems="center">
                                <ListItemAvatar>
                                    <Avatar referrerPolicy="no-referrer" imgProps={{ referrerPolicy: "no-referrer" }} src={user.photoURL} alt={user.email} />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={dictionary["profile"]["title"]}
                                />
                            </ListItemButton>
                            <ListItemButton alignItems="center" onClick={() => logout(navigate)} >
                                <ListItemIcon sx={{ justifyContent: "center" }}>
                                    <Logout />
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
