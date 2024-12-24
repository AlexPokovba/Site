import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new Schema(
 {
  name: {
   type: String,
   required: true,
  },
  email: {
   type: String,
   required: true,
  },
  password: {
   type: String,
   required: true,
  },
  isAdmin: {
   type: Boolean,
   required: true,
   default: false,
  },
 },
 { timestamps: true }
);
userSchema.method(
 "matchPassword",
 async function matchPassword(password) {
  return await bcrypt.compare(password, this.password);
 }
);
userSchema.pre("save", async function (next) {
 if (!this.isModified("password")) {
  next();
 }
 const salt = await bcrypt.genSalt(10);
 this.password = await bcrypt.hash(this.password, salt);
});
export const User = model("User", userSchema);
