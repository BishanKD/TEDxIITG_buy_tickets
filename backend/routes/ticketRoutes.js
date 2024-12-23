const express = require("express");
const {
  generateOtp,
  verifyOtp,
  test
} = require("../controllers/ticketController");

const router = express.Router();

router.post("/generate-otp", generateOtp);
router.post("/verify-otp", verifyOtp);
router.post("/test", test);

module.exports = router;
