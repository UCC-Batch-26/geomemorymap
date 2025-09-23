import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export async function login(request, response) {
  try {
    const user = request.user;

    // token
    const token = jwt.sign(
      { id: user._id, username: user.username, email: user.email },
      JWT_SECRET,
      { expiresIn: '7D' }, // expires in 7 days
    );

    return response.status(200).json({
      message: `Welcome ${user.username}`,
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    console.error('Login Error:', err);
    response.status(500).json({ message: 'Internal server error' });
  }
}
