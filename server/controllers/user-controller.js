const userService = require("../services/user-service");
const tokenService = require("../services/token-service");

class UserController {
  signup = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if (!(email && password)) {
        throw new Error("Нет данных!");
      }
      const user = await userService.signup(email, password);
      if (!user) {
        throw new Error("Пользователь не создан!");
      }
    } catch (e) {
      console.log(e);
    }
  };

  signin = async (req, res, next) => {
    try {
    } catch (e) {}
  };

  refresh = async (req, res, next) => {
    try {
    } catch (e) {}
  };

  logout = async (req, res, next) => {
    try {
    } catch (e) {}
  };

  activate = async (req, res, next) => {
    try {
    } catch (e) {}
  };
}

module.exports = new UserController();
