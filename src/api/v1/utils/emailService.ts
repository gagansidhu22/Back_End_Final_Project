import { transporter } from "../../../../config/emailConfig";

export const sendEmail = async (to: string, subject: string, html: string) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      html,
    });

    console.log("Email sent successfully!");
  } catch (error) {
    console.error("Email failed:", error);
  }
};
