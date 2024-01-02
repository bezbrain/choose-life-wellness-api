const express = require("express");
require("dotenv").config();
require("express-async-errors");
const authRoute = require("./routes/auth.route");
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

const connectDB = require("./db/connect");

const app = express();
app.use(express.json());

// Dynamic port
const port = process.env.PORT || 3000;

// Routes
app.get("/", (req, res) => {
  res.send("<h1>This is the home page</h1>");
});

// Base url
app.use("/api/v1/auth", authRoute);

// Not-found and error-handler Middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

// Start DB
const startDB = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};
startDB();
