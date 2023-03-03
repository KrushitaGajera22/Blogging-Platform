const express = require ('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//fetching routes
const blogRoutes = require('./routes/blog');
const loginRoutes = require('./routes/login');
const categoryRoutes = require('./routes/category');
const searchRoutes = require('./routes/search');

//mongoose connection string
mongoose.connect('mongodb://localhost:27017/blog')
.then(() => {
    console.log('Connected');
})
.catch(() => {
    console.log('Failed');
})

//middleware for static files
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/uploads', express.static('uploads')); 

//cors error handling
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, DELETE, GET, PATCH');
        return res.status(200).json({});
    }
    next();
});

//using the routes
app.use('/blog', blogRoutes);
app.use('/', loginRoutes);
app.use('/category', categoryRoutes);
app.use('/search', searchRoutes);

module.exports = app;