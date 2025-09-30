import { Memory } from '#modules/models/memories-schema.js';

export async function createMemory(req, res) {
  try {
    const { title, description, location, photoURL } = req.body;

    if (!title || !description || !location) {
      return res.status(400).json({
        message: 'Title, description, and location are required',
      });
    }

    const newMemory = new Memory({
      userId: req.user.id,
      title,
      description,
      location,
      photoURL: photoURL || null,
    });

    await newMemory.save();

    res.status(201).json({
      success: true,
      message: 'Memory created successfully',
      data: newMemory,
    });
  } catch (error) {
    console.log('Create Memory Error', error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
