// Import depandencies

// Import Loacl depandencies
const Product = require("../models/products")

// Product Controllers
// Get All Products
module.exports.getAllProducts_get = async(req, res) => {
    Product.find({}, (err1, data1) => {
        if (err1) {
            res.json({
                status: "failure", 
                data: "Internal Problem. Please Try Again."
            })
        } else {
            res.json({
                status: "success",
                data: data1
            })
        }
    })
}