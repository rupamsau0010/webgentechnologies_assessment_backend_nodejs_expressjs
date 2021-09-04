// Import depandencies
const stringSimilarity = require("string-similarity")

// Import Loacl depandencies
const Product = require("../models/products")

// Product Controllers
// Get All Products
module.exports.getAllProducts_get = async(req, res) => {
    Product.find({}, (err1, data1) => {
        if (err1) {
            res.json({
                status: "failure", 
                payload: "Internal Problem. Please Try Again."
            })
        } else {
            res.json({
                status: "success",
                payload: data1
            })
        }
    })
}

// Enter New Product
module.exports.enterNewProducts_post = async(req, res) => {
    const product = new Product({
        productName: req.body.productName,
        companyName: req.body.companyName,
        productTitle: req.body.productTitle,
        productPrice: req.body.productPrice,
        productImgUrl: req.body.productImgUrl,
        productCreatedBy: req.body.productCreatedBy
    })

    product.save((err1, data1) => {
        if (err1) {
            res.json({
                status: "failure",
                payload: "Internal Error Occured. Please Try Again."
            })
        } else {
            res.json({
                status: "success",
                payload: data1
            })
        }
    })
}

// Search a Product
module.exports.searchProduct_post = async(req, res) => {
    // Get the Search Data
    const searchGiven = req.body.searchGiven
    
    const probability = (val, index) => {
        // console.log(val.tagline);
        // console.log(searchGiven);
        const prob = stringSimilarity.compareTwoStrings(searchGiven.toLowerCase(), val.productName.toLowerCase());
        return {data: val, value: prob}
    }

    // Query on the database
    const products = await Product.find({}).sort({ _id: -1 })

    productArray = products.map(probability)

    productArray.sort(function(first, second){
        return second.value - first.value
    })

    const finalProductArray = productArray.filter(element => element.value >= 0.3)

    ff = finalProductArray.map(i => i.data);

    res.json({
        status: "success",
        payload: ff
    })
}
