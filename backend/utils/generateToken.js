import jwt from "jsonwebtoken";


export const generateToken = (res, userId) => {
 if (process.env.JWT_SECRET) {
  const token = jwt.sign(
   {
    userId,
   },
   process.env.JWT_SECRET,
   {
    expiresIn: "3d",
   }
  );
  res.cookie("jwt", token);
 }
};