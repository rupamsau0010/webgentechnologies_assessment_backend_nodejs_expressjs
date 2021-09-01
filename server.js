// Import Depandencies
require("dotenv").config()

const express = require("express")
const app = express()

// Import Local Depandencies
const mongoConnect = require("./config/mongoDB")

// Middlewares for express
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// Connect to Prior Database(MongoDB)
mongoConnect()

// Routes
// Main Routes


// Temporary Routes



// Running the server on PORT
const port = process.env.PORT
app.listen(port || 5000, () => {
    console.log(`Server is running on port 5000 locally or port ${port} on the cloud`);
})