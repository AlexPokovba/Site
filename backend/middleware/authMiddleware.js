import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import {User} from "../models/userModel.js";


export const protect = asyncHandler(
 async (req, res, next) => {
  let token;
  token = req.cookies.jwt;
  if (token && process.env.JWT_SECRET) {
   try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = (await User.findById(decode.userId).select(
     "-password"
    ));
    next();
   } catch (error) {
    res.status(401);
    throw new Error("Not authorized, token failed");
   }
  } else {
   res.status(401);
   throw new Error("Not authorized, no token");
  }
 }
);

export const admin = (req, res, next) => {
 if (req.user?.isAdmin) {
  next();
 } else {
  res.status(401);
  throw new Error("Not authorized as admin");
 }
};
