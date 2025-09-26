import { Memory } from '#modules/models/memories-schema.js';

// the user will create a memory
export async function createMemory(req, res) {
  try {
    const { title, description, location, media, tags, dates } = req.body;
    const memory = new Memory({
      title,
      description,
      location,
      media,
      tags,
      dates,
      user: req.user._id,
    });

    await memory.save();
    res.status(201).json(memory);
  } catch (err) {
    console.error('Error in memory:', err);
    res.status(400).json({ message: 'Failed to create memory' });
  }
}
