const jwt = require("jsonwebtoken");
const Token = require("./../models/token-model");
const ApiErrors = require("./../exceptions/api-error");

class TokenService {
  updateToken = async (user) => {
    const refreshToken = jwt.sign(
      { user_id: user.id, email: user.email, fullName: user.fullName },
      process.env.SECRET_JWT_KEY,
      { expiresIn: "30d" }
    );
    const accessToken = jwt.sign(
      { user_id: user.id, email: user.email, fullName: user.fullName },
      process.env.SECRET_JWT_KEY,
      { expiresIn: "15m" }
    );

    const token = await Token.create({
      user_id: user.id,
      refreshToken,
    });

    return { tokenField: token, accessToken, refreshToken };
  };

  refreshAccessToken = async (refreshToken) => {
    const token = await Token.findOne({ refreshToken });
    if (!token) {
      throw ApiErrors.UnauthorizedError();
    }
    const verifyRefreshToken = this.verifyRefreshToken(refreshToken);
    if (!verifyRefreshToken) {
      throw ApiErrors.BadRequest("Invalid refresh token!");
    }
    return {
      id: verifyRefreshToken.user_id,
      email: verifyRefreshToken.email,
      accessToken: jwt.sign(
        {
          user_id: verifyRefreshToken.user_id,
          email: verifyRefreshToken.email,
          fullName: verifyRefreshToken.fullName,
        },
        process.env.SECRET_JWT_KEY,
        { expiresIn: "15m" }
      ),
    };
  };

  logout = async (refreshToken) => {
    if (!refreshToken) {
      throw ApiErrors.BadRequest("Token not finded");
    }
    const verifyRefreshToken = this.verifyRefreshToken(refreshToken);
    if (!verifyRefreshToken) {
      throw ApiErrors.BadRequest("You haven't permission!");
    }
    return await Token.deleteOne({ refreshToken });
  };

  verifyAccessToken = (accessToken) => {
    try {
      const isVerifided = jwt.verify(accessToken, process.env.SECRET_JWT_KEY);
      return isVerifided;
    } catch (error) {
      return null;
    }
  };

  verifyRefreshToken = (refreshToken) => {
    try {
      const isVerifided = jwt.verify(refreshToken, process.env.SECRET_JWT_KEY);
      return isVerifided;
    } catch (error) {
      return null;
    }
  };
}

module.exports = new TokenService();
