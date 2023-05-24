import { apiInstance } from "../http";

export const registrationSetting = async (_user) => {
  try {
    const registrationSettings = await apiInstance.post(
      "/registrationSetting",
      { _user }
    );
    return registrationSettings;
  } catch (error) {
    return error;
  }
};

export const getBalanceAccounts = async (_user) => {
  try {
    const balanceAccountsResponse = await apiInstance.get(
      `/balanceAccount/${_user}`
    );
    return balanceAccountsResponse.data;
  } catch (error) {
    return error;
  }
};

export const getSpendingTransactions = async (_user) => {
  try {
    const transactionsSpendingResponse = await apiInstance.get(
      `/balanceAccount/transaction/${_user}/${true}`
    );

    return [...transactionsSpendingResponse.data];
  } catch (error) {
    return error;
  }
};

export const getNotSpendingTransactions = async (_user) => {
  try {
    const transactionsNotSpendingResponse = await apiInstance.get(
      `/balanceAccount/transaction/${_user}/${false}`
    );

    return [...transactionsNotSpendingResponse.data];
  } catch (error) {
    return error;
  }
};

export const getCurrencies = async () => {
  try {
    const currencies = await apiInstance.get("/currency");
    return currencies.data;
  } catch (error) {
    return error;
  }
};

export const getCategories = async (_user) => {
  try {
    const categories = await apiInstance.get(
      `/balanceAccount/category/${_user}`
    );
    return categories.data;
  } catch (error) {
    return error;
  }
};

export const getTransfers = async (_user) => {
  try {
    const transfers = await apiInstance.get(
      `/balanceAccount/transfer/${_user}`
    );
    return transfers.data;
  } catch (error) {
    return error;
  }
};

export const createBalanceAccount = async (
  _user,
  _currency,
  name,
  balance,
  isConsiderInGeneralBalance
) => {
  try {
    const createdBalanceAccount = await apiInstance.post(`/balanceAccount`, {
      _user,
      _currency,
      name,
      balance,
      isConsiderInGeneralBalance,
    });
    return createdBalanceAccount;
  } catch (error) {
    return error;
  }
};

export const updateBalanceAccount = async (
  _user,
  _balanceAccount,
  _currency,
  name,
  balance,
  isConsiderInGeneralBalance
) => {
  try {
    const updatedBalanceAccount = await apiInstance.put(`/balanceAccount`, {
      _user,
      _balanceAccount,
      _currency,
      name,
      balance,
      isConsiderInGeneralBalance,
    });
    return updatedBalanceAccount;
  } catch (error) {
    return error;
  }
};

export const deleteBalanceAccount = async (_user, _balanceAccount) => {
  try {
    const isDeleted = await apiInstance.delete(
      `/balanceAccount/${_user}/${_balanceAccount}`
    );
    return _balanceAccount;
  } catch (error) {
    return error;
  }
};

export const deleteBalanceAccountRecipient = async (
  _user,
  _balanceAccount,
  _recipientBalanceAccount
) => {
  try {
    const isDeleted = await apiInstance.delete(
      `/balanceAccount/${_user}/${_balanceAccount}/${_recipientBalanceAccount}`
    );
    return isDeleted.data;
  } catch (error) {
    return error;
  }
};

export const createTransaction = async (
  _user,
  _balanceAccount,
  _category,
  price,
  date,
  description,
  isSpending
) => {
  try {
    const createdTransaction = await apiInstance.post(
      "/balanceAccount/transaction",
      {
        _user,
        _balanceAccount,
        _category,
        price,
        date,
        description,
        isSpending,
      }
    );

    return createdTransaction;
  } catch (error) {
    return error;
  }
};

export const deleteTransaction = async (_transaction, _user) => {
  try {
    console.log(`/transaction/${_transaction}/${_user}`);
    const isDeleted = await apiInstance.delete(
      `/transaction/${_transaction}/${_user}`
    );

    return isDeleted;
  } catch (error) {
    return error;
  }
};
