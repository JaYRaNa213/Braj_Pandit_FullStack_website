// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.
// If you theft this code, you will be punished or may face legal action by the owner.

import express from 'express';
import { getAllPandits, getPanditById,applyPandit } from '../../controllers/pandit.controller.js';
// optionally import verifyToken if needed
const router = express.Router();

// Optional: add verifyToken if you want only logged-in users to view pandits
router.get('/', getAllPandits);
router.get('/:id', getPanditById);

router.post('/apply', applyPandit);
// // routes/pandit.routes.js
// router.post("/apply", async (req, res) => {
//   try {
//     const pandit = new Pandit({ ...req.body, status: "pending" });
//     await pandit.save();

//     // Send admin email
//     await sendEmail({
//       to: "brajpandit123@gmail.com",
//       subject: "🛕 New Pandit Application",
//       text: `New application from ${pandit.name} (${pandit.email})`,
//     });

//     res.status(201).json({ message: "Application submitted!" });
//   } catch (error) {
//     res.status(500).json({ error: "Failed to submit application" });
//   }
// });


export default router;
