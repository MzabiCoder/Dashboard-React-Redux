type Props = {}
import { useState } from "react"
import { Link } from "react-router-dom"
import { Box, Typography, useTheme } from "@mui/material"
import { FlexBetween } from "../../components/FlexBetWeen"
import { Palette } from "@mui/icons-material"
import TwentyZeroMpIcon from '@mui/icons-material/TwentyZeroMp';

const Navbar = (props: Props) => {
    const { palette } = useTheme();
    const [selected, setselected] = useState('dashboard')
    return <FlexBetween mb=".25rem" p=".5rem 0rem" color={palette.grey[300]}>
        {/* LEFT SIDE*/}
        <FlexBetween gap=".75">
            <TwentyZeroMpIcon sx={{ fontSize: '28px' }} />
            <Typography variant="h4" fontSize="16px">AI Finance</Typography>
        </FlexBetween>
        {/* RIGHT SIDE*/}
        <FlexBetween gap="2rem">
            <Box sx={{ "&:hover": { color: palette.primary[100] } }} >
                <Link style={{ color: selected === 'dashboard' ? 'inherit' : palette.grey[700], textDecoration: 'inherit' }} to="/" onClick={() => setselected('dashboard')}>
                    Dashboard
                </Link>
            </Box>
            <Box sx={{ "&:hover": { color: palette.primary[100] } }} >
                <Link style={{ color: selected === 'predictions' ? 'inherit' : palette.grey[700], textDecoration: 'inherit' }} to="/predictions" onClick={() => setselected('predictions')}>
                    Predictions
                </Link>
            </Box>
        </FlexBetween>
    </FlexBetween >
}

export default Navbar