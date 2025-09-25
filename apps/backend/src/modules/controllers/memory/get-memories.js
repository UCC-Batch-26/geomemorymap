// import

export async function getMemories(req, res){
  try {
    const memories = await MemorySchema.find({
      userId: req.user.id
    })

    res.json({
      success: true,
      data: memories
    })
  } catch (error) {
    console.error('Get Memories Error', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch memories'
    })
  }
}