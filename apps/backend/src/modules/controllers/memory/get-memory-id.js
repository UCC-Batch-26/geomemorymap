export async function getMemoryById(req, res){
  try {
    const memory = await Memory.findOne({
      id: req.params.id,
      userId: req.user.id,
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