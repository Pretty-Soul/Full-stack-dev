const express = require('express');
const app = express();
const sequelize = require("./config/database");
const PORT = 3000;
app.use(express.json());

const User = require('./models/User');

sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected!");
    return sequelize.sync({ alter: true });
  })
  .then(() => console.log("Tables ready!"))
  .catch((err) => console.error("DB Error:", err));

app.post("/api/signup", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ message: "Username already registered" });
    }
    const newUser = await User.create({ username, password });
    return res.json({ message: "Signup successful!", user: newUser });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Server error during signup" });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: "Username and password required" });
    }
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    return res.json({
      message: "Login successful!",
      user: {
        id: user.id,
        username: user.username
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error during login" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
