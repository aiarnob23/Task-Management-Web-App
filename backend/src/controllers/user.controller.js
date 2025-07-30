import catchAsync from "../utils/catchAsync.js";
import sendResponse from "../utils/sendResponse.js";
import { comparePassword, hashedPassword } from "../utils/passBcrypt.js";
import { userService } from "../services/user.service.js";
import { isValidEmail } from "../utils/email.validator.js";
import { createToken } from "../utils/createToken.js";
import AppError from "../error/appError.js";

// create new user
const createNewUserToDB = catchAsync(async (req, res , next) => {
  const payload = req?.body?.data;
  if (!isValidEmail(payload?.email)) {
     return next(new AppError("Email validation failed", 400));
  }
  const hashed = await hashedPassword(payload.password);
  payload.password = hashed;
  const result = await userService.createNewUser(payload);
  if (result) {
    const token = createToken({userId:result._id});
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "User created successfully",
      data: { result, token },
    });
  }
});

//user login verification
const userLoginVerification = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Email and password are required", 400));
  }

  const userData = await userService.getUserPass(email);

  if (!userData) {
    return next(new AppError("Invalid credentials", 401));
  }

  const isPasswordMatched = await comparePassword(password, userData.password);

  if (!isPasswordMatched) {
    return next(new AppError("Invalid credentials", 401));
  }

  const token = createToken({userId:userData?._id});
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "User logged in successfully!",
    data: {
      user: {
        id: userData._id,
        email: userData.email,
        name: userData.name,
      },
      token: token,
    },
  });
});

//update user details
const updateUserDetails = catchAsync(async (req, res) => {
  const _id = req?.params?.id;
  const payload = req.body;
  if (_id && payload) {
    const result = await userService.updateUserDetails(_id, payload);
    if (result) {
      return sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "User details updated successfully",
        data: result,
      });
    } else {
      return next(new AppError("Request failed , Data not found", 404));
    }
  }
});

export const userController = {
  createNewUserToDB,
  userLoginVerification,
  updateUserDetails,
};
