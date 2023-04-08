const bcryptjs = require("bcryptjs");
const UserModel = require("./../models/user-model");

class UserService {
  signup = async (email, password) => {
    const isUserAvailable = await UserModel.findOne({ email });
    if (isUserAvailable) {
      throw new Error(`Пользователь с таким email = ${email} есть!`);
    }
    const hashedPassword = await bcryptjs.hash(password, 3);
    const newUser = await UserModel.create({ email, password: hashedPassword });
    console.log(newUser);
  };
}

module.exports = new UserService();
