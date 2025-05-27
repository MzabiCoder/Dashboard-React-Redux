import { Box, useMediaQuery } from "@mui/material"
import Row1 from "./Row1"
import Row2 from "./Row2"
import Row3 from "./Row3"

const gridTemplateMediumScreens = `
  "a b"
  "a b"
  "a b"
  "a b"
  "c d"
  "c d"
  "c d"
  "c d"
  "e f"
  "e f"
  "e f"
  "e f"
  "g h"
  "g h"
  "g h"
  "g h"
  "i j"
  "i j"
  "i j"
  "i j"
`

const gridTemplateLargeScreens = `
  "a b c"
  "a b c"
  "a b c"
  "a e f"
  "d e f"
  "d e f"
  "d h i"
  "g h i"
  "g h j"
  "g h j"
`;
const gridTemplateSmallScreens = `
  "a"
  "a"
  "a"
  "a"
  "b"
  "b"
  "b"
  "b"
  "c"
  "c"
  "c"
  "d"
  "d"
  "d"
  "e"
  "e"
  "f"
  "f"
  "f"
  "g"
  "g"
  "g"
  "h"
  "h"
  "h"
  "h"
  "i"
  "i"
  "j"
  "j"
`;

const Dashboard = () => {
    const isAboveMediumScreens = useMediaQuery("(min-width:1100px)")
    const isAboveMediumMScreens = useMediaQuery("(min-width:750px)")
    return <Box
        width='100%'
        height='100%'
        display='grid'
        gap='1.5rem'
        id="box"
        sx={isAboveMediumScreens ? {
            gridTemplateColumns: 'repeat(3, minmax(370px,1fr))',
            gridTemplateRows: 'repeat(10, minmax(60px, 1fr))',
            gridTemplateAreas: gridTemplateLargeScreens
        } : isAboveMediumMScreens ? {
            gridTemplateColumns: '1fr',
            gridAutoRows: '80px',
            gridTemplateAreas: gridTemplateMediumScreens
        } : {
            gridTemplateColumns: '1fr 1fr',
            gridAutoRows: '80px',
            gridTemplateAreas: gridTemplateSmallScreens
        }}
    >   <Row1 />
        <Row2 />
        <Row3 />

    </Box>
}

export default Dashboard