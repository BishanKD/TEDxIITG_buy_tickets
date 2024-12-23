const mongoose = require("mongoose");

const ticketSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
    },
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    otp: {
      type: String,
    },
    otpExpires: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Ticket", ticketSchema);
