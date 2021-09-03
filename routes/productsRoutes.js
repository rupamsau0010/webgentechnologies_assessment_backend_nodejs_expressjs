// Import depandencies
const { Router } = require("express")
const router = Router()

// Import local depandencies
const productControllers = require("../controllers/productControllers")
const { requireAuth } = require("../middlewares/authMiddlewares")

// Get All Products Route
router.get("/getallproducts", productControllers.getAllProducts_get)

// Create a New Product
router.post("/enterproduct", productControllers.enterNewProducts_post)

// Search a product
router.post("/searchproduct", productControllers.searchProduct_post)

// Export the Module
module.exports = router