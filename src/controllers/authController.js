const jwt = require("jsonwebtoken");
const authRepository = require("../repositories/authRepository");
const RegisterDto = require("../dto/register.dto");
const LoginDto = require("../dto/login.dto");

// POST /auth/register
const register = async (req, res, next) => {
  try {
    const dto = new RegisterDto(req.body);
    const errors = dto.validate();
    if (errors.length > 0) return res.status(400).json({ errors });

    const user = await authRepository.register(dto.toEntity());
    res.status(201).json({ message: "User registered successfully", user });
  } catch (err) {
    next(err);
  }
};

// POST /auth/login
const login = async (req, res, next) => {
  try {
    const dto = new LoginDto(req.body);
    const errors = dto.validate();
    if (errors.length > 0) return res.status(400).json({ errors });

    const user = await authRepository.login(dto.email, dto.password);

    // Sign JWT with user id and role inside the payload
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ message: "Login successful", token, user });
  } catch (err) {
    next(err);
  }
};

module.exports = { register, login };
