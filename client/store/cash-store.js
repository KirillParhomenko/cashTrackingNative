import { create } from "zustand";
import { AxiosError } from "axios";
import axios from "axios";
import {
  getBalanceAccounts,
  getNotSpendingTransactions,
  getSpendingTransactions,
  getCurrencies,
  getCategories,
  getTransfers,
  createTransaction,
  createBalanceAccount,
  updateBalanceAccount,
  deleteBalanceAccount,
  deleteBalanceAccountRecipient,
  deleteTransaction,
} from "../services/cash-service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";

export const useCashStore = create((set, get) => ({
  cashInformation: {
    balanceAccounts: [],
    transactions: [],
    transfers: [],
    categories: [],
    currencies: [],
    colors: [],
  },

  totalBalanceAccount: {},

  pickedBalanceAccount: {},

  formatedCashInformation: {},

  categorySortedCashInformation: {},

  isSpending: true,

  isLoading: false,

  error: {
    status: null,
    message: null,
  },

  setTotalBalanceAccount: () => {
    const balanceAccounts = get().cashInformation.balanceAccounts;
    const russianCurrience = get().cashInformation.currencies.find(
      (currency) => currency.abbreviation === "RUB"
    );
    const totalBalanceAccount = {
      name: "Итого",
      balance: balanceAccounts
        .filter((balanceAccount) => balanceAccount.isConsiderInGeneralBalance)
        .reduce((total, balanceAccount) => {
          return total + balanceAccount.balance;
        }, 0),
    };
    set(() => ({ totalBalanceAccount }));
  },

  setBalanceAccount: (balanceAccount) => {
    set(() => ({
      pickedBalanceAccount: balanceAccount === undefined ? {} : balanceAccount,
    }));
  },

  setIsSpending: (isSpending) => {
    set(() => ({
      isSpending,
    }));
  },

  updateCategorySortedCashInformation: () => {
    const cashInformation = get().cashInformation;
    const pickedBalanceAccount = get().pickedBalanceAccount;
    const filterByBalanceAccount =
      Object.keys(pickedBalanceAccount).length !== 0;

    //categorySortedCashInformation
    const categorySortedCashInformation = {
      spending: {
        data: cashInformation.categories.categories
          .map((category, index) => {
            const finalObj = { category };
            const transactions = cashInformation.transactions
              .filter(
                (transaction) =>
                  transaction?._category?._id === category?._id &&
                  transaction?.isSpending &&
                  (filterByBalanceAccount
                    ? transaction?._balanceAccount?._id ===
                      pickedBalanceAccount?._id
                    : true)
              )
              

            finalObj.transactions = [...transactions];
            finalObj.totalAmount = finalObj.transactions.reduce(
              (total, transaction) => {
                return (total = total + transaction.price);
              },
              0
            );
            finalObj.color = "#" + cashInformation.colors[index];
            return finalObj;
          })
          .filter((category) => category?.totalAmount !== 0),
      },
      income: {
        data: cashInformation.categories.categories
          .map((category, index) => {
            const finalObj = { category };
            const transactions = cashInformation.transactions
              .filter(
                (transaction) =>
                  transaction?._category?._id === category?._id &&
                  !transaction.isSpending &&
                  (filterByBalanceAccount
                    ? transaction?._balanceAccount?._id ===
                      pickedBalanceAccount?._id
                    : true)
              )
 

            finalObj.transactions = [...transactions];
            finalObj.totalAmount = finalObj.transactions.reduce(
              (total, transaction) => {
                return (total = total + transaction.price);
              },
              0
            );
            finalObj.color = "#" + cashInformation.colors[index];
            return finalObj;
          })
          .filter((category) => category.totalAmount !== 0),
      },
    };

    categorySortedCashInformation.spending.totalAmount =
      categorySortedCashInformation.spending.data.reduce((total, element) => {
        return total + element.totalAmount;
      }, 0);

    categorySortedCashInformation.income.totalAmount =
      categorySortedCashInformation.income.data.reduce((total, element) => {
        return total + element.totalAmount;
      }, 0);

    set((state) => ({
      categorySortedCashInformation,
    }));
  },
  createTransaction: async (
    _user,
    _balanceAccount,
    _category,
    price,
    date,
    description
  ) => {
    try {
      const isSpending = get().isSpending;
      const data = await createTransaction(
        _user,
        _balanceAccount,
        _category,
        price,
        date,
        description,
        isSpending
      );
      const update = get().updateCategorySortedCashInformation;
      const cashInformation = get().cashInformation;
      let transactions = get().cashInformation.transactions;
      let balanceAccounts = get().cashInformation.balanceAccounts;
      set((state) => ({
        cashInformation: {
          ...cashInformation,
          transactions: [...transactions, data.data],
          balanceAccounts: [
            ...balanceAccounts.map((balanceAccount) => {
              if (balanceAccount._id === data.data._balanceAccount._id) {
                return data.data._balanceAccount;
              }
              return balanceAccount;
            }),
          ],
        },
      }));
      const setBalanceAccount = get().setBalanceAccount;
      setBalanceAccount(data.data._balanceAccount);
      transactions = get().cashInformation.transactions;
      balanceAccounts = get().cashInformation.balanceAccounts;
      await AsyncStorage.setItem(
        "@balanceAccounts",
        JSON.stringify({ balanceAccounts })
      );
      await AsyncStorage.setItem(
        "@transactions",
        JSON.stringify({ transactions })
      );
      const totalBalanceAccount = get().setTotalBalanceAccount;
      totalBalanceAccount();
      update();
    } catch (error) {
      console.log(error);
    }
  },

  deleteTransaction: async (_transaction, _user) => {
    try {
      const isDeleted = await deleteTransaction(_transaction, _user);
      let transactions = get().cashInformation.transactions;
      let balanceAccounts = get().cashInformation.balanceAccounts;
      const deletedTransaction = transactions.find(
        (transaction) => transaction._id === _transaction
      );
      balanceAccounts = balanceAccounts.map((balanceAccount) => {
        if (balanceAccount._id === deletedTransaction._balanceAccount._id) {
          return {
            ...balanceAccount,
            balance: deletedTransaction.isSpending
              ? balanceAccount.balance + deletedTransaction.price
              : balanceAccount.balance - deletedTransaction.price,
          };
        }
        return balanceAccount;
      });

      transactions = transactions.filter(
        (transaction) => transaction._id !== _transaction
      );
      const cashInformation = get().cashInformation;
      set((state) => ({
        cashInformation: {
          ...cashInformation,
          transactions,
          balanceAccounts,
        },
      }));
      await AsyncStorage.setItem(
        "@transactions",
        JSON.stringify({ transactions })
      );
      await AsyncStorage.setItem(
        "@balanceAccounts",
        JSON.stringify({ balanceAccounts })
      );
      const update = get().updateCategorySortedCashInformation;
      const totalBalanceAccount = get().setTotalBalanceAccount;
      totalBalanceAccount();
      update();
    } catch (error) {
      console.log(error);
    }
  },

  createBalanceAccount: async (_user, _currency, name, balance) => {
    const data = await createBalanceAccount(
      _user,
      _currency,
      name,
      balance,
      true
    );
    const cashInformation = get().cashInformation;
    const balanceAccounts = get().cashInformation.balanceAccounts;
    set((state) => ({
      cashInformation: {
        ...cashInformation,
        balanceAccounts: [...balanceAccounts, data.data],
      },
    }));
    await AsyncStorage.setItem(
      "@balanceAccounts",
      JSON.stringify({ balanceAccounts: [...balanceAccounts, data.data] })
    );
    const setBalanceAccount = get().setBalanceAccount;
    setBalanceAccount(data.data);
    const update = get().updateCategorySortedCashInformation;
    const totalBalanceAccount = get().setTotalBalanceAccount;
    totalBalanceAccount();
    update();
  },

  updateBalanceAccount: async (
    _user,
    _balanceAccount,
    _currency,
    name,
    balance
  ) => {
    const data = await updateBalanceAccount(
      _user,
      _balanceAccount,
      _currency,
      name,
      balance
    );
    const cashInformation = get().cashInformation;
    let balanceAccounts = get().cashInformation.balanceAccounts;
    set((state) => ({
      cashInformation: {
        ...cashInformation,
        balanceAccounts: [
          ...balanceAccounts.map((balanceAccount) => {
            if (balanceAccount._id === data.data._id) {
              return data.data;
            }
            return balanceAccount;
          }),
        ],
      },
    }));
    balanceAccounts = get().cashInformation.balanceAccounts;
    await AsyncStorage.setItem(
      "@balanceAccounts",
      JSON.stringify({ balanceAccounts: [...balanceAccounts] })
    );
    const setBalanceAccount = get().setBalanceAccount;
    setBalanceAccount(data.data);
    const update = get().updateCategorySortedCashInformation;
    const totalBalanceAccount = get().setTotalBalanceAccount;
    totalBalanceAccount();
    update();
  },

  deleteBalanceAccountRecipient: async (
    _user,
    _balanceAccount,
    _recipientBalanceAccount
  ) => {
    const deletedInfo = await deleteBalanceAccountRecipient(
      _user,
      _balanceAccount,
      _recipientBalanceAccount
    );
    const cashInformation = get().cashInformation;
    let transactions = get().cashInformation.transactions;
    let balanceAccounts = get().cashInformation.balanceAccounts;
    balanceAccounts = balanceAccounts.filter((balanceAccount) => {
      if (balanceAccount._id !== _balanceAccount) {
        return balanceAccount;
      }
    });
    const recipientBalanceAccountIndex = balanceAccounts.findIndex(
      (balanceAccount) => balanceAccount._id === _recipientBalanceAccount
    );

    transactions.forEach((transaction) => {
      if (transaction._balanceAccount._id === _balanceAccount) {
        balanceAccounts[recipientBalanceAccountIndex].balance =
          balanceAccounts[recipientBalanceAccountIndex].balance -
          transaction.price;
      }
    });

    transactions = transactions.map((transaction) => {
      if (transaction._balanceAccount._id === _balanceAccount) {
        return {
          ...transaction,
          _balanceAccount: balanceAccounts[recipientBalanceAccountIndex],
        };
      }
      return transaction;
    });

    set((state) => ({
      cashInformation: {
        ...cashInformation,
        balanceAccounts,
        transactions,
      },
    }));
    balanceAccounts = get().cashInformation.balanceAccounts;
    await AsyncStorage.setItem(
      "@balanceAccounts",
      JSON.stringify({ balanceAccounts: [...balanceAccounts] })
    );
    const update = get().updateCategorySortedCashInformation;
    const totalBalanceAccount = get().setTotalBalanceAccount;
    const setDefaultBalanceAccount = get().setBalanceAccount;
    setDefaultBalanceAccount();
    totalBalanceAccount();
    update();
  },

  deleteBalanceAccount: async (_user, _balanceAccount) => {
    const deletedId = await deleteBalanceAccount(_user, _balanceAccount);
    const cashInformation = get().cashInformation;
    let transactions = get().cashInformation.transactions;
    transactions = transactions.filter(
      (transaction) => transaction._balanceAccount._id !== deletedId
    );
    let balanceAccounts = get().cashInformation.balanceAccounts;
    set((state) => ({
      cashInformation: {
        ...cashInformation,
        balanceAccounts: [
          ...balanceAccounts.filter((balanceAccount) => {
            if (balanceAccount._id !== deletedId) {
              return balanceAccount;
            }
          }),
        ],
        transactions,
      },
    }));
    balanceAccounts = get().cashInformation.balanceAccounts;
    await AsyncStorage.setItem(
      "@balanceAccounts",
      JSON.stringify({ balanceAccounts: [...balanceAccounts] })
    );
    const update = get().updateCategorySortedCashInformation;
    const totalBalanceAccount = get().setTotalBalanceAccount;
    const setDefaultBalanceAccount = get().setBalanceAccount;
    setDefaultBalanceAccount();
    totalBalanceAccount();
    update();
  },
  updateStoreInformation: async () => {
    try {
      const balanceAccounts = JSON.parse(
        await AsyncStorage.getItem("@balanceAccounts")
      ).balanceAccounts;
      const transactions = JSON.parse(
        await AsyncStorage.getItem("@transactions")
      ).transactions;
      const transfers = JSON.parse(
        await AsyncStorage.getItem("@transfers")
      ).transfers;
      const categories = JSON.parse(
        await AsyncStorage.getItem("@categories")
      ).categories;
      const currencies = JSON.parse(
        await AsyncStorage.getItem("@currencies")
      ).currencies;
      const colors = JSON.parse(await AsyncStorage.getItem("@colors"))?.colors;
      set((state) => ({
        cashInformation: {
          balanceAccounts,
          transactions,
          transfers,
          categories,
          currencies,
          colors,
        },
      }));
      const setTotalBalanceAccount = get().setTotalBalanceAccount;
      setTotalBalanceAccount();
      const updateData = get().updateCategorySortedCashInformation;
      updateData();
    } catch (error) {
      console.log(error);
    }
  },

  deleteLocalInformation: async () => {
    try {
      await AsyncStorage.removeItem("@balanceAccounts");
      await AsyncStorage.removeItem("@transactions");
      await AsyncStorage.removeItem("@currencies");
      await AsyncStorage.removeItem("@categories");
      await AsyncStorage.removeItem("@transfers");

      set((state) => ({
        cashInformation: {
          balanceAccounts: [],
          transactions: [],
          transfers: [],
          categories: [],
          currencies: [],
        },
        formatedCashInformation: {},
        categorySortedCashInformation: [],
      }));
    } catch (error) {
      console.log(error);
    }
  },

  updateLocalInformation: async (_user) => {
    if (_user) {
      set(() => ({ isLoading: true }));
      const balanceAccounts = await getBalanceAccounts(_user);
      let colors = await axios.get(
        "https://www.colr.org/json/colors/random/100"
      );
      colors = colors.data.matching_colors.filter((color) => {
        if (color) {
          return color;
        }
      });
      await AsyncStorage.setItem("@colors", JSON.stringify({ colors }));
      await AsyncStorage.setItem(
        "@balanceAccounts",
        JSON.stringify({ balanceAccounts })
      );
      const spendingTransactions = await getSpendingTransactions(_user);
      const notSpendingTransactions = await getNotSpendingTransactions(_user);
      await AsyncStorage.setItem(
        "@transactions",
        JSON.stringify({
          transactions: [...spendingTransactions, ...notSpendingTransactions],
        })
      );

      const currencies = await getCurrencies();
      await AsyncStorage.setItem("@currencies", JSON.stringify({ currencies }));
      const categories = await getCategories(_user);
      await AsyncStorage.setItem("@categories", JSON.stringify({ categories }));
      const transfers = await getTransfers(_user);
      await AsyncStorage.setItem("@transfers", JSON.stringify({ transfers }));
      const updateStoreInformation = get().updateStoreInformation;
      await updateStoreInformation();
      set(() => ({ isLoading: false }));
    }
  },
}));
