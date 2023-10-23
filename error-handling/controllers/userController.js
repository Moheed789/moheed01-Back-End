import ErrorHandler from "../utils/errorHandler.js";
import { User } from "../model/user.js";
import { catchAsyncError } from "../model/catchAsyncError.js";

export const newUser = catchAsyncError(async (req, res, next) => {
    const userExist = false;
    if (userExist) {
        return next(new ErrorHandler("User Already Exist", 400));
    }
    await User.create({
        name: "Moheed",
        email: "moheed@gmail.com",
    })

    res.status(201).json({ message: "User Created Successfully" })
});