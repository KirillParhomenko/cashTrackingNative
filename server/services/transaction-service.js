const ApiError = require("../exceptions/api-error");
const TransactionModel = require("../models/transaction-model");
const CategoryModel = require("../models/category-model");
const BalanceAccountModel = require("../models/balanceAccount-model");

class TransactionService {
  addTransaction = async (
    _user,
    _balanceAccount,
    _category,
    price,
    date,
    description,
    isSpending
  ) => {
    let createdTransaction = await TransactionModel.create({
      _user,
      _balanceAccount,
      _category,
      price,
      date: date || Date.now(),
      description,
      isSpending,
    });
    if (!createdTransaction) {
      throw ApiError.BadRequest("Creating consumption error");
    }

    const changedBalanceAccount = await BalanceAccountModel.findById(
      _balanceAccount
    );

    changedBalanceAccount.balance = isSpending
      ? changedBalanceAccount.balance - parseFloat(price)
      : changedBalanceAccount.balance + parseFloat(price);

    await changedBalanceAccount.save();

    let finallTransaction = await createdTransaction.populate({
      path: "_balanceAccount",
      populate: { path: "_currency" },
    });

    finallTransaction = { ...finallTransaction._doc };

    const categoryId = finallTransaction._category;

    const category = await CategoryModel.findOne({
      categories: { $elemMatch: { _id: categoryId } },
    });

    finallTransaction._category = category.categories.find((category) => {
      return category._id.equals(categoryId);
    });

    return finallTransaction;
  };

  getTransaction = async (_user, isSpending) => {
    let parameters;
    if (isSpending !== null && isSpending !== undefined) {
      parameters = { _user, isSpending };
    } else {
      parameters = { _user };
    }
    let transactions = await TransactionModel.find(parameters);
    transactions = Promise.all(
      transactions.map(async (transaction) => {
        let finallTransaction = await transaction.populate({
          path: "_balanceAccount",
          populate: { path: "_currency" },
        });

        finallTransaction = { ...finallTransaction._doc };

        const categoryId = finallTransaction._category;

        const category = await CategoryModel.findOne({
          categories: { $elemMatch: { _id: categoryId } },
        });

        finallTransaction._category = category.categories.find((category) => {
          return category._id.equals(categoryId);
        });

        return finallTransaction;
      })
    );
    return transactions;
  };

  deleteTransaction = async (_user, _transaction) => {
    const transaction = await TransactionModel.findOne({
      _id: _transaction,
      _user,
    });
    if (!transaction) {
      throw ApiError.BadRequest(
        "Transaction not found! Delete transaction Error!"
      );
    }

    const balanceAccount = await BalanceAccountModel.findById(
      transaction._balanceAccount
    );
    if (!balanceAccount) {
      throw ApiError.BadRequest("Balance not found. Delete transaction Error!");
    }

    balanceAccount.balance = transaction.isSpending
      ? balanceAccount.balance + transaction.price
      : balanceAccount.balance - transaction.price;

    await balanceAccount.save();
    return await transaction.deleteOne();
  };

  putTransaction = async (
    _user,
    _balanceAccount,
    _transaction,
    _category,
    price,
    date,
    description,
    isSpending
  ) => {
    const transaction = await TransactionModel.findOne({
      _id: _transaction,
      _user,
    });
    if (!transaction) {
      throw ApiError.BadRequest(
        "Transaction not found! Change transaction Error!"
      );
    }

    if (isSpending !== null && isSpending !== undefined) {
      if (transaction.isSpending !== isSpending) {
        transaction.isSpending = isSpending;
        const balanceAccount = await BalanceAccountModel.findById(
          transaction._balanceAccount
        );
        balanceAccount.balance = isSpending
          ? balanceAccount.balance - transaction.price
          : balanceAccount.balance + transaction.price;
        await balanceAccount.save();
      }
    }

    if (price) {
      const balanceAccount = await BalanceAccountModel.findById(
        transaction._balanceAccount
      );
      balanceAccount.balance = transaction.isSpending
        ? balanceAccount.balance - price
        : balanceAccount.balance + price;
      await balanceAccount.save();
      transaction.price = price;
    }

    if (_balanceAccount) {
      const currentBalanceAccount = await BalanceAccountModel.findById(
        transaction._balanceAccount
      );

      const newBalanceAccount = await BalanceAccountModel.findById(
        _balanceAccount
      );

      currentBalanceAccount.balance = transaction.isSpending
        ? currentBalanceAccount.balance + transaction.price
        : currentBalanceAccount.balance - transaction.price;

      newBalanceAccount.balance = transaction.isSpending
        ? newBalanceAccount.balance - transaction.price
        : newBalanceAccount.balance + transaction.price;

      transaction._balanceAccount = _balanceAccount;

      await currentBalanceAccount.save();
      await newBalanceAccount.save();
    }

    if (_category) {
      transaction._category = _category;
    }

    if (date) {
      transaction.date = date;
    }

    if (description) {
      transaction.description = description;
    }

    return await transaction.save();
  };
}

module.exports = new TransactionService();
