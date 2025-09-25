import { Memory } from '#modules/models/memories-schema.js';

// the user will create a memory
export async function createMemory(req, res){
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
    res.status(400).json({ message: 'Failed to create memory' });
  }
};

//get all memory 
export async function getMemories ( req, res) {
  try {
    const memories = (await Memory.find({ user: req.user._id })).sort({ date: -1 });
    res.status(201).json(memories);
  } catch (err){
    res.status(400).json({ message: 'Failed to get all the memories'});
  }
};

// export async function updateMemory ( req, res) {
//   try {

//   }
// }