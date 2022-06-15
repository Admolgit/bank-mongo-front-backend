import express, { Request, Response, NextFunction } from "express";
// import BadRequest from '../errors'
import User from "../model/user";
import { validateUser, validateUserLogin } from "../model/user";
const router = express.Router();
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";
import { user } from "../utils/interface";
import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";
import Balance from "../model/balance";
import bcrypt from "bcrypt";
import { STATUS_CODES } from "http";

async function generateAccountNumber() {
  let randomNum = Math.floor(Math.random() * 1000000000);
  let tempNum = await Balance.find();
  let dataMatch = tempNum.find((a: any) => a.accountNumber == randomNum);
  while (randomNum === dataMatch) {
    randomNum = Math.floor(Math.random() * 1000000000);
    break;
  }
  return randomNum;
}

// REGISTER
const register = async (req: Request, res: Response) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const { firstName, lastName, DOB, email, phoneNumber, password } = req.body;
  //   const salt = await bcrypt.genSalt(10);
  //   const passwords = await bcrypt.hash(password, salt)
  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(password, salt);

  //Write the data with hashed password to database
  const securedData = { ...User, password: hashedPass };

  //const user = await User.create(securedData);

  try {
    const newUser = new User({
      firstName,
      lastName,
      DOB,
      email,
      password: hashedPass,
      phoneNumber,
    });

    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400);
      throw new Error("User already exist");
    }

    const savedUser = await newUser.save();
    const userId = await User.findOne({ email }).select("_id");
    let accountNumber = await generateAccountNumber();
    const accountDetails = await Balance.create({
      accountNumber,
      userId: userId["_id"],
    });
    res.status(StatusCodes.CREATED).json({ data: savedUser, accountDetails });
  } catch (err: any) {
    console.log(err);
    return res.status(400).json(err.message);
  }
};

// LOGIN

// const login = async (req: Request, res: Response) => {
//   const { error } = validateUserLogin(req.body);
//   if (error) return res.status(400).send(error.details[0].message);
//   try {
//     const user = await User.findOne({ email: req.body.email });
//     !user && res.status(StatusCodes.UNAUTHORIZED).json("Wrong Credentials!");

//     // const ActualPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
//     user.password !== req.body.password &&
//       res.status(StatusCodes.UNAUTHORIZED).json("Wrong Credentials!");

//     generateToken(user, StatusCodes.OK, res);
//   } catch (err) {
//     return res.status(400).json("Invalid email or password");
//   }
// };

const login = async (req: Request, res: Response) => {
  const data = req.body;
  //LoginSchema.parse(data);
  try {
  const { email, password } = data;

  const user = await User.findOne({ email });
  const hashedPassword = await bcrypt.compare(password, user.password)
    console.log(user)
  if (user && hashedPassword) {
    //const { id, fullName: name, email, role } = user;
    // return res.status(200).json({
    //   user,
    //   token: generateToken(user, StatusCodes.OK, res),
    // });
    return  generateToken(user, StatusCodes.OK, res)

    
  } else {
    return res.status(400).json("Invalid credentials");
    // throw new Error("Invalid credentials");
    
    
  }
} catch (err: any) {
   return res.status(500).json(err.message);  
}
};

const generateToken = (user: any, statusCode: any, res: any) => {
  const accessToken = jwt.sign(
    {
      id: user._id,
      email: user.email,
      firstName: user.firstName,
      phoneNumber: user.phoneNumber,
    },
    process.env.JWT_SEC as string,
    {
      expiresIn: "1d",
    }
  );

  const options = {
    httpOnly: true,
    expires: new Date(Date.now() + `${process.env.EXPIRE_TOKEN}`),
  };
  res
    .status(statusCode)
    .cookie("accessToken", accessToken, options)
    .json({ success: true, accessToken });
};

// LOG OUT USERS log out is get

const logout = (req: Request, res: Response, next: NextFunction) => {
  res.clearCookie("accessToken");
  res.status(200).json({
    success: true,
    message: "logged out",
  });
};

export default { register, login, logout };
