const express = require("express");
// to manage MongoDB database
const mongoose = require("mongoose");
// parses incoming request bodies and makes them available as objects in the req.body property. 
const bodyParser = require("body-parser");
// To add the .env path variables to process.env by default
const dotenv = require("dotenv").config();
const path = require("path");
// To access resources from distant servers.
var cors = require("cors");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// parse the incoming requests with JSON payloads
app.use(express.json());
app.use(cors());

// Serve static files
/* app.use(express.static('public')); */
app.use(express.static(path.join(__dirname, "public")));

// EJS Template Engine
app.set("view engine", "ejs");

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Database connection
// mongoose.connect(process.env.DB_CONNECTION).then(() => console.log(`Connected to MongoDB ${process.env.DB_CONNECTION} `))
//   .catch(err => console.error('Could not connect to MongoDB:', err.stack));

mongoose
  .connect(process.env.DB_CONNECTION, {})
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Could not connect to MongoDB:", err));

// Mock data for users (replace with real database calls in a real app)
/* const users = [
    { _id: '1', name: 'John Doe', email: 'john@example.com' },
    { _id: '2', name: 'Jane Smith', email: 'jane@example.com' },
    { _id: '3', name: 'Bob Johnson', email: 'bob@example.com' }
]; 
*/

// Routes
const indexRoute = require("./routes/index");
const usersRoute = require("./routes/users");

// Default Route Parameter Is Defined Here
app.use("/", indexRoute);
app.use("/user", usersRoute);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
