const express = require("express");
const mongoose = require("mongoose");
const cookieparser = require("cookie-parser");
const cors = require("cors");
const authRouter = require("./routers/auth-router");

const PORT = 3000;

const app = express();

app.use(express.json());
app.use(cookieparser());
app.use(cors({ origin: "*" }));
app.use("/api", authRouter);

const start = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://root:root@cluster0.t4gqilo.mongodb.net/?retryWrites=true&w=majority",
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
};

start();
