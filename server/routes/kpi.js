import express from 'express';
import KPI from "../models/KPI.js"

const router = express.Router();

const API = import.meta.env.VITE_API_URL || "/kpis";

router.get(API, async (req, res) => {
    try {
        const kpis = await KPI.find()
        res.status(200).json(kpis)
    } catch (error) {
        resizeBy.stataus(404).json({ message: error.message })
    }
})


export default router;