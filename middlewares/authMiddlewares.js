// Import Depandencies...
const jwt = require("jsonwebtoken");

// Middleware for Protecting routes...
const requireAuth = (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        const decodeToken = jwt.verify(token, process.env.JWT_SECRET)
        req.userData = decodeToken
        console.log(decodeToken);
        next()
    } catch (error) {
        return res.json({
            status: "invalid",
            payload: "You are not authorized to post a product. Please consider login/signup"
        })
    }
}

module.exports = { requireAuth }