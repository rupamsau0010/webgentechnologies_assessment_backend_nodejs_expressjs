// Import Depandencies
require("dotenv").config()

const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const app = express()

// Import Local Depandencies
const mongoConnect = require("./config/mongoDB")
const generalUserRoutes = require("./routes/generalUserRoutes")
const productRoutes = require("./routes/productsRoutes")
// const enterProducts = require("./temp/enterProducts")

// Middlewares for express
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// Middlewares for cookie-parser
app.use(cookieParser());

// Cors Access control middlewares
app.use(cors({
    origin: ['https://rupamsau0010.github.io', 'http://localhost:3000']
}));

// Connect to Prior Database(MongoDB)
mongoConnect()

// Routes
// Main Routes
app.use("/authentication/", generalUserRoutes)
app.use("/products", productRoutes)


// Temporary Routes
// enterProducts()
app.get("/", (req, res) => {
    res.json({"data": "Hello World"})
})

// Running the server on PORT
const port = process.env.PORT
app.listen(port || 5000, () => {
    console.log(`Server is running on port 5000 locally or port ${port} on the cloud`);
})