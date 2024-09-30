const express = require('express');
const cors = require('cors');
const dotenv = require("dotenv");
const generalConfigs = require('./config/general-config')
const connectDB = require('./domain/db')
const logger = require('./domain/logs')
const AllRoutes =  require('./routes/AllRoutes')


const initializeServer = async(port) => {
  try {
    await connectDB();
    logger.info('Database connected successfully.');
    const server = express();

    // CORS configuration
    server.use(cors("*"));


    // Body parsers
    server.use(express.urlencoded({ extended: true, limit: '10mb' })); // Adjust limit as needed
    server.use(express.json({ limit: '10mb' })); // Adjust limit as needed
    server.use(express.text({ type: '*/xml' }));

    server.use((req, res, next) => {
      console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
      next(); // Pass control to the next middleware
  });
    // Route handlers
    server.use("/api/v1/", AllRoutes);

    // Error handling middleware
    server.use((err, req, res, next) => {
      logger.error('Unhandled error:', err);
      res.status(500).json({ message: 'Internal Server Error' });
    });

    // Start server
    server.listen(port, () =>
      console.log(`Server instance listening @port: ${port}`)
    );

    return server;

  } catch (err) {
    logger.error("Unable to initialize server:", err);
    process.exit(1); // Exit with failure code
  }
};

// Initialize server with configuration
module.exports = initializeServer(generalConfigs.serverPort || 3000);
