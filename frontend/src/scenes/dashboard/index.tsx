import { Box, useMediaQuery } from "@mui/material"
import { motion } from "framer-motion"
import Row1 from "./Row1"
import Row2 from "./Row2"
import Row3 from "./Row3"

const MotionBox = motion(Box)

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.09 } },
}

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
  "g h i"
  "g h i"
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
  "i"
  "i"
`;

const Dashboard = () => {
    const isAboveMediumScreens = useMediaQuery("(min-width:1100px)")
    const isAboveMediumMScreens = useMediaQuery("(min-width:750px)")
    return <MotionBox
        variants={containerVariants}
        initial="hidden"
        animate="visible"
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
            gridTemplateColumns: '1fr',
            gridAutoRows: '80px',
            gridTemplateAreas: gridTemplateSmallScreens
        }}
    >
        <Row1 />
        <Row2 />
        <Row3 />
    </MotionBox>
}

export default Dashboard
