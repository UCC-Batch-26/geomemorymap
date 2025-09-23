import { User } from '/uplift/geomemory-app/geomemorymap/apps/backend/src/modules/models/userSchema.js';
import bcrypt from 'bcrypt';

export async function validateLogin(req, res, next) {
  const { username, email, password } = req.body;

  try {
    //validate username and password
    if ((!username && !email) || !password) {
      return res.status(400).json({ message: 'Account not Found' });
    }

    //find user
    const user = await User.findOne({ $or: [{ username }, { email }] });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // // check password
    // if (user.password !== password) {
    //   return res.status(400).json({ message: 'Invalid' });
    // }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Inavalid' });
      console.log('Password match result:', isMatch);
    }

    req.user = user;
    next();
  } catch (err) {
    console.error('Validation Error:', err);
    return res.status(500).json({ message: 'Internal login validation failed' });
  }
}
