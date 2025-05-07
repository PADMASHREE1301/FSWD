const express = require("express"); 
const mongoose = require("mongoose"); 
const cookieParser = require("cookie-parser"); 
const app = express(); 
const PORT = 5000; 
// Middleware 
app.use(express.json()); 
app.use(cookieParser()); 
// Connect to MongoDB 
mongoose.connect("mongodb://localhost:27017/auth-app", {
  useNewUrlParser: true, 
useUnifiedTopology: true, 
}) 
.then(() => console.log("Connected to MongoDB")) 
.catch((err) => console.log("Failed to connect to MongoDB", err)); 
// Routes 
const authRoutes = require("./routes/auth"); 
app.use("/api/auth", authRoutes); 
// Start Server 
app.listen(PORT, () => { 
console.log(`Server running on port ${PORT}`); 
}); 