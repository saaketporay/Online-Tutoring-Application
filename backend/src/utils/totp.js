const speakeasy = require("speakeasy");
const { getUserSecret } = require("../models/User"); 
const { sendEmail } = require("./mailer.js"); 

const sendTOTP = async (email) => {
    if (!email) {
      throw new Error("Email is required");
    }
  
    // Retrieve the user's TOTP secret from the database
    const userSecret = await getUserSecret(email);
    if (!userSecret) {
      throw new Error("TOTP secret not found for the user");
    }
  
    // Generate TOTP
    const token = speakeasy.totp({
      secret: userSecret,
      encoding: "base32",
      step: 120,
    });
  
    console.log(token);
    // Send email with the TOTP
    try {
      await sendEmail(email, "Your TOTP", `Your one-time password is: ${token}`);
    } catch (error) {
      console.error(error);
      throw new Error("Error sending TOTP");
    }
  };

  module.exports = { sendTOTP };