const bcryptjs = require("bcryptjs");
const UserModel = require("./../models/user-model");

class UserServices {
  signup = async (email, password) => {
    const isUserAvailable = await UserModel.findOne({ email });
    if (!isUserAvailable) {
      throw new Error(`Пользователь с таким email = ${email} есть!`);
    }
    const hashedPassword = bcryptjs.hash(password, 3);
    const newUser = await UserModel.create({ email, password: hashedPassword });
  };
}

module.exports = new UserServices();
