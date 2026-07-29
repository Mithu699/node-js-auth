require("dotenv").config();
const express = require("express");
const connectToDB = require("./database/db");
const authRoutes = require("./routes/auth");
const homeRoutes = require("./routes/ home-router")

connectToDB();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());


app.use("/api/auth", authRoutes);
app.use("/api/home", homeRoutes);

app.listen(PORT, () => {
  console.log(`Server is now listening to ${PORT}`);
});
