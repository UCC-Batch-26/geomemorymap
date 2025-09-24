export function validateRegister(request, response, next) {
  const { username, email, password } = request.body;

  if (!username || !email || !password ) {
    return response.status(400).json({
      message: "Username, email, and password are required",
    })
  }

  if (username.length < 3 || username.length > 20) {
    return response.status(400).json({
      message: "Username must be between 3 and 20 characters",
    });
  }

  const emailRegex = /^[A-Za-z0-9._]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}$/;
  if (!emailRegex.test(email)) {
    return response.status(400).json({
      message: "Invalid email format",
    })
  }

  if (password.length < 6) {
    return response.status(400).json({
      message: "Password must be atleast 6 characters long",
    })
  }

  next();
}