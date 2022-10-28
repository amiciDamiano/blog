/* eslint-disable react-hooks/exhaustive-deps */
import { Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDictionary } from '../hooks';

const INITIAL_SECONDS = 10;

const TimeoutAndRedirect = ({ logout, navigate }) => {

    const [seconds, setSeconds] = useState(INITIAL_SECONDS);
    const dictionary = useDictionary();

    useEffect(() => {
        let isMount = true;
        const interval = setInterval(() => {
            if (isMount) {
                setSeconds(_ => _ - 1);
            }
        }, 1000);
        return () => {
            isMount = false;
            clearInterval(interval);
        };
    }, []);

    useEffect(() => {
        if (seconds !== INITIAL_SECONDS) {
            if (seconds <= 0) {
                logout(navigate);
            }
        }
    }, [seconds]);

    return <Typography>
            {dictionary["logoutIn"]} {seconds} {dictionary["seconds"]}
        </Typography>
};

export default TimeoutAndRedirect