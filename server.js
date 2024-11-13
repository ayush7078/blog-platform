const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");

require("dotenv").config();
connectDB();

const app = express();

// CORS configuration
const corsOptions = {
  origin: 'https://blogger-platform-app.netlify.app/', // Allow only requests from this frontend origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods
  credentials: true, // If you're using cookies or authentication headers
};

app.use(cors(corsOptions)); // Use CORS with custom configuration
app.use(express.json());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/posts", require("./routes/posts"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
