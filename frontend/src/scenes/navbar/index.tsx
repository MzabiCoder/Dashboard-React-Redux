type Props = {}
import { useState } from "react"
import { Link } from "react-router-dom"
import { Box, Typography, useTheme } from "@mui/material"
import { FlexBetween } from "../../components/FlexBetWeen"
import ShowChartIcon from '@mui/icons-material/ShowChart';

const Navbar = (props: Props) => {
    const { palette } = useTheme();
    const [selected, setselected] = useState('dashboard')
    return <FlexBetween mb=".25rem" p=".5rem 0rem" color={palette.grey[300]} borderBottom="1px solid rgba(0,229,176,0.12)" pb="0.75rem">
        {/* LEFT SIDE */}
        <FlexBetween gap="0.5rem">
            <ShowChartIcon sx={{ fontSize: '26px', color: '#00e5b0' }} />
            <Typography variant="h4" fontSize="16px" fontWeight="700" letterSpacing="0.5px">
                Fin<span style={{ color: '#00e5b0' }}>Vista</span>
            </Typography>
        </FlexBetween>
        {/* RIGHT SIDE */}
        <FlexBetween gap="2rem">
            {/* <Box sx={{ "&:hover": { color: palette.primary[100] } }} >
                <Link style={{ color: selected === 'dashboard' ? 'inherit' : palette.grey[700], textDecoration: 'inherit' }} to="/" onClick={() => setselected('dashboard')}>
                    Dashboard
                </Link>
            </Box>
            <Box sx={{ "&:hover": { color: palette.primary[100] } }} >
                <Link style={{ color: selected === 'predictions' ? 'inherit' : palette.grey[700], textDecoration: 'inherit' }} to="/predictions" onClick={() => setselected('predictions')}>
                    Predictions
                </Link>
            </Box> */}
        </FlexBetween>
    </FlexBetween>
}

export default Navbar
