require('dotenv').config();
const path = require('path');
const express = require('express');

const app = express();

const cors = require ('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');

//Routes
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const authRoutes = require('./routes/auth');

//middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

app.use('/api/category', categoryRoutes);
app.use('/api/product', productRoutes );
app.use('/api/auth', authRoutes);
app.use('/uploads', express.static('uploads'));

connectDB();

const PORT = process.env.PORT || 5000;

if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, '../frontend/build')));

    app.get('*', (req,res)=> {
        res.sendFile(path.join(__dirname,'frontend','build','index.html'));
    })
} else {
    app.get('/', (req,res) => {
        res.send('API running');
    });
}

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))