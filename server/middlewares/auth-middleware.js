const ApiError = require("./../exceptions/api-error");
const tokenService = require("./../services/token-service");

module.exports = (req, res, next) => {
  try {
    const bearerAccessTokenAuth = req.header("authorization");
    if (!bearerAccessTokenAuth) {
      next(ApiError.UnauthorizedError());
    }
    const accessToken = bearerAccessTokenAuth.split(" ");
    if (!accessToken) {
      next(ApiError.UnauthorizedError());
    }
    const isVerifedAccessToken = tokenService.verifyAccessToken(accessToken[1]);
    if (!isVerifedAccessToken) {
      next(ApiError.UnauthorizedError());
    }
    next();
  } catch (error) {
    next(ApiError.UnauthorizedError());
  }
};
