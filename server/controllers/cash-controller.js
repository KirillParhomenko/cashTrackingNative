class CashController {
  operationCount = async (req, res, next) => {
    try {
      const {
        userId,
        currencyId,
        name,
        balance,
        isConsiderInGeneralBalance,
        type,
      } = req.body;
    } catch (error) {}
  };
}

module.exports = new CashController();
