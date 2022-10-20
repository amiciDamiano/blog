import { Card as MuiCard } from '@mui/material';
import { styled } from '@mui/material/styles';

const GlassCard = styled(MuiCard)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "rgba(0, 0, 0, 0.2)" : "rgba(255, 255, 255, 0.2)",
    backdropFilter: "blur(7px)",
    WebkitBackdropFilter: "blur(7px)"
}));

export default GlassCard;