// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.
// If you theft this code, you will be punished or may face legal action by the owner.

// backend/src/controllers/pandit.controller.js
import Pandit from '../models/pandit.model.js';
import asyncHandler from '../utils/asyncHandler.js';
export const getAllPandits = async (req, res) => {
  try {
    const pandits = await Pandit.find({ status: "approved" });
    res.status(200).json({ success: true, data: pandits });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching pandits' });
  }
};

export const getAdminAllPandits = asyncHandler(async (req, res) => {
  const pandits = await Pandit.find().sort({ createdAt: -1 });
  res.status(200).json({
    success: true,
    data: pandits
  });
});

// ✅ Controller function
export const applyPandit = async (req, res) => {
  try {
    const newPandit = new Pandit({ ...req.body, approved: false });

    await newPandit.save();
    res.status(201).json({ message: "Application submitted, pending approval." });
  } catch (err) {
    res.status(500).json({ error: "Error applying as pandit." });
  }
};





export const addPandit = async (req, res) => {
  try {
    const newPandit = new Pandit(req.body);
    const saved = await newPandit.save();
    res.status(201).json({ success: true, data: saved });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error adding pandit' });
  }
};

export const updatePanditStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updated = await Pandit.findByIdAndUpdate(id, { status }, { new: true });
    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating pandit status' });
  }
};

export const deletePandit = async (req, res) => {
  try {
    await Pandit.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'Pandit deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting pandit' });
  }
};

export const getPanditById = async (req, res) => {
  try {
    const pandit = await Pandit.findById(req.params.id);
    res.status(200).json({ success: true, data: pandit });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching pandit' });
  }
};

export const getSinglePandit = async (req, res) => {
  try {
    const pandit = await Pandit.findById(req.params.id);
    if (!pandit) return res.status(404).json({ message: "Pandit not found" });
    res.status(200).json({ success: true, data: pandit });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching pandit" });
  }
};
