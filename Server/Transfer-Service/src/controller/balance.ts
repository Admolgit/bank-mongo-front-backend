import { Request, Response, NextFunction } from "express";
import Balance from "../model/balance";
import User from "../model/user";
import _ from "lodash";
require("dotenv").config();

const getAccountsAndBalances = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let page = Number(req.params.pageno);
    let size = Number(5);
    if (!page) page = 1;
    if (!size) size = 5;
    const limit = size;
    const skip = (page - 1) * size;
    const AllAccounts = await Balance.find({})
      .sort("-balance")
      .limit(limit)
      .skip(skip);
    res.status(200).json({ status: "success", result: AllAccounts });
  } catch (err) {
    return res.status(500).json({ msg: err || "Error occurred" });
  }
};

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let page = Number(req.params.pageno);
    let size = Number(5);
    if (!page) page = 1;
    if (!size) size = 5;
    const limit = size;
    const skip = (page - 1) * size;
    const AllUsers = await User.find({})
      .sort("-balance")
      .limit(limit)
      .skip(skip);
    res.status(200).json({ status: "success", result: AllUsers });
  } catch (err) {
    return res.status(500).json({ msg: err || "Error occurred" });
  }
};

const getAnAccount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userAccount = await Balance.find({
      accountNumber: req.params.accountNumber,
    });
    if (!userAccount)
      return res.status(400).send({
        status: "failed",
        message: "Invalid Account Number. Enter a correct one",
      });
    // const filteredResult = _.pick(userAccount, ['userId', 'accountNumber', 'balance'])
    res.status(200).json({
      status: "success",
      type: "particular account number",
      userAccount,
    });
    //  res.status(200).json(userAccount)
  } catch (err) {
    return res.status(500).json(err);
  }
};
const getBalanceForUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userBalance = await Balance.find({ userId: req.params.userId });
    if (!userBalance)
      return res.status(400).send({
        status: "failed",
        message: "Invalid user ID. Enter a correct ID",
      });
    console.log(userBalance, 'working');
    // const filteredResult =  _.pick(userBalance, ['userId', 'accountNumber', 'balance', '_id'])
    // res.status(200).json({ status: 'success', type:'particular user', res:req.params.userId  })
    res.send(userBalance);
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const cashDeposit = async (req: Request, res: Response, next: NextFunction) => {

  const { userId, accountNumber, amount } = req.body;

  try {
    // console.log(accountNumber, amount, "working");
    const user = await Balance.findOne({ userId: userId });
    // const bal = userBal.balance<any, any, {}, any> + amount;
    let newbalance = Number(user.balance) + Number(amount);
    const userBalance = await Balance.findOneAndUpdate( {userId: userId}, { accountNumber: accountNumber}, {balance: newbalance});
    console.log(user)
    console.log(newbalance)
    console.log(userBalance)

      return res.status(200).send({
        userBalance,
      });

  } catch (err) {
    return res.status(500).json({err});
  }
}

export default {
  getAnAccount,
  getBalanceForUser,
  getAccountsAndBalances,
  getAllUsers,
  cashDeposit,
};
