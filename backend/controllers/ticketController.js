const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const Ticket = require("../models/ticketModel");

// Email setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const generateOtp = async (req, res) => {
  const { email } = req.body;

  if (!email || !email.endsWith("@iitg.ac.in")) {
    return res.status(400).json({ message: "Invalid email address" });
  }

  try {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedOtp = await bcrypt.hash(otp, 10);
    const otpExpires = new Date(Date.now() + 10 * 60000); // OTP valid for 10 minutes

    let ticket = await Ticket.findOne({ email });
    if (ticket) {
      ticket.otp = hashedOtp;
      ticket.otpExpires = otpExpires;
    } else {
      ticket = new Ticket({ email, otp: hashedOtp, otpExpires });
    }
    await ticket.save();

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your TEDxIITGuwahati Ticket OTP",
      text: `Your OTP is ${otp}. It is valid for 10 minutes.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).json({ message: "Failed to send OTP" });
      }
      return res.status(200).json({ message: "OTP sent successfully" });
    });
  } catch (error) {
    res.status(500).json({ message: "Error generating OTP" });
  }
};

const test = async(req, res) => {
  res.status(200).json({message:"test successful"});
}
const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const ticket = await Ticket.findOne({ email });
    if (!ticket || new Date() > new Date(ticket.otpExpires)) {
      return res.status(400).json({ message: "OTP expired or invalid" });
    }

    const isMatch = await bcrypt.compare(otp, ticket.otp);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    res.status(200).json({ message: "OTP verified successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error verifying OTP" });
  }
};

module.exports = { generateOtp, verifyOtp, test };
