const express = require("express");
const authMiddlerware = require("./../middlewares/auth-middleware");
const router = express.Router();
const cashController = require("./../controllers/cash-controller");

router.post(
  "/balanceAccount",
  authMiddlerware,
  cashController.balanceAccountOperation
);
router.put(
  "/balanceAccount",
  authMiddlerware,
  cashController.balanceAccountOperation
);
router.delete(
  "/balanceAccount/:_user/:_balanceAccount",
  authMiddlerware,
  cashController.balanceAccountOperation
);
router.delete(
  "/balanceAccount/:_user/:_balanceAccount/:_recipientBalanceAccount",
  authMiddlerware,
  cashController.balanceAccountOperation
);
router.get(
  "/balanceAccount/:_user",
  authMiddlerware,
  cashController.balanceAccountOperation
);

router.get("/currency", authMiddlerware, cashController.getCurrency);

router.post(
  "/balanceAccount/transfer",
  authMiddlerware,
  cashController.balanceAccountTransfer
);

router.get(
  "/balanceAccount/transfer/:_user",
  authMiddlerware,
  cashController.balanceAccountTransfer
);

router.delete(
  "/balanceAccount/transfer",
  authMiddlerware,
  cashController.balanceAccountTransfer
);

router.post(
  "/balanceAccount/category",
  authMiddlerware,
  cashController.categoryOperation
);

router.get(
  "/balanceAccount/category/:_user",
  authMiddlerware,
  cashController.categoryOperation
);

router.put(
  "/balanceAccount/category",
  authMiddlerware,
  cashController.categoryOperation
);

router.delete(
  "/balanceAccount/category",
  authMiddlerware,
  cashController.categoryOperation
);

router.post(
  "/balanceAccount/transaction",
  authMiddlerware,
  cashController.transactionOperation
);

router.put(
  "/balanceAccount/transaction",
  authMiddlerware,
  cashController.transactionOperation
);

router.get(
  "/balanceAccount/transaction/:_user/:isSpending",
  authMiddlerware,
  cashController.transactionOperation
);

router.delete(
  "/transaction/:_transaction/:_user",
  authMiddlerware,
  cashController.transactionOperation
);

router.post(
  "/registrationSetting",
  authMiddlerware,
  cashController.registrationSetting
);

// router.get(
//   "/allInformation",
//   authMiddlerware,
//   cashController.getAllInformation
// );

// router.post(
//   "/allInformation",
//   authMiddlerware,
//   cashController.postAllInformation
// );

module.exports = router;
