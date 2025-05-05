const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const varietyRoutes = require('./routes/varietyRoutes');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const os = require('os');

const app = express();
const port = process.env.PORT || 3000;

// Swagger definition
const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'RiceWise API',
        version: '1.0.0',
        description: 'RiceWise API application using nodejs Express',
    },
    servers: [
        {
            url: 'http://localhost:3000/api',
        },
    ],
};

// Options for swagger-jsdoc
const options = {
    swaggerDefinition,
    apis: ['./routes/*.js'], // Path to your API docs (adjust as needed)
};  

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);

// Serve swagger docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(cors());
// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api', userRoutes);
app.use('/api', varietyRoutes);

// Get local IP address
function getLocalIp() {
    const interfaces = os.networkInterfaces();
    for (const name in interfaces) {
        for (const iface of interfaces[name]) {
            if (iface.family === 'IPv4' && !iface.internal) {
                return iface.address;
            }
        }
    }
    return 'localhost';
}

// Start server
app.listen(port, '0.0.0.0', () => {
    const ip = getLocalIp();
    console.log(`Swagger docs available at http://localhost:${port}/api-docs`);
    console.log(`✅ Server running at:`);
    console.log(`   → Local:   http://localhost:${port}`);
    console.log(`   → Network: http://${ip}:${port}`);
}); 