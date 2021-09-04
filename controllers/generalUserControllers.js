// Import depandencies
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const express = require("express")

const app = express()

// Import local dependencies
const Generalusers = require("../models/generalUser")

// Use cookie parser
app.use(cookieParser());

// Handel Errors...
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { email: "", password: ""};

    // Incorrect Email while login...
    if (err.message === "Incorrect UserName or Email") {
        errors.email = "That email is not Registrated. Consider Signup.";
        return errors;
    }

    // Incorrect Password while login...
    if (err.message === "Incorrect Password") {
        errors.password = "That Password is incorrect. Try Again.";
        return errors;
    }

    // duplicate error handel...
    if(err.code === 11000) {
        errors.email = "This email is already registrated";
        return errors;
    }

    // Validation Errors...
    if (err.message.includes("user validation failed")) {
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message;
        });
    }

    return errors;
}

// Use JWT...
const maxAge = 3 * 24 * 60 * 60; // 3 days valid...

// Create a new JWT...
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: maxAge
    });
}


module.exports.signup_post = async(req, res) => {
    // Get data from req.body
    const { email, password } = req.body
    console.log(email);
    console.log(password);
    
    try {
        const generalUser = await Generalusers.create({ email, password }); // Creating new user...
        const token = createToken(generalUser._id); // Creating JWT token...
        res.cookie("jwt", token, {maxAge: maxAge * 1000}); // Creating a cookie using JWT and cookie-parser in the clieny's browser...
        console.log("User Created successfully...");
        res.status(201).json({ status: "success", userId: generalUser._id, email: generalUser.email, jwt: token }); 
    } catch(err) {
        console.log(err);
        const errors = handleErrors(err);  // If any conditional error occures by the user, then handel it...
        res.status(200).send({ errors });  
    }   
}

// Post request controller for login...
module.exports.login_post = async (req, res) => {
    const {email, password} = req.body; // Getting the data from the frontend using body-parser...

    try {
        const generalUser = await Generalusers.login(email, password);  // Login the user using Statics function of User data model...
        const token = createToken(generalUser._id);  // Creating JWT token...
        console.log(token);
        res.cookie("jwt", token, { maxAge: maxAge * 1000});  // Creating a cookie using JWT and cookie-parser in the clieny's browser...
        res.status(200).json({ status: "success", userId: generalUser._id, email: generalUser.email, jwt: token });  
        
    } catch(err) {
        // console.log(err);
        const errors = handleErrors(err);  // If any conditional error occures by the user, then handel it...
        // console.log(errors);
        res.status(200).json({ errors });  
    }
}

// Logout Users
// Post request controller for logout...
module.exports.logout_post = (req, res) => {
    res.cookie("jwt", "", { maxAge: 1 });  // Creating a JWT token for 1 ms and expireing it immidiately...
    res.redirect("/");
}