const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");

const connectDB = require("./config/db");
const errorHandler = require("./middleware/error");

// load env vars
dotenv.config({ path: "./config/config.env" });

// Connect to database
connectDB();

// Route file
const bootcamps = require("./routes/bootcamps");

const app = express();

// Body parser
app.use(express.json());

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Mount Routers
app.use("/api/v1/bootcamps", bootcamps);

// Error handler middleware
app.use(errorHandler);

const PORT = process.env.PORT || 7001;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Err: ${err.message}`.red);

  // Close server & exit process
  server.close(() => process.exit(1));
});
