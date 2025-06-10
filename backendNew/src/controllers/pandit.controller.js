// src/controllers/pandit.controller.js
import Pandit from '../../models/pandit.model.js';

export const getAllPandits = async (req, res) => {
  try {
    const pandits = await Pandit.find();
    res.status(200).json({ success: true, data: pandits });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching pandits' });
  }
};
