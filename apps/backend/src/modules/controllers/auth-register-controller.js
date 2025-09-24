import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User } from '#modules/models/userSchema.js';

const JWT_SECRET = process.env.JWT_SECRET;

export async function register(request, response) {
  try {
    const { username, email, password } = request.body;

    if (!username || !email || !password) {
      return response.status(400).json({
        message: "All fields are required"
      })
    }

    const existingUser = await User.findOne({email});

    if (existingUser) {
      if (existingUser.email == email) {
        return response.status(400).json({
          message: "Email is already in use"
        })
      }

      if (existingUser.username === username) {
        return response.status(400).json({
          message: "Username already taken"
        })
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    })

    const token = jwt.sign(
      {id: newUser.id, username: newUser.username, email: newUser.email},
      JWT_SECRET,
      { expiresIn: '7D' }
    )

    return response.status(201).json({
      message: 'User registered succesfully',
      token,
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      }
    })
  } catch (error) {
    console.error('Register Error:', error);
    response.status(500).json({
      message: 'Internal server error'
    })
  }
}