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

// Update a Product
module.exports.updateProduct_post = async(req, res) => {
    var myquery = { _id: req.body.productId };
    var newvalues = { $set: { productName: req.body.productName, companyName: req.body.companyName, productTitle: req.body.productTitle, productPrice: req.body.productPrice, productImgUrl: req.body.productImgUrl, productUpdatedAt: new Date() } };
    Product.findOne({_id: req.body.productId }, async function(err1, data1) {
        if (data1.productCreatedBy === req.body.productCreatedBy) {
            Product.updateOne(myquery, newvalues, async function(err2, data2) {
                if (data2 && !err2) {
                    res.json({
                        status: "success",
                        payload: "Product Successfully Updated"
                    })
            } else {
                res.json({
                    status: "failure",
                    payload: "Internal Server Error"
                })
            }
        })
        } else {
            res.json({
                status: "failure",
                payload: "You are not authorized to Update this Product"
            })
        }
    })
}

// Delete a product
module.exports.deleteProduct_post = async(req, res) => {
    var userId = req.body.userId
    var productId = req.body.productId

    Product.findOne({_id: productId }, async function(err1, data1) {
        if (data1 && !err1) {
            if (data1.productCreatedBy === userId) {
                Product.deleteOne({_id: productId}, function(err1, data1) {
                    if (data1 && !err1) {
                        res.json({
                            status: "success",
                            payload: "Product Updated Successfully"
                        })
                    } else {
                        res.json({
                            status: "failure",
                            payload: "Internal Server Error"
                        })
                    }
                })
            } else {
                res.json({
                    status: "failure",
                    payload: "You are not authorized to Update this Product as You have not created it"
                })
            }
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
