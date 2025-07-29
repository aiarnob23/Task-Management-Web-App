import catchAsync from "../utils/catchAsync.js";
import sendResponse from "../utils/sendResponse.js";
import { comparePassword, hashedPassword } from "../utils/passBcrypt.js";
import { userService } from "../services/user.service.js";
import { isValidEmail } from "../utils/email.validator.js";
import { createToken } from "../utils/createToken.js";

// create new user
const createNewUserToDB = catchAsync(async (req, res) => {
  const payload = req?.body?.data;
  console.log(payload);
  if (!isValidEmail(payload?.email)) {
    sendResponse(res, {
      success: false,
      statusCode: 400,
      message: "Email validation failed",
      data: null,
    });
    return;
  }
  const hashed = await hashedPassword(payload.password);
  payload.password = hashed;
  const result = await userService.createNewUser(payload);
  if (result) {
    const token = createToken(result.email);
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "User created successfully",
      data: {result, token},
    });
  }
});

//user login verification
const userLoginVerification = catchAsync(async (req, res) => {
  const { email, password } = req.body; 

  if (!email || !password) {
    return sendResponse(res, {
      success: false,
      statusCode: 400, 
      message: "Email and password are required.",
      data: null,
    });
  }

  const userData = await userService.getUserPass(email);

  if (!userData) {
    return sendResponse(res, {
      success: false,
      statusCode: 401,
      message: "Invalid credentials.", 
      data: null,
    });
  }

  const isPasswordMatched = await comparePassword(password, userData.password);

  if (!isPasswordMatched) {
    return sendResponse(res, {
      success: false,
      statusCode: 401, 
      message: "Invalid credentials.", 
      data: null,
    });
  }
 
  const token = createToken(email);
  sendResponse(res, {
    success: true,
    statusCode: 200, 
    message: "User logged in successfully!",
    data: {
      user: {
        id: userData._id,
        email: userData.email,
        name:userData.name,
      },
      token:token,
    },
  });
});

export const userController = {
  createNewUserToDB,
  userLoginVerification,
};
