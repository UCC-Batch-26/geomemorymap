import { Memory } from '#modules/models/memories-schema.js';
import mongoose from 'mongoose';

export async function getMemoryById(req, res){
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid memory ID'
      })
    }

    const memory = await Memory.findOne({
      _id: id,
      userId: req.user.id
    })

    if (!memory) {
      return res.status(404).json({
        success: false,
        message: "Memory not found"
      })
    }

    res.json({
        success: true, 
        data: memory
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}