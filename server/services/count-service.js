const CountModel = require("./../models/count-model");
const ApiErrors = require("./../exceptions/api-error");

class CountService {
  createCount = async (
    userId,
    currencyId,
    name,
    balance,
    isConsiderInGeneralBalance
  ) => {
    const newCount = await CountModel.create({
      user_id: userId,
      name,
      currency_id: currencyId,
      balance,
      isConsiderInGeneralBalance,
    });

    return newCount;
  };

  updateCount = async (
    countId,
    currencyId,
    name,
    balance,
    isConsiderInGeneralBalance
  ) => {
    const findedCount = await CountModel.findOne({ id: countId });
    if (findedCount) {
      throw ApiErrors.BadRequest("Count not founded");
    }
  };
}

module.exports = CountService;
