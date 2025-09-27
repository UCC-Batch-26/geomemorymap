import { Memory } from '#modules/models/memories-schema.js';

export async function deleteMemory(req, res) {
  try {
    const memory = await Memory.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!memory) {
      return res.status(404).json({
        success: false,
        message: 'Memory not found or not yours',
      });
    }

    res.json({
      success: true,
      message: 'Memory deleted succesfully',
      data: memory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
