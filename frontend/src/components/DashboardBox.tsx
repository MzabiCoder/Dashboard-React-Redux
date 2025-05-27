import { Box } from "@mui/material";
import { styled } from "@mui/system";


export const DashboardBox = styled(Box)(({ theme }) => ({
    //backgroundColor: theme.palette.background.default,
    backgroundColor: '#51382e',
    boxShadow: '.3rem .3rem .3rem .3rem rgba(0,0,0,1',
    maxWidth: '100%',
    width: '100%',
    display: 'grid',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',

}))