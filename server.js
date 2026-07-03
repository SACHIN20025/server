const express = require('express');
// Third-party middleware
const morgan = require('morgan'); 

const app = express();
const PORT = 3000;
// 1. MIDDLEWARE SETUP
app.use(express.json());

// B. Third-Party Middleware
app.use(morgan('dev'));

// C. Custom Middleware: Logs Request URL, Method, Time, and User IP
app.use((req, res, next) => {
    const timestamp = new Date().toISOString();
    const method = req.method;
    const url = req.url;
    const ip = req.ip || req.connection.remoteAddress; 

    console.log(`[${timestamp}] ${method} to ${url} | IP: ${ip}`);
    
    next(); 
});
// 2. ROUTES

// Route A
app.get('/users/:id', (req, res) => {
    const userId = req.params.id;
    res.json({
        message: 'Fetched data using Route Params',
        userId: userId
    });
});

// Route B
app.get('/search', (req, res) => {
    const { term, limit } = req.query;
    res.json({
        message: 'Fetched data using Query Params',
        searchCriteria: {
            searchTerm: term || 'Not provided',
            resultLimit: limit || 'Default (20)'
        }
    });
});

// Route C
app.post('/products', (req, res) => {
    const { name, price } = req.body;
    
    if (!name || !price) {
        return res.status(400).json({ error: 'Missing product name or price' });
    }

    res.status(201).json({
        message: 'Product created successfully using Request Body',
        product: { name, price }
    });
});

// 3. START SERVER
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});