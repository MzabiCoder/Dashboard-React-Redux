import { Box } from "@mui/material";
import { styled } from "@mui/system";


export const DashboardBox = styled(Box)(({ theme }) => ({
    backgroundColor: '#0d1f35',
    border: '1px solid rgba(0, 229, 176, 0.08)',
    borderRadius: '0.75rem',
    boxShadow: '0 4px 24px rgba(0, 0, 0, 0.4)',
    maxWidth: '100%',
    width: '100%',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
}))
