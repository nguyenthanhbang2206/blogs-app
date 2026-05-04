const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");
const authRouter = require("./routes/authRoutes");
const blogRouter = require("./routes/blogRoutes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/blogs", blogRouter);
app.use("/api/auth", authRouter);

app.get("/", (req, res) => {
  res.send("API running...");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
