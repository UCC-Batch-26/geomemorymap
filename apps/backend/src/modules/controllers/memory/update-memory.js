import { Memory } from '#modules/models/memories-schema.js';

export async function updateMemory(req, res) {
  try {
    const memory = await Memory.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    )

    if (!memory) {
      return res.status(404).json({ success: false, message: "Memory not found or not yours" });
    }

    res.json({ success: true, data: memory });
  } catch (error) {
    console.error('Update Memory Error', error)
    res.status(500).json({
      success: false,
      message: 'Failed to update memory'
    })
  }
}