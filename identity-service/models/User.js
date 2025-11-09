const mongoose = require('mongoose');
const argon = require('argon2');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        min: 8
    }
} , {
    timestamps: true
})

userSchema.pre("save" , async function(next) {
    try {
        if(this.isModified("password")){
            this.password = await argon.hash(this.password)
        }
    } catch (error) {
        next(error)
    }
})

userSchema.methods.comparePassword = async function(hashedPassword) {
    try {
        return await argon.verify(this.password , hashedPassword )
    } catch (error) {
        next(error)
    }
}

userSchema.index({username: "text"})

const userModel = mongoose.model("User" , userSchema)

module.exports = userModel