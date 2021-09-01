// Inport Depandencies

// Import Local Depandencies
const Product = require("../models/products")

const enterProducts = () => {
    const product = new Product({
        productName: "Woman's Sports Shoes",
        companyName: "Adidas",
        productTitle: "lorem ipsam doler sit bros, with yui iposta get some",
        productPrice: 5999,
        productImgUrl: "https://content.adidas.co.in/static/Product-EW2453/adidas_EW2453_1.jpg"
    })

    product.save((err, res) => {
        if (err) {
            console.log(err);
        } else {
            console.log(res);
        }
    })
}

module.exports = enterProducts