import { ExpandLess, ExpandMore, Category, Folder, Logout } from '@mui/icons-material'
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
} from '@mui/material'
import React, { useContext, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AuthContext } from '../contexts'
import { useCategories, useDictionary } from '../hooks'
import Login from './Login'

const SidebarMenu = () => {

    const { categories } = useCategories();
    const location = useLocation();
    const dictionary = useDictionary();
    const [categoriesOpen, setCategoriesOpen] = useState(true);
    const { state: { user } } = useContext(AuthContext);
    const toggleCategories = () => {
        setCategoriesOpen(_state => !_state);
    };
    console.log(user)
    return (
        <Box sx={{
            display: "flex",
            flex: 1,
            height: "-webkit-fill-available",
            maxHeight: "calc(100% - 64px)",
            flexDirection: "column",
            justifyContent: "space-between"
        }}>
            <Box sx={{ overflowY: "auto", flex: 1 }}>
                <List >
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
                    {!user
                        ? <Login />
                        : <React.Fragment>
                            <ListItem alignItems="center">
                                <ListItemAvatar>
                                    <Avatar src={user.photoURL} alt={user.email} />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={dictionary["profile"]["title"]}
                                />
                            </ListItem>
                            <ListItem alignItems="center">
                                <ListItemIcon>
                                    <Logout />
                                </ListItemIcon>
                                <ListItemText
                                    primary="Logout"
                                />
                            </ListItem>
                        </React.Fragment>
                    }
                </List>
            </Box>
        </Box>
    )
}

export default SidebarMenu
