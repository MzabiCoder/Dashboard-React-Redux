import { useTheme } from "@mui/material"
import { useState } from "react";


type Props = {}

const Predictions = (props: Props) => {
    const { palette } = useTheme();
    const [isePredictions, setIsPrediction] = useState(false)
    return (
        <div>index</div>
    )
}

export default Predictions