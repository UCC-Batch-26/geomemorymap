export function validateMemory(req, res, next) {
  const { title, description, location, photoURL } = req.body;

  if (!title || typeof title !== 'string' || title.trim().length < 3 || title.trim().length > 100) {
    return res.status(400).json({
      success: false,
      message: 'Title must be 3-100 characters long',
    });
  }

  if (
    !description ||
    typeof description !== 'string' ||
    description.trim().length < 10 ||
    description.trim().length > 500
  ) {
    return res.status(400).json({
      success: false,
      message: 'Description must be 10-500 characters long',
    });
  }

  if (!location || typeof location !== 'object') {
    return res.status(400).json({
      success: false,
      message: 'Location must be an object with lat and lng',
    });
  }

  let { lat, lng } = location;

  lat = Number(lat);
  lng = Number(lng);

  if (typeof lat !== 'number' || lat < -90 || lat > 90) {
    return res.status(400).json({
      success: false,
      message: 'Latitude must be a number between -90 and 90',
    });
  }

  if (photoURL && typeof photoURL !== 'string') {
    return res.status(400).json({
      success: false,
      message: 'Photo URL must be a string if provided',
    });
  }

  if (typeof lng !== 'number' || lng < -180 || lng > 180) {
    return res.status(400).json({
      success: false,
      message: 'Longitude must be between -180 and 180',
    });
  }

  next();
}
