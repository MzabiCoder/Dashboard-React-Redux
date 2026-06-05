import express from 'express';
import Product from "../models/Product.js"

const router = express.Router();

const API = import.meta.env.VITE_API_URL || "/products";

router.get('/products', async (req, res) => {
    try {
        const products = await Product.find()
        res.status(200).json(products)
        //console.log(products)
    } catch (error) {
        resizeBy.stataus(404).json({ message: error.message })
    }
})


export default router;