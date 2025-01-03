import { generateToken } from "../utils/generateToken.js";
import {  User } from "../models/userModel.js";
import asyncHandler from "../middleware/asyncHandler.js";


export const authUser = asyncHandler(async (req, res) => {
 const { email, password } = req.body;
 const user = await User.findOne({ email });
 if (user && user.matchPassword(password) && process.env.JWT_SECRET) {
  generateToken(res, user._id);
  return res.status(200).json({
   _id: user._id,
   name: user.name,
   email: user.email,
   isAdmin: user.isAdmin,
  });
 } else {
  res.status(401);
  throw new Error("Invalid email or password");
 }
});

export const registerUser = asyncHandler(
 async (req, res) => {
  const { email, name, password } = req.body;
  const ifExist = await User.findOne({ email });

  if (!ifExist) {
   const user = await User.create({ email, name, password });
   if (user) {
    generateToken(res, user._id);
    return res.status(201).json({
     email: user.email,
     name: user.name,
     isAdmin: user.isAdmin,
     _id: user._id,
    });
   } else {
    res.status(400);
    throw new Error("Invalid user data");
   }
  } else {
   res.status(400);
   throw new Error("User already exist");
  }
 }
);

export const logoutUser = asyncHandler(async (req, res) => {
 res.cookie("jwt", "", {
  httpOnly: true,
  expires: new Date(0),
 });
 res.status(200).json({ message: "Logged out succesfully" });
});

export const getUserProfile = asyncHandler(
 async (req, res) => {
  const user = await User.findById(req.user?._id);
  if (user) {
   return res.status(200).json({
    email: user.email,
    name: user.name,
    isAdmin: user.isAdmin,
    _id: user._id,
   });
  } else {
   res.status(404);
   throw new Error("User not found");
  }
 }
);

export const updateUserProfile = asyncHandler(
 async (req, res) => {
  const user = await User.findById(req.user?._id);
  if (user) {
   user.name = req.body.name || user.name;
   user.email = req.body.email || user.email;
   if (req.body.password) {
    user.password = req.body.password || user.password;
   }
   const updatedUser = await user.save();
   return res.status(200).json({
    email: updatedUser.email,
    name: updatedUser.name,
    isAdmin: updatedUser.isAdmin,
    _id: updatedUser._id,
   });
  } else {
   res.status(404);
   throw new Error("User not found");
  }
 }
);

export const getAllUsers = asyncHandler(async (req, res) => {
 const page = Number(req.query.page) || 1;
 const pageSize = 3;
 const count = await User.countDocuments();

 const users = await User.find({})
  .limit(pageSize)
  .skip(pageSize * (page - 1));
 res.status(200).json({ users, page, pages: Math.ceil(count / pageSize) });
});

export const getUserById = asyncHandler(async (req, res) => {
 const user = await User.findById(req.params.id);
 if (user) {
  return res.status(200).json(user);
 } else {
  res.status(404);
  throw new Error("User not found");
 }
});

export const deleteUser = asyncHandler(async (req, res) => {
 const user = await User.findById(req.params.id);
 if (user) {
  if (user.isAdmin) {
   res.status(400);
   throw new Error("You can't delete admin user");
  }
  await User.deleteOne({ _id: user._id });
  return res.status(200).json({ message: "User removed" });
 } else {
  res.status(404);
  throw new Error("User not found");
 }
});

export const updateUser = asyncHandler(async (req, res) => {
 const user = await User.findById(req.params.id);
 if (user) {
  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;
  user.isAdmin = req.body.isAdmin || user.isAdmin;
  const updatedUser = await user.save();
  return res.status(200).json(updatedUser);
 } else {
  res.status(404);
  throw new Error("User not found");
 }
});
