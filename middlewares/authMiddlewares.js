// Import Depandencies...
const jwt = require("jsonwebtoken");

// Middleware for Protecting routes...
const requireAuth = (req, res, next) => {
    try {
        const token = req.body.jwt
        console.log(token);
        const decodeToken = jwt.verify(token, process.env.JWT_SECRET)
        console.log(decodeToken);
        next()
    } catch (error) {
        // console.log(error);
        return res.json({
            status: "invalid",
            payload: "You are not authorized to post a product. Please consider login/signup"
        })
    }
}

module.exports = { requireAuth }