const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const axios = require("axios");
const dotenv = require("dotenv");
const authRouter = require("./routers/auth-router");
const cashRouter = require("./routers/cash-router");
const errorsMiddleware = require("./middlewares/error-middleware");
const ApiError = require("./exceptions/api-error");
const schedule = require("node-schedule");
const currencyService = require("./services/currency-service");

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "*" }));
app.use("/api", authRouter);
app.use("/api", cashRouter);
app.use(errorsMiddleware);

const start = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });

    schedule.scheduleJob("0 * */4 * *", async () => {
      const currencyConvertResponse = await axios.get(
        `https://api.freecurrencyapi.com/v1/latest?apikey=${process.env.CURRENCY_API_KEY}&currencies=`
      );

      const currencyInfoResponse = await axios.get(
        `https://api.freecurrencyapi.com/v1/currencies?apikey=${process.env.CURRENCY_API_KEY}&currencies=`
      );

      if (!(currencyConvertResponse && currencyInfoResponse)) {
        throw ApiError.BadRequest("Can not get currency data from api!");
      }

      const currencyConvertData = currencyConvertResponse.data.data;
      const currencyInfoData = currencyInfoResponse.data.data;
      const finallCurrencyData = [];

      for (let abbreviation in currencyInfoData) {
        finallCurrencyData.push({
          abbreviation,
          name: currencyInfoData[abbreviation].name,
          symbol: currencyInfoData[abbreviation].symbol,
          convert: currencyConvertData[abbreviation],
        });
      }

      await currencyService.setCurrencyData(finallCurrencyData);
    });
  } catch (e) {
    next(e);
  }
};

start();
