// Inport Depandencies

// Import Local Depandencies
const Product = require("../models/products")

const updateProducts = () => {
    Product.updateMany({}, {$set: {productCreatedBy: "61310b8049bcd42d02fe4cb4"}}, async function(err1, data1) {
        if (data1 && !err1) {
            console.log(data1);
        } else {
            console.log(err1);
        }
    })
}

module.exports = updateProducts