import { Box, Container } from '@mui/material';
import React, { useEffect } from 'react';
import ProfileSection from '../components/ProfileSection';
import MyArticles from '../components/MyArticles';
import ProfileInformations from '../components/ProfileInformations';
import ProfileResetPassword from '../components/ProfileResetPassword';
import { useDictionary } from '../hooks';

const Profile = () => {

    const dictionary = useDictionary();

    useEffect(() => {
        document.title = dictionary["profile"]["title"];
    }, [dictionary]);

    return (
        <Box component={Container} sx={{ textAlign: 'center' }}>
            <ProfileSection title={dictionary["profile"]["myArticles"]}>
                <MyArticles />
            </ProfileSection>
            <ProfileSection startOpen title={dictionary["profile"]["informations"]}>
                <ProfileInformations />
            </ProfileSection>
            <ProfileSection title={dictionary["profile"]["resetPassword"]}>
                <ProfileResetPassword />
            </ProfileSection>
        </Box>
    )
}

export default Profile;