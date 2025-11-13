const logger = require('../utils/logger');
const User = require('../models/User');
const RefreshToken = require('../models/RefreshToken');
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/generateToken");

const register = async(req, res , next) => {
    try {
        const {username , email , password} = req.body
        const userExists = await User.findOne({$or : [{email} , {username}]})
        if(userExists){
            throw new Error("Email or Username already exists :)" , {statusCode: 409})
        }
        const user = new User({username , email , password})
        await user.save()
        logger.warn(`User[${user._id}] saved successfully :)`)

        const accessToken = await generateAccessToken(user._id)
        const {refreshToken, expiresAt} = await generateRefreshToken()

        await RefreshToken.create({user: user._id , token: refreshToken , expiresAt})
        logger.warn(`User's refresh token saved successfully :)`);

        return res.status(200).json({
            status: "success",
            message: "User registered successfully :)"
        })
        
    } catch (error) {
        next(error)
    }
}

module.exports = {register}