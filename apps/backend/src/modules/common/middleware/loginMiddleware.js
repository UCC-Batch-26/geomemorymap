import { User } from '/uplift/geomemory-app/geomemorymap/apps/backend/src/modules/samples/models/userSchema.js';

export async function validateLogin(req, res, next){
  const { username, password } = req.body;

  try{
    //validate username and password
    if(!username || !password){
      return res.status(400).json({ message: 'Account not Found'});
    }

    //find user
    const user = await User.findOne({ username: username });
    if(!user) {
      return res.status(400).json({ message: 'Invalid credentials'});
    }

    // check password
    if(user.password !== password) {
      return res.status(400).json({ message: 'Invalid'});
    }

    req.user = user;
    next();


  } catch (err) {
    console.error('Validation Error:', err);
    return res.status(500).json({ message: 'Internal login validation failed'});
  }
}