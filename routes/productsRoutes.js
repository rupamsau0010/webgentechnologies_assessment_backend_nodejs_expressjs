// Import depandencies
const { Router } = require("express")
const router = Router()

// Import local depandencies
const productControllers = require("../controllers/productControllers")

// Get All Products Route
router.get("/getallproducts", productControllers.getAllProducts_get)

// Export the Module
module.exports = router