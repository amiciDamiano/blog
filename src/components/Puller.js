import { Box, styled } from "@mui/material";
import { grey } from '@mui/material/colors';
const short = 6;
const long = 30;
const Puller = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'orientation',
})(({ theme, orientation }) => ({
    width: orientation === "vertical" ? short: long,
    height: orientation === "vertical" ? long : short,
    cursor: orientation === "vertical" ? "col-resize" : "row-resize",
    backgroundColor: theme.palette.mode === 'light' ? grey[300] : grey[900],
    borderRadius: 3
}));
export default Puller;