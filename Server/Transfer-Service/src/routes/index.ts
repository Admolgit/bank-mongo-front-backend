import express, { Request, Response, NextFunction } from "express";
const router = express.Router();
import transactionController from "../controller/transaction";
import Users from "../controller/balance";

const { performTransfer, getAUserTransactions } = transactionController;
router.route("/").post(performTransfer);
router.route("/acc/:accountNumber").get(getAUserTransactions);
router.route("/:pageno").get(Users.getAllUsers);
export default router;
