import jwt from 'jsonwebtoken';
import { User } from '/uplift/geomemory-app/geomemorymap/apps/backend/src/modules/models/userSchema.js';

// middleware for only logged-in user
export async function createMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id).select('-password');
    if (!req.user) {
      return res.status(401).json({ message: 'User not found' });
    }

    next();
  } catch (err) {
    console.error('JWT Verify Error:', err.message);
    res.status(401).json({ message: 'Not authorized, token failed' });
  }
}
