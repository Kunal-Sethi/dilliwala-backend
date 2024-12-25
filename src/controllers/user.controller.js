import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { generateAccessAndRefreshTokens } from "../utils/AccessAndRefreshToken.js";
import bcrypt from "bcrypt";

const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, password, contact } = req.body;

  if (
    [fullName, email, password].some((field) => field?.trim() === "") ||
    contact == null
  ) {
    throw new ApiError(400, "All fields are required.");
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(409, "User already exist.");
  }

  const user = await User.create({
    fullName,
    email,
    password,
    contact,
  });

  if (!user) {
    throw new ApiError(500, "Something went wrong, Please register again.");
  }

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  return res
    .status(200)
    .json(new ApiResponse(200, createdUser, "User created successfully."));
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if ([email, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "Email and password are required.");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(404, "User not found, Please register your account.");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Incorrect Password.");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        { user: loggedInUser, accessToken, refreshToken },
        "User login success."
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: { refreshToken: null },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logout success."));
});

const updateUserDetails = asyncHandler(async (req, res) => {
  const { fullName, contact, address } = req.body;
  if (!fullName) {
    throw new ApiError(404, "Full name is required.");
  }
  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        fullName,
        contact,
        address,
      },
    },
    {
      new: true,
    }
  ).select("-password -refreshToken");

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Account details updated."));
});

const updatePassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword, confirmPassword } = req.body;
  if (newPassword !== confirmPassword) {
    throw new ApiError(401, "Password and Confirm password should match.");
  }

  const user = await User.findById(req.user._id);

  const isPasswordValid = await user.isPasswordCorrect(oldPassword);

  if (!isPasswordValid) {
    throw new ApiError(401, "Password is not correct.");
  }

  //   const updatedUser = await User.findByIdAndUpdate(req.user._id, {
  //     password: await bcrypt.hash(newPassword, 10),
  //   }).select("-password -refreshToken");

  //   Did this because a utility function to hash the password is already written in User model.
  user.password = newPassword;
  await user.save();

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Password is updated successfully."));
});
export {
  registerUser,
  loginUser,
  logoutUser,
  updateUserDetails,
  updatePassword,
};
