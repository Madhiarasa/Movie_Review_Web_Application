const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/movies", require("./routes/movieRoutes"));
app.use("/api/reviews", require("./routes/reviewRoutes"));
app.use("/api/lists", require("./routes/listRoutes"));
app.use("/api/follow", require("./routes/followRoutes"));
app.use("/api/diary", require("./routes/diaryRoutes"));

// Default route
app.get("/", (req, res) => {
    res.send("Backend API is running..."); 
});

module.exports = app;
