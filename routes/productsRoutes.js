// Import depandencies
const { Router } = require("express")
const router = Router()

// Import local depandencies
const productControllers = require("../controllers/productControllers")
const { requireAuth } = require("../middlewares/authMiddlewares")

// Get All Products Route
router.get("/getallproducts", productControllers.getAllProducts_get)

// Create a New Product
router.post("/enterproduct", requireAuth, productControllers.enterNewProducts_post)

// Update a product
router.post("/updateproduct", productControllers.updateProduct_post)

// Delete a Product
router.post("/deleteproduct", productControllers.deleteProduct_post)

// Search a product
router.post("/searchproduct", productControllers.searchProduct_post)

// Export the Module
module.exports = router