// Import Depandencies
require("dotenv").config()

const express = require("express")
const cookieParser = require("cookie-parser")
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

// Connect to Prior Database(MongoDB)
mongoConnect()

// Routes
// Main Routes
app.use("/authentication/", generalUserRoutes)
app.use("/products", productRoutes)

// Middlewares for external server Request process
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://rupamsau0010.github.io/webgentechnologies_assessment_frontend_react/#/"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

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