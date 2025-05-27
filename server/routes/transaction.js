import express from 'express';
import Transaction from "../models/Product.js"

const router = express.Router();

router.get('/transactions', async (req, res) => {
    try {
        const transactions = await Transaction.find()
            .limit(50)
            .sort({ createdOn: -1 });

        res.status(200).json(transactions)
        //console.log(transactions)
    } catch (error) {
        resizeBy.stataus(404).json({ message: error.message })
    }
})


export default router;