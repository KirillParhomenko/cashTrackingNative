const bcryptjs = require("bcryptjs");
const uuid = require("uuid");
const UserModel = require("./../models/user-model");
const ApiErrors = require("./../exceptions/api-error");

class UserService {
  signup = async (email, password, fullName) => {
    const isUserAvailable = await UserModel.findOne({ email });
    if (isUserAvailable) {
      throw ApiErrors.BadRequest(`User is available with email = ${email}`);
    }
    const hashedPassword = await bcryptjs.hash(password, 3);
    const activationLink = uuid.v4();
    const newUser = await UserModel.create({
      fullName,
      email,
      password: hashedPassword,
      activationLink,
    });

    return {
      id: newUser._id,
      email: newUser.email,
      isActivated: newUser.isActivated,
      fullName: newUser.fullName,
      activationLink,
    };
  };

  signin = async (email, password) => {
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw ApiErrors.BadRequest(`No user with email = ${email}`);
    }
    const isPasswordEquals = await bcryptjs.compare(password, user.password);
    if (!isPasswordEquals) {
      throw ApiErrors.BadRequest("Incorrect password!");
    }
    return {
      id: user._id,
      email: user.email,
      isActivated: user.isActivated,
      fullName: user.fullName,
    };
  };

  activateAccount = async (link) => {
    const userWithActivationLink = await UserModel.findOne({
      activationLink: link,
    });
    if (!userWithActivationLink) {
      throw ApiErrors.BadRequest("User not found");
    }
    if (userWithActivationLink.isActivated) {
      return true;
    }
    userWithActivationLink.isActivated = true;
    return await userWithActivationLink.save();
  };

  getUsers = async () => {
    const users = await UserModel.find();
    return users;
  };

}

module.exports = new UserService();
