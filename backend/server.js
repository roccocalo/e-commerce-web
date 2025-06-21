const express = require('express');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const cors = require('cors');
const connectDB = require('./config/db');

connectDB();

const app = express();

const corsOptions = {
  origin: [
    /\.vercel\.app$/,     
    /\.onrender\.com$/    
  ],
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());

const authRoutes = require('./routes/authRoutes');
const candleRoutes = require('./routes/candleRoutes');
const cartRoutes = require('./routes/cartRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/candles', candleRoutes);
app.use('/api/cart', cartRoutes);  

  
 // Semplice route di test per la root
app.get('/', (req, res) => {
  res.json({ message: 'CandleCloud Backend API is running!' });
});


const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});