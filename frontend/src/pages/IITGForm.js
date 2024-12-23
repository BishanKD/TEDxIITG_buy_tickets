import React, { useState } from "react";
import axios from "axios";

function IITGForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.endsWith("@iitg.ac.in")) {
      alert("Please enter a valid IITG email.");
      return;
    }

    try {
      const response = await axios.post("/api/tickets/generate-otp", { email });
      if (response.status === 200) {
        setOtpSent(true);
      }
    } catch (error) {
      alert("Failed to send OTP.");
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/tickets/verify-otp", { email, otp });
      if (response.status === 200) {
        window.location.href = "/payment?discount=iitg";
      }
    } catch (error) {
      alert("Invalid OTP.");
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "50px auto", textAlign: "center" }}>
      <h1>IITG Ticket Purchase</h1>
      <form onSubmit={otpSent ? handleOtpSubmit : handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="email"
            placeholder="IITG Email (e.g., name@iitg.ac.in)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        {otpSent && (
          <div>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </div>
        )}
        <button type="submit">{otpSent ? "Verify OTP" : "Send OTP"}</button>
      </form>
    </div>
  );
}

export default IITGForm;
