import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import { User } from "../models/userSchema.js";
import ErrorHandler from "../middlewares/error.js";
import { sendToken } from "../utils/jwtToken.js";


export const register = catchAsyncErrors(async (req, res, next) => {
  const { name, email, phone, password, role } = req.body;
  if (!name || !email || !phone || !password || !role) {
    return next(new ErrorHandler("Please fill full form!"));
  }
  const isEmail = await User.findOne({ email });
  if (isEmail) {
    return next(new ErrorHandler("Email already registered!"));
  }
  const user = await User.create({
    name,
    email,
    phone,
    password,
    role,
  });
  sendToken(user, 201, res, "Registered Successfully!");
});

export const login = catchAsyncErrors(async (req, res, next) => {
  const { email, password,role } = req.body;
  if (!email || !password || !role) {
    return next(new ErrorHandler("Please fill full form!",400));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid email or password!",400));
  }
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return next(new ErrorHandler("Invalid email or password!",400));
  }
  if(user.role !== role) {
    return next(new ErrorHandler("User with this role does not exist",400));
  }
  sendToken(user, 200, res, "Login Successfully!");
})


export const logout = catchAsyncErrors(async (req, res, next) => {
  res
  .status(201).cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  })
  .json({
    success: true,
    message: "Logged Out",
  });
})

export const getUser = catchAsyncErrors( (req, res, next) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    user,
  });
})