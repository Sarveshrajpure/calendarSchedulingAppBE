const express = require("express");
const app = express();
const mongoose = require("mongoose");
const mongooseSanitize = require("express-mongo-sanitize");
require("dotenv").config();
const xss = require("xss-clean");
const routes = require("./routes");
const { convertToApiError, handleError } = require("./middlewares/apiError");
const cors = require("cors");

//MongoDb Connection
const mongoUri = `mongodb+srv://${process.env.DB_ADMIN}:${process.env.DB_PASS}@${process.env.DB_HOST}?retryWrites=true&w=majority`;

mongoose.connect(mongoUri);

const connection = mongoose.connection;

if (connection) {
  console.log("Connected to mongodb!");
}

//BODY PARSER
app.use(express.json());

// CORS
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

//SANITIZE JSON
app.use(xss());
app.use(mongooseSanitize());

//ROUTES
app.use("/api", routes);

//API ERROR HANDLING
app.use(convertToApiError);
app.use((err, req, res, next) => {
  handleError(err, res);
});

const port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
