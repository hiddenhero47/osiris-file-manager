const express = require("express");
const multer = require('multer');
const bodyParser = require('body-parser');
const colors = require("colors");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const port = process.env.PORT || 6000;
const path = require("path");
const handleCors = require("./middleware/corsMiddleware");


connectDB();

const app = express();

//middleware for body parser
const forms = multer();
app.use(express.json());
app.use(forms.any());
app.use(express.urlencoded({ extended: false }));

// Declaring Static Folder
app.use(express.static(path.join(__dirname, 'public')));

//middleware cors
app.use(handleCors);

app.use("/api/goals", require("./routes/goalRoutes"));

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
