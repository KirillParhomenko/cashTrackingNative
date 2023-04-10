const userService = require("../services/user-service");
const tokenService = require("../services/token-service");
const emailService = require("../services/email-service");
const UserDto = require("./../dtos/user-dto");
const ApiError = require("../exceptions/api-error");
const { validationResult } = require("express-validator");

class UserController {
  signup = async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest("Validation error"), errors.array());
      }
      const { email, password } = req.body;
      const user = await userService.signup(email, password);
      const userDto = new UserDto(user);
      const token = await tokenService.updateToken(userDto);
      emailService.sendMail(email, user.activationLink);
      res.cookie("refreshToken", token.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.status(201).json({
        accessToken: token.accessToken,
        refreshToken: token.refreshToken,
        user,
      });
    } catch (e) {
      next(e);
    }
  };

  signin = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await userService.signin(email, password);
      const tokens = await tokenService.updateToken(user);
      res.cookie("refreshToken", tokens.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.status(200).send({
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        user,
      });
    } catch (e) {
      next(e);
    }
  };

  refresh = async (req, res, next) => {
    try {
      const { refreshToken } = req.cookies;
      const newAccessToken = await tokenService.refreshAccessToken(
        refreshToken
      );
      return res.status(200).json({
        accessToken: newAccessToken.accessToken,
        refreshToken,
        user: { id: newAccessToken.id, email: newAccessToken.email },
      });
    } catch (e) {
      next(e);
    }
  };

  logout = async (req, res, next) => {
    try {
      const { refreshToken } = req.cookies;
      const token = await tokenService.logout(refreshToken);
      console.log("re");
      res.clearCookie("refreshToken");
      console.log("rere");
      return res.status(200).json(token);
    } catch (e) {
      next(e);
    }
  };

  activate = async (req, res, next) => {
    try {
      const link = req.params.link;
      const isActivated = userService.activateAccount(link);
      if (!isActivated) {
        throw ApiError.BadRequest("Unknow activation error");
      }
      return res.redirect(process.env.CLIENT_URL);
    } catch (e) {
      next(e);
    }
  };

  getUsers = async (req, res, next) => {
    try {
      const users = await userService.getUsers();
      res.status(200).json(users);
    } catch (e) {
      next(e);
    }
  };
}

module.exports = new UserController();
