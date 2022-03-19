import { ExpandLess, ExpandMore, Category, Folder } from '@mui/icons-material'
import {
    Box,
    Collapse,
    Divider,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText
} from '@mui/material'
import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useCategories, useDictionary } from '../hooks'

const SidebarMenu = () => {

    const { categories } = useCategories();
    const location = useLocation();
    const dictionary = useDictionary();
    const [categoriesOpen, setCategoriesOpen] = useState(true);

    const toggleCategories = () => {
        setCategoriesOpen(_state => !_state);
    };

    return (
        <Box sx={{ display: "flex", maxHeight: "calc(100% - 64px)", flexDirection: "column", justifyContent: "space-between" }}>
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
            <Box>
                <Divider />
                <ListItem>Ciao</ListItem>
                <ListItem>Ciao</ListItem>
            </Box>
        </Box>
    )
}

export default SidebarMenu
