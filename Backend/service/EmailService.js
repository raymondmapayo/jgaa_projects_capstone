const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT),
  secure: false, // STARTTLS will be used automatically
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const sendConfirmationEmail = async (user) => {
  const verificationUrl = `https://jgaa-projects-capstone.vercel.app/verify-email?token=${user.verification_token}`;

  const mailOptions = {
    from: `"Jgaa Thai Restaurant" <${process.env.SMTP_EMAIL}>`,
    to: user.email,
    subject: "Please Verify Your Email Address",
    html: `
      <p>Good day!</p>
      <p>This is <b>Jgaa Thai Restaurant</b>. Please click the link below to verify your email:</p>
      <p><a href="${verificationUrl}">${verificationUrl}</a></p>
      <b>This link expires in 7 days.</b>
      <br><br>
      <footer>
        <p>This email was sent to <b>${user.email}</b> for verification.</p>
        <p>Thank you for registering with us!</p>
      </footer>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Verification email sent:", info.messageId);
    return true;
  } catch (err) {
    console.error("❌ Error sending email:", err);
    return false;
  }
};

module.exports = { sendConfirmationEmail };
