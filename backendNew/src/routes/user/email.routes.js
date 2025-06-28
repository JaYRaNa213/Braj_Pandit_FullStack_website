// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.
// If you theft this code, you will be punished or may face legal action by the owner.

import express from 'express';
import { sendEmail, submitContactForm } from '../../controllers/email.controller.js';

const router = express.Router();

// ✅ Route to send email
router.post('/send', sendEmail);

// ✅ Route to handle contact form submission
router.post('/contact', submitContactForm);

export default router;
