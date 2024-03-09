const express = require("express");
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();

require("./config/dbConnection");

const productRoute = require("./routes/productsRoutes");
const usersRoute = require("./routes/usersRoutes");
const ordersRoute = require("./routes/ordersRoutes");
const cartRoute = require("./routes/cartRoutes");
const reviewRoute = require("./routes/reviewRoutes");

const port = 8080;

app.use(express.json());

// Add url-encoded middleware
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

const allowedOrigins = ['http://localhost:8080', 
                        'http://localhost:3000', 
                        'https://urbankicks.onrender.com', 
                        'https://urbankicksatserver.onrender.com', 
                        'https://urbankicks.netlify.app'
                    ];

const corsOptions = {
    origin: (origin, callback) => {
        // Check if the origin is in the allowedOrigins array or if it's undefined (e.g., a same-origin request)
        const isAllowed = allowedOrigins.includes(origin) || !origin;
        callback(null, isAllowed);
    },
    credentials: true, // Enable credentials (e.g., cookies, HTTP authentication)
};

// Use cors middleware with options
app.use(cors(corsOptions));

// Custom middleware for /products route (logging)
app.use("/products", (req, res, next) => {
    next();
});

// Route handlers using Express Router
app.use("/products", productRoute);
app.use("/orders", ordersRoute);
app.use("/users", usersRoute);
app.use("/cart", cartRoute);
app.use("/reviews", reviewRoute);

// Start the Express application
app.listen(port, () => {
    console.log(`App server is listening on port: ${port}`);
});