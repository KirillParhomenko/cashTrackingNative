const ApiError = require("./../exceptions/api-error");
const CategoryModel = require("./../models/category-model");
const dotenv = require("dotenv");

class CategoryService {
  getCategories = async (_user) => {
    const categories = await CategoryModel.findOne({ _user });
    const defaultCategories = await CategoryModel.findById(
      process.env.MAIN_CATEGORIES_ID
    );
    const finallCategories = {
      ...categories._doc,
      categories: [...defaultCategories.categories, ...categories.categories],
    };
    return finallCategories;
  };

  addCategory = async (_user, name, logo, description, isSpending) => {
    let userCategory = await CategoryModel.findOne({ _user });

    if (!userCategory) {
      if (name && logo && description) {
        userCategory = await CategoryModel.create({
          _user,
          categories: [{ name, logo, description, isSpending }],
        });
      } else {
        userCategory = await CategoryModel.create({
          _user,
          categories: [{}],
        });
      }
    } else {
      userCategory.categories.push({ name, logo, description, isSpending });
      await userCategory.save();
    }
    return userCategory;
  };

  deleteCategory = async (_user, _category) => {
    const isCategoryExist = await CategoryModel.findOne({
      _user,
      categories: { $elemMatch: { _id: _category } },
    });
    if (!isCategoryExist) {
      throw ApiError.BadRequest("Category not exist! Error");
    }
    isCategoryExist.categories = isCategoryExist.categories.filter(
      (category) => category._id.valueOf() !== _category
    );
    return await isCategoryExist.save();
  };
}

module.exports = new CategoryService();
