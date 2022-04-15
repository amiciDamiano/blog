import { Box, Button, Stack, SvgIcon, Typography } from '@mui/material'
import React from 'react'
import { lightSvg } from '../assets/googleIcons'

const GoogleButton = ({ onClick, text }) => {
    return (
        <Button
            onClick={onClick}
            variant="contained"
            sx={{
                height: 40,
                backgroundColor: "white",
                color: "black",
                p: 0,
                borderRadius: "4px",
                textTransform: "capitalize",
            }}
        >
            <Stack direction="row" sx={{ height: "100%", flex: 1 }}>
                <Box sx={{
                    borderTopLeftRadius: "4px",
                    borderBottomLeftRadius: "4px",
                    minWidth: 40,
                    alignItems: "center",
                    justifyContent: "center",
                    display: "flex",
                    backgroundColor: "white",
                    borderStyle: theme => theme.palette.mode === "dark" && "solid",
                    borderWidth: theme => theme.palette.mode === "dark" && "1.5px",
                    borderColor: theme => theme.palette.mode === "dark" && "#4285F4"
                }}>
                    <SvgIcon component={() => lightSvg} />
                </Box>
                <Typography
                    sx={{
                        fontWeight: "bold",
                        borderTopRightRadius: "4px",
                        borderBottomRightRadius: "4px",
                        alignItems: "center",
                        justifyContent: "center",
                        display: "flex",
                        color: theme => theme.palette.mode === "dark" ? "white" : "rgba(0,0,0,.54)",
                        backgroundColor: theme => theme.palette.mode === "dark" ? "#4285F4" : "white"
                    }}
                    flex={1}
                >
                    {text}
                </Typography>
            </Stack>
        </Button>
    )
}

export default GoogleButton