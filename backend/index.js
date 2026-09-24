const express = require("express");
const cors = require("cors");

const app = express();

const PORT = 5000;

app.use(cors());
app.use(express.json());


// =========================
// TEST API
// =========================

app.get("/", (req, res) => {
  res.json({
    message: "StreamFlix backend is running"
  });
});


// =========================
// LOGIN API
// =========================

app.post("/api/login", (req, res) => {

  const { email, password } = req.body;

  // Check empty fields
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required"
    });
  }


  // Validate email format
  const emailPattern =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(email)) {
    return res.status(400).json({
      success: false,
      message: "Please enter a valid email address"
    });
  }


  // Validate password length
  if (password.length < 6) {
    return res.status(400).json({
      success: false,
      message: "Password must contain at least 6 characters"
    });
  }


  // Valid login
  return res.status(200).json({
    success: true,
    message: "Login successful",

    user: {
      name: email.split("@")[0],
      email: email
    }
  });

});


// =========================
// START SERVER
// =========================

app.listen(PORT, () => {
  console.log(
    `Backend server running at http://localhost:${PORT}`
  );
});