const CurrencyModel = require("../models/currency-model");
const ApiError = require("./../exceptions/api-error");

class CurrencyService {
  getAllCurrency = async () => {
    return await CurrencyModel.find();
  };

  getCurrencyById = async (_currency) => {
    return await CurrencyModel.findById(_currency);
  };

  setCurrencyData = async (currencyItems) => {
    if (!currencyItems) {
      throw ApiError.BadRequest("No currency data to put in database");
    }

    currencyItems.forEach(async (currency) => {
      const isExistCurrency = await CurrencyModel.findOne({
        abbreviation: currency.abbreviation,
      });
      if (isExistCurrency) {
        isExistCurrency.convert = currency.convert;
        await isExistCurrency.save();
      } else {
        await CurrencyModel.create({
          name: currency.name,
          abbreviation: currency.abbreviation,
          symbol: currency.symbol,
          convert: currency.convert,
        });
      }
    });
  };
}

module.exports = new CurrencyService();
