import validator from 'validator';

function isValidEmail(email) {
  return validator.isEmail(email);
}

export function validateContactMiddleware(req, res, next) {
  const name = req.body?.name?.trim();
  const email = req.body?.email?.trim();
  const message = req.body?.message?.trim();

  if (!name || !email || !message) {
    return res.status(400).json({
      message: 'Name, email, and message are required.',
    });
  }

  if (name.length < 2) {
    return res.status(400).json({
      message: 'Name must be at least 2 characters long.',
    });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({
      message: 'Please provide a valid email address.',
    })
  }

  if (message.length < 2) {
    return res.status(400).json({
      message: 'Message must be at least 2 characters long.',
    });
  }

  if (message.length > 2000) {
    return res.status(400).json({
      message: 'Message must not exceed 2000 characters.',
    });
  }

  req.body = {
    name,
    email,
    message,
  }

  next();
}