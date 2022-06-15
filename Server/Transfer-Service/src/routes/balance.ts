import express, { Request, Response, NextFunction } from "express";
const router = express.Router();
import balanceController from "../controller/balance";
import { cashDeposit } from "../controller/balance";

const { getAnAccount, getBalanceForUser, getAccountsAndBalances } =
  balanceController;

router.route("/:pageno").get(getAccountsAndBalances);
router.route("/acc").get(cashDeposit);
router.route("/acc/:accountNumber").get(getAnAccount);
router.route("/user/:userId").get(getBalanceForUser);

export default router;
