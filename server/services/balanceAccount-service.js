const BalanceAccountModel = require("../models/balanceAccount-model");
const currencyService = require("./../services/currency-service");
const ApiErrors = require("../exceptions/api-error");
const UserModel = require("./../models/user-model");
const TransferModel = require("./../models/transfer-model");
const TransactionModel = require("./../models/transaction-model");

class BalanceAccountService {
  createBalanceAccount = async (
    _user,
    _currency,
    name,
    balance,
    isConsiderInGeneralBalance
  ) => {
    let createdBalanceAccount = await BalanceAccountModel.create({
      _user,
      _currency,
      name,
      balance,
      isConsiderInGeneralBalance,
    });
    createdBalanceAccount = await createdBalanceAccount.populate("_currency");
    return createdBalanceAccount;
  };

  updateBalanceAccount = async (
    _balanceAccount,
    _currency,
    name,
    balance,
    isConsiderInGeneralBalance
  ) => {
    let findedBalanceAccount = await BalanceAccountModel.findById(
      _balanceAccount
    );

    if (!findedBalanceAccount) {
      throw ApiErrors.BadRequest("BalanceAccount not founded");
    }

    if (_currency !== undefined || null || NaN) {
      const currency = await currencyService.getCurrencyById(_currency);
      findedBalanceAccount._currency = _currency;
    }
    if (name !== undefined || null || NaN) {
      findedBalanceAccount.name = name;
    }
    if (balance !== undefined || null || NaN) {
      findedBalanceAccount.balance = balance;
    }
    if (isConsiderInGeneralBalance !== undefined || null || NaN) {
      findedBalanceAccount.isConsiderInGeneralBalance =
        isConsiderInGeneralBalance;
    }

    await findedBalanceAccount.save();

    findedBalanceAccount = await findedBalanceAccount.populate("_currency");

    return findedBalanceAccount;
  };

  deleteBalanceAccount = async (_user, _balanceAccount) => {
    const isDeleted = await BalanceAccountModel.deleteOne({
      _id: _balanceAccount,
    });
    console.log(isDeleted);
    if (!isDeleted) {
      throw ApiErrors.BadRequest("Delete Error");
    }
    await TransactionModel.deleteMany({ _user, _balanceAccount });
    await TransferModel.deleteMany({ _user, _recipient: _balanceAccount });
    await TransferModel.deleteMany({ _user, _sender: _balanceAccount });

    return isDeleted;
  };

  deleteWithTransferBalanceAccount = async (
    _user,
    _balanceAccount,
    _recipientBalanceAccount
  ) => {
    const pastBalanceAccount = await BalanceAccountModel.findById(
      _balanceAccount
    );

    const isDeleted = await BalanceAccountModel.deleteOne({
      _id: _balanceAccount,
    });
    if (!isDeleted) {
      throw ApiErrors.BadRequest("Delete Error");
    }

    const currentBalanceAccount = await BalanceAccountModel.findById(
      _recipientBalanceAccount
    );

    const transactions = await TransactionModel.find({
      _user,
      _balanceAccount,
    });

    transactions.forEach((transaction) => {
      currentBalanceAccount.balance =
        currentBalanceAccount.balance - transaction.price;
    });

    transactions.forEach(async (transaction) => {
      transaction._balanceAccount = _recipientBalanceAccount;
      await transaction.save();
    });

    const transfersRecipient = await TransferModel.find({
      _user,
      _recipient: _balanceAccount,
    });

    transfersRecipient.forEach(async (transferRecipient) => {
      transferRecipient._recipient = _recipientBalanceAccount;
      await transferRecipient.save();
    });

    const transfersSender = await TransferModel.find({
      _user,
      _sender: _balanceAccount,
    });

    transfersSender.forEach(async (transferSender) => {
      transferSender._sender = _recipientBalanceAccount;
      await transferSender.save();
    });

    await currentBalanceAccount.save();

    return isDeleted;
  };

  getBalanceAccounts = async (_user) => {
    const balanceAccounts = await BalanceAccountModel.find({ _user });
    if (!balanceAccounts) {
      throw ApiErrors.BadRequest("No Balance Accounts");
    }
    const balance = Promise.all(
      balanceAccounts.map(async (item) => {
        return await item.populate("_currency");
      })
    );
    return balance;
  };

  createTransferBetweenBalanceAccounts = async (
    _user,
    _recipient,
    _sender,
    description,
    price
  ) => {
    const user = await UserModel.findOne({ _id: _user });
    if (!user) {
      throw ApiErrors.BadRequest("User not exist!");
    }
    const recipientAccount = await BalanceAccountModel.findOne({
      _id: _recipient,
    });
    if (!recipientAccount) {
      throw ApiErrors.BadRequest("Recipient account not exist!");
    }
    const senderAccount = await BalanceAccountModel.findOne({ _id: _sender });
    if (!senderAccount) {
      throw ApiErrors.BadRequest("Sender account not exist!");
    }

    if (
      !(
        recipientAccount._user.equals(user._id) &&
        senderAccount._user.equals(user._id)
      )
    ) {
      throw ApiErrors.BadRequest(
        "Access denied. U havent permissions to some balance Account"
      );
    }
    let transfer = await TransferModel.create({
      _user,
      _recipient,
      _sender,
      price,
      description,
      date: Date.now(),
    });
    if (!transfer) {
      throw ApiErrors.BadRequest("Transfer error!");
    }
    senderAccount.balance = senderAccount.balance - price;
    recipientAccount.balance = recipientAccount.balance + price;
    await senderAccount.save();
    await recipientAccount.save();

    transfer = await transfer.populate("_recipient _sender");

    return transfer;
  };

  getTransfersBetweenBalanceAccounts = async (_user) => {
    const transfers = await TransferModel.find({ _user });
    const finallTransfers = Promise.all(
      transfers.map(async (transfer) => {
        return await transfer.populate("_recipient _sender");
      })
    );
    return finallTransfers;
  };

  deleteTransfer = async (_id) => {
    const transfer = await TransferModel.findById(_id);
    if (!transfer) {
      throw ApiErrors.BadRequest("Transfer not exist!");
    }
    const sender = await BalanceAccountModel.findById(transfer._sender);
    const recipient = await BalanceAccountModel.findById(transfer._recipient);
    if (!(sender || recipient)) {
      throw ApiErrors.BadRequest("Sender or Recipient balance account error!");
    }
    sender.balance = sender.balance + transfer.price;
    recipient.balance = recipient.balance - transfer.price;
    await sender.save();
    await recipient.save();
    return await transfer.deleteOne();
  };
}

module.exports = new BalanceAccountService();
