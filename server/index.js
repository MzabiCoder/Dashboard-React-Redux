import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import mongoose from 'mongoose';
import KpiRoutes from "./routes/kpi.js"
import productRoutes from "./routes/products.js"
import transactionRoutes from "./routes/transaction.js"
import KPI from './models/KPI.js';
import { kpis, products, transactions } from './data/data.js';
import Product from './models/Product.js';
import Transaction from "./models/Transaction.js"


/* CONFIGURATIONS */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(cors());

// env post 
const PORT = process.env.PORT || 9000;

// API routes
app.use('/kpi', KpiRoutes)
app.use('/product', productRoutes)
app.use('/transaction', transactionRoutes)


// Database connection
const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        app.listen(PORT, console.log(`Server Port ${PORT}`));

        // before seeding the data, we first drop the existing database 
        // so we dont have any duplicates in our collections

        await mongoose.connection.db.dropDatabase();

        KPI.insertMany(kpis);
        Product.insertMany(products)
        Transaction.insertMany(transactions)
    } catch (error) {
        console.log(error.message)
    }
}

connectDb()