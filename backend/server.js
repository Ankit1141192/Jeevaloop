const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const authRoutes = require("./routes/auth.routes");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/", authRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT, () => {
      console.log(`Server running at http://localhost:${process.env.PORT}`);
    });
  })
  .catch((err) => console.error(err));
