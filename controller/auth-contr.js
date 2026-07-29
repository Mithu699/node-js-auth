const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

// Register Controller
const registerUser = async (req, res) => {
  try {
    // Extract user information
    const { username, email, password, role } = req.body;

    // Check if user already exists
    const checkExistingUser = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (checkExistingUser) {
      return res.status(400).json({
        success: false,
        message:
          "User already exists with the same username or email. Please use a different one.",
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newlyCreatedUser = new User({
      username,
      email,
      password: hashedPassword,
      role: role || "user",
    });

    await newlyCreatedUser.save();

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: newlyCreatedUser,
    });
  } catch (e) {
    console.error(e);

    return res.status(500).json({
      success: false,
      message: "Some error occurred. Please try again later.",
    });
  }
};

// Login Controller
const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // find if the current user is exists in database or not;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: `user does not exists`,
      });
    }

    // check if the password is correct or not

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: "invalid credentials",
      });
    }

    // create user token // JWT (PAYLOAD,SECRET or Private key , , [options, callback])
    const accessToken = jwt.sign(
      {
        userId: user._id,
        username: user.username,
        role: user.role,
      },
      process.env.jwt_SECRET_KEY, {
      expiresIn : "15m"
      });

res.status(200).json({
  success : true,
  message : "logged in successfully",
  accessToken
})


  } catch (e) {
    console.error(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred. Please try again later.",
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
