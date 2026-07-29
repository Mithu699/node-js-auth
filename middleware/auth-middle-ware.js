const jwt = require("jsonwebtoken");

const authMiddleWare = (req, res, next) => {
  const authHeader = req.header["authorization"];
  console.log(authHeader);
  const token = authHeader && authHeader.split("")[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Access denied. no token provided, please login to continue",
    });
  }
};

// decode this token

try {
  const decodedTokenInfo = jwt.verify(token, process.env.JWT_SECRET_KEY);
  console.log(decodedTokenInfo);

  req.userInfo = decodedTokenInfo;
  next();
} catch (error) {
  return res.status(500).json({
    success: false,
    message: "Access denied. no token provided, please login to continue",
  });
}

module.exports = authMiddleWare;
