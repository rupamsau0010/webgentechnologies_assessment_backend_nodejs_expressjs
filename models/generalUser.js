// Import depandencies
const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

// Import local depandencies

// create a schema
const generalUserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please Enter Your Email."],
    unique: [true, "This email is alredy reistrated. Please consider login."],
    lowercase: true,
    validate: [isEmail, "Please Enter a Valid Email"],
  },
  password: {
    type: String,
    required: [true, "Please enter a valid password"],
    minlength: [6, "Length must be greated than 6"],
  }
});

// fire a function before doc saved to DB...
generalUserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Static Method to login the user...
generalUserSchema.statics.login = async function (userNameOremail, password) {
  const generalUser = await this.findOne({ email: userNameOremail });
  if (generalUser) {
    const auth = await bcrypt.compare(password, generalUser.password);
    if (auth) {
      return generalUser;
    } else {
      throw Error("Incorrect Password");
    }
  } else {
    const generalUser = await this.findOne({ userName: userNameOremail });
    if (generalUser) {
      const auth = await bcrypt.compare(password, generalUser.password);
      if (auth) {
        return generalUser;
      } else {
        throw Error("Incorrect Password");
      }
    } else {
      throw Error("Incorrect UserName or Email");
    }
  }
};

const Generaluser = mongoose.model("generaluser", generalUserSchema);

// Export the module
module.exports = Generaluser;
