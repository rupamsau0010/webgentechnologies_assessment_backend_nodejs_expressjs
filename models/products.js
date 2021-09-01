// Import Depandencies
const mongoose = require("mongoose")

// Import Local depandencies

// Create a Schema
const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    companyName: {
        type: String,
        required: true
    },
    productTitle: {
        type: String,
        required: true
    },
    productPrice: {
        type: Number,
        required: true
    },
    productImgUrl: {
        type: String,
    },
    productCreatedAt: {
        type: Date,
        default: new Date()
    }
})

// Export the Module
const Product = mongoose.model("products", productSchema)
module.exports = Product