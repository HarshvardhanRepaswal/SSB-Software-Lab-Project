const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const Barber = require("./models/barber")

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Connect to MongoDB with proper error handling
mongoose
  .connect("mongodb+srv://hvrSSB04:qwertySSB1234@clusterssb.6zmqk.mongodb.net/")
  .then(() => {
    console.log("Connected to MongoDB Atlas")
    // Only start the server after successful database connection
    app.listen(4000, () => console.log("Server running on port 4000"))
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err)
    process.exit(1) // Exit with error
  })

// API endpoint for creating a barber account
app.post("/create-account", async (req, res) => {
  try {
    const { firstName, lastName, email, phone, shopName, address, experience, specialties, password } = req.body

    console.log("Received data:", req.body) // Log the received data

    // Check if a barber with the same email already exists
    const existingBarber = await Barber.findOne({ email })
    if (existingBarber) {
      return res.status(400).json({ error: "A barber with this email already exists" })
    }

    const barberDoc = await Barber.create({
      firstName,
      lastName,
      email,
      phone,
      shopName,
      address,
      experience,
      specialties,
      password,
    })

    console.log("Barber created:", barberDoc)
    res.json(barberDoc)
  } catch (error) {
    console.error("Error creating barber:", error)
    res.status(500).json({ error: error.message })
  }
})

// API endpoint for barber login
app.post("/barber-login", async (req, res) => {
  try {
    const { barbername, password } = req.body

    console.log("Login attempt for:", barbername)

    // Find barber by first name, last name, or email
    const barber = await Barber.findOne({
      $or: [{ firstName: barbername }, { lastName: barbername }, { email: barbername }],
    })

    if (!barber) {
      return res.status(401).json({ error: "Invalid username or password" })
    }

    // Check password
    if (barber.password !== password) {
      return res.status(401).json({ error: "Invalid username or password" })
    }

    // Return barber info (excluding password)
    const barberInfo = {
      id: barber._id,
      firstName: barber.firstName,
      lastName: barber.lastName,
      email: barber.email,
      shopName: barber.shopName,
    }

    res.json(barberInfo)
  } catch (error) {
    console.error("Login error:", error)
    res.status(500).json({ error: "Server error. Please try again later." })
  }
})

