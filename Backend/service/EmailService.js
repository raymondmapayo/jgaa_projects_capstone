// service/EmailService.js
const nodemailer = require("nodemailer");

// Use Sendmail (works on Render)
const transporter = nodemailer.createTransport({
  sendmail: true,
  newline: "unix",
  path: "/usr/sbin/sendmail",
});

const sendConfirmationEmail = async (user) => {
  const verificationUrl = `https://jgaa-projects-capstone.vercel.app/verify-email?token=${user.verification_token}`;

  const mailOptions = {
    // ✅ Use your .env Gmail address just as display name (not for login)
    from: `"Jgaa Thai Restaurant" <${process.env.SMTP_EMAIL}>`,
    to: user.email,
    subject: "Please Verify Your Email Address",
    html: `
      <p>Good day Sir!</p>
      <p>This is <b>Jgaa Thai Restaurant</b>. Please <b>click</b> the link below to verify your email address:</p>
      <b>This link expires in 7 days.</b>
      <p><a href="${verificationUrl}">${verificationUrl}</a></p>
      <p>If you did not request this, please ignore this email.</p>
      <footer>
        <p>This email was sent to <b>${user.email}</b> to protect your account security.</p>
        <p>Thank you for registering with us!</p>
      </footer>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Verification email sent:", info.envelope);
    return true;
  } catch (err) {
    console.error("❌ Error sending email:", err);
    return false;
  }
};

module.exports = { sendConfirmationEmail };
