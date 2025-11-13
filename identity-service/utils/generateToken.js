const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const generateAccessToken = async (userId) => {
    try {
        const token = await jwt.sign(
          { userId },
          process.env.SECRET_KEY_GENERATE_TOKEN, {
            expiresIn: '15m'
          }
        );

        return token
    } catch (error) {
        next(error)
    }
} 

const generateRefreshToken = async () => {
  try {
    const token = crypto.randomBytes(40).toString("hex");
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    return { refreshToken: token, expiresAt };
  } catch (error) {
    next(error);
  }
};


module.exports = {
  generateAccessToken,
  generateRefreshToken,
};