const express = require("express");
const authMiddleWare = require("../middleware/auth-middle-ware");

const router = express.Router();

router.get("/Welcome", authMiddleWare, (req, res) => {
  res.json({
    message: "Welcome to the home page",
  });
});

module.exports = router;