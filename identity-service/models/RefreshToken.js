const mongoose = require('mongoose');

const refreshTokenSchema = new mongoose.Schema({
    token : {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    expiresAt: {
        type: Date,
        required: true
    }
} , {timestamps: true})
refreshTokenSchema.index({expiresAt: 1} , {expireAfterSeconds: 0})
const refreshTokenModel = mongoose.model("Refresh-Token" , refreshTokenSchema)
module.exports = refreshTokenModel