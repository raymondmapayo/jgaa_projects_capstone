// service/EmailService.js
const axios = require("axios");

const sendConfirmationEmail = async (user) => {
  const verificationUrl = `https://jgaa-projects-capstone.vercel.app/verify-email?token=${user.verification_token}`;

  const data = {
    service_id: process.env.SERVICE_ID, // Your EmailJS service ID
    template_id: process.env.TEMPLATE_ID, // Your EmailJS template ID
    user_id: process.env.PUBLIC_KEY, // Your EmailJS public key
    template_params: {
      to_name: user.name || "User",
      to_email: user.email,
      verification_url: verificationUrl,
    },
  };

  try {
    const response = await axios.post(
      "https://api.emailjs.com/api/v1.0/email/send",
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("✅ Verification email sent via EmailJS:", response.data);
    return true;
  } catch (err) {
    console.error(
      "❌ Error sending email via EmailJS:",
      err.response?.data || err.message
    );
    return false;
  }
};

module.exports = { sendConfirmationEmail };
