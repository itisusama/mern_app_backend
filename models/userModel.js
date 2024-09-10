const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require("validator")

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
        }
})

// Static signup method
userSchema.statics.signup = async function(email, password) {
    
    if(!email || !password) {
        throw Error("All fields are required")
    }
    
    if(!validator.isEmail(email)){
        throw Error("Invalid email")
    }

    if (!validator.isStrongPassword(password)) {
        throw Error("Password is weak")
    }

    const userExist = await this.findOne({ email });
    if (userExist) {
        throw Error('Email already in use');
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const user = await this.create({ email, password: hashedPassword })

    return user
}

module.exports = mongoose.model('User', userSchema)