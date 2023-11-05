import React, { useCallback, useEffect, useState } from 'react'
import { doc, getDoc } from 'firebase/firestore';
import { db, storage } from '../firebase';
import { Avatar, Stack, Typography } from '@mui/material';
import { getDownloadURL, ref } from 'firebase/storage';

const Author = ({ id }) => {
    const [author, setAuthor] = useState();

    const getAuthor = useCallback(async () => {
        const userRef = await getDoc(doc(db, "users", id));
        const user = userRef.data();
        const imageUrl = await getDownloadURL(ref(storage, `profiles/${id}/${user.image}`))
        user.image = imageUrl;
        setAuthor(user);
    }, [id]);

    useEffect(() => {
        getAuthor();
    }, [getAuthor]);

    return (
        <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar
                referrerPolicy="no-referrer"
                imgProps={{ referrerPolicy: "no-referrer" }}
                src={author?.image}
                alt={author?.email}
            />
            <Typography>
                {author?.username}
            </Typography>
        </Stack>
    )
}

export default Author