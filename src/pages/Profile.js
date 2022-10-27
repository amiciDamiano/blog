import { Box, Container } from '@mui/material';
import React from 'react';
import ProfileSection from '../components/ProfileSection';
import MyArticles from '../components/MyArticles';
import { useDictionary } from '../hooks';

const Profile = () => {
    
    const dictionary = useDictionary();
    
    return (
        <Box component={Container} sx={{ textAlign: 'center' }}>
            <ProfileSection title={dictionary["profile"]["myArticles"]}>
                <MyArticles />
            </ProfileSection>
        </Box>
    )
}

export default Profile;