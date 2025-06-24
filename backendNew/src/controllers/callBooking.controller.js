// File: src/controllers/callBooking.controller.js

import nodemailer from "nodemailer";
import emailReceivers from "../config/emailReceivers.js";

export const sendBookingEmail = async (req, res) => {
  const { name, email, phone, service, message } = req.body;

  try {
    // Determine the receiver based on service type
    const receiverEmail = emailReceivers[service] || process.env.MAIL_RECEIVER;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"BrajPandit Booking" <${process.env.MAIL_USER}>`,
      to: receiverEmail,
      subject: `📩 New Booking: ${service} from ${name}`,
      html: `
        <h2>New Service Booking Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Service:</strong> ${service}</p>
        <p><strong>Message:</strong> ${message || "N/A"}</p>
        <hr/>
        <p style="font-size:12px;color:#777;">Received on: ${new Date().toLocaleString()}</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully" });
  } catch (err) {
    console.error("Email Error:", err);
    res.status(500).json({ message: "Failed to send email" });
  }
};
