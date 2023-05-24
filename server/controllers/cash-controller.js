const balanceAccountService = require("./../services/balanceAccount-service");
const currencyService = require("../services/currency-service");
const categoryService = require("./../services/category-service");
const ApiError = require("../exceptions/api-error");
const transactionService = require("../services/transaction-service");
const dotenv = require("dotenv");
const currencyModel = require("./../models/currency-model");

class CashController {
  registrationSetting = async (req, res, next) => {
    try {
      const { _user } = req.body;
      const _currency = await currencyModel.findOne({ abbreviation: "RUB" });
      await balanceAccountService.createBalanceAccount(
        _user,
        _currency,
        "Основной",
        0,
        true
      );
      await categoryService.addCategory(_user);
      return res.status(200).json();
    } catch (e) {
      next(e);
    }
  };

  balanceAccountOperation = async (req, res, next) => {
    try {
      let {
        _user,
        _balanceAccount,
        _currency,
        name,
        balance,
        isConsiderInGeneralBalance,
        _recipientBalanceAccount,
      } = req.body;
      if (!_user) {
        _user = req.params?._user;
      }
      if (!_balanceAccount) {
        _balanceAccount = req.params?._balanceAccount;
      }
      if (!_recipientBalanceAccount) {
        _recipientBalanceAccount = req.params?._recipientBalanceAccount;
      }
      switch (req.method) {
        case "POST":
          if (
            _user &&
            _currency &&
            name &&
            balance !== undefined &&
            isConsiderInGeneralBalance
          ) {
            const createdBalanceAccount =
              await balanceAccountService.createBalanceAccount(
                _user,
                _currency,
                name,
                balance,
                isConsiderInGeneralBalance
              );
            return res.status(200).json(createdBalanceAccount);
          } else {
            throw ApiError.BadRequest("Need more parameters");
          }
          break;
        case "GET":
          if (_user) {
            const allBalanceAccounts =
              await balanceAccountService.getBalanceAccounts(_user);
            return res.status(200).json(allBalanceAccounts);
          } else {
            throw ApiError.BadRequest("Error parameters!");
          }
          break;
        case "PUT":
          if (_balanceAccount) {
            const changedBalanceAccount =
              await balanceAccountService.updateBalanceAccount(
                _balanceAccount,
                _currency,
                name,
                balance,
                isConsiderInGeneralBalance
              );
            return res.status(200).json(changedBalanceAccount);
          } else {
            throw ApiError.BadRequest("Change error parameters");
          }
          break;
        case "DELETE":
          if (_user && _balanceAccount) {
            const deletedBalanceAccount = _recipientBalanceAccount
              ? await balanceAccountService.deleteWithTransferBalanceAccount(
                  _user,
                  _balanceAccount,
                  _recipientBalanceAccount
                )
              : await balanceAccountService.deleteBalanceAccount(
                  _user,
                  _balanceAccount
                );
            return res.status(200).json(deletedBalanceAccount);
          } else {
            throw ApiError.BadRequest("Delete error parameters");
          }
          break;
      }
    } catch (e) {
      next(e);
    }
  };

  getCurrency = async (req, res, next) => {
    try {
      const allCurrency = await currencyService.getAllCurrency();
      return res.status(200).json(allCurrency);
    } catch (e) {
      next(e);
    }
  };

  balanceAccountTransfer = async (req, res, next) => {
    try {
      let { _user, _recipient, _transfer, _sender, description, price } =
        req.body;

      if (!_user) {
        _user = req.params._user;
      }
      switch (req.method) {
        case "GET":
          if (_user) {
            const transfers =
              await balanceAccountService.getTransfersBetweenBalanceAccounts(
                _user
              );
            res.status(200).json(transfers);
          } else {
            throw ApiError.BadRequest("Error parameters!");
          }
          break;
        case "POST":
          if (_user && _recipient && _sender && price) {
            const transfer =
              await balanceAccountService.createTransferBetweenBalanceAccounts(
                _user,
                _recipient,
                _sender,
                description,
                price
              );

            return res.status(200).json(transfer);
          } else {
            throw ApiError.BadRequest("Need more parameters");
          }
          break;
        case "DELETE":
          if (_transfer) {
            const isDeleted = await balanceAccountService.deleteTransfer(
              _transfer
            );
            return res.status(200).json(isDeleted);
          } else {
            throw ApiError.BadRequest("Need more parameters");
          }
          break;
      }
    } catch (e) {
      next(e);
    }
  };

  categoryOperation = async (req, res, next) => {
    try {
      let { _user, _category, name, logo, description, isSpending } = req.body;
      if (!_user) {
        _user = req.params._user;
      }
      switch (req.method) {
        case "POST":
        case "PUT":
          if (_user && name && logo && isSpending) {
            const userCategory = await categoryService.addCategory(
              _user,
              name,
              logo,
              description,
              isSpending
            );
            return res.status(200).json(userCategory);
          } else {
            throw ApiError.BadRequest("Error parameters!");
          }
          break;
        case "DELETE":
          if (_user && _category) {
            const isDeleted = await categoryService.deleteCategory(
              _user,
              _category
            );
            return res.status(200).json(isDeleted);
          } else {
            throw ApiError.BadRequest("Error parameters!");
          }
          break;
        case "GET":
          if (_user) {
            const categories = await categoryService.getCategories(_user);
            console.log(categories);
            return res.status(200).json(categories);
          } else {
            throw ApiError.BadRequest("Error parameters!");
          }
          break;
      }
    } catch (e) {
      next(e);
    }
  };

  transactionOperation = async (req, res, next) => {
    try {
      let {
        _user,
        _balanceAccount,
        _transaction,
        _category,
        price,
        date,
        description,
        isSpending,
      } = req.body;
      if (!_user && !isSpending) {
        _user = req.params?._user;
        isSpending = req.params?.isSpending;
      }
      console.log(_user);
      if (!_transaction) {
        _transaction = req.params?._transaction;
      }
      switch (req.method) {
        case "GET":
          if (_user && isSpending !== undefined && isSpending !== null) {
            const transactions = await transactionService.getTransaction(
              _user,
              isSpending
            );

            return res.status(200).json(transactions);
          } else {
            throw ApiError.BadRequest("Error parameters!");
          }
          break;
        case "POST":
          if (
            _user &&
            _balanceAccount &&
            _category &&
            price &&
            isSpending !== null &&
            isSpending !== undefined
          ) {
            const createdTranscation = await transactionService.addTransaction(
              _user,
              _balanceAccount,
              _category,
              price,
              date,
              description,
              isSpending
            );
            return res.status(200).json(createdTranscation);
          } else {
            throw ApiError.BadRequest("Need more parameters");
          }
          break;
        case "PUT":
          if (_transaction && _user) {
            const editedTransaction = await transactionService.putTransaction(
              _user,
              _balanceAccount,
              _transaction,
              _category,
              price,
              date,
              description,
              isSpending
            );

            return res.status(200).json(editedTransaction);
          } else {
          }
          break;
        case "DELETE":
          if (_transaction && _user) {
            const deletedTransacion =
              await transactionService.deleteTransaction(_user, _transaction);

            return res.status(200).json(deletedTransacion);
          } else {
            throw ApiError.BadRequest("Need more parameters");
          }
          break;
      }
    } catch (e) {
      next(e);
    }
  };
}

module.exports = new CashController();
