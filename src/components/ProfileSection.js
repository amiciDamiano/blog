import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import React from 'react';
import { ExpandMore } from '@mui/icons-material';

const ProfileSection = ({ title, children, startOpen = false }) => {
    return (
        <Accordion defaultExpanded={startOpen} disableGutters sx={{ background: "transparent", boxShadow: "unset" }}>
            <AccordionSummary
                expandIcon={<ExpandMore />}
                sx={{ borderBottom: _ => `1px solid ${_.palette.divider}`}}
            >
                <Typography variant={"h6"}>
                    {title}
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                {children}
            </AccordionDetails>
        </Accordion>
    )
}

export default ProfileSection;