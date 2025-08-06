const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const authRoutes = require("./routes/auth.routes");
const patientRoutes = require("./routes/patient.routes");
const appointmentRoutes = require("./routes/appointment.routes");
const feedbackRoutes = require("./routes/feedback.routes");
const userRoutes = require("./routes/user.routes");

const errorHandler = require("./middlewares/errorHandler");

const app = express();

// Middleware setup
app.use(cors());
app.use(express.json());

// Root simple route for sanity check
app.get("/", (req, res) => {
  res.send("Welcome to Jeevaloop Hospital Management API");
});

// Route mounting
app.use("/auth", authRoutes);
app.use("/patients", patientRoutes);
app.use("/appointments", appointmentRoutes);
app.use("/feedbacks", feedbackRoutes);
app.use("/users", userRoutes);

// Global error handler, placed after routes
app.use(errorHandler);

// Use PORT from environment or fallback to 5000
const PORT = process.env.PORT || 5000;

// Connect to MongoDB and then start the server
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Exit process if DB connection fails
  });
