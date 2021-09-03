// Import depandencies
const { Router } = require("express")
const router = Router()

// Import local depandencies
const generalUserControllers = require("../controllers/generalUserControllers")

// Signup route
router.post('/signup', generalUserControllers.signup_post)

// Login route
router.post('/login', generalUserControllers.login_post)

// Logout Route
router.post("/logout", generalUserControllers.logout_post)

// Export the module
module.exports = router