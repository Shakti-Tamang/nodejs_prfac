const userRepository  = require("../repositories/userRepository");
const CreateUserDto   = require("../dto/createUser.dto");
const UpdateUserDto   = require("../dto/updateUser.dto");

// GET /users
const getAllUsers = async (req, res, next) => {
  try {
    const users = await userRepository.findAll();
    res.json(users);
  } catch (err) {
    next(err);
  }
};

// GET /users/:id
const getUserById = async (req, res, next) => {
  try {
    const user = await userRepository.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    next(err);
  }
};

// POST /users
const createUser = async (req, res, next) => {
  try {
    const dto = new CreateUserDto(req.body);
    const errors = dto.validate();
    if (errors.length > 0) return res.status(400).json({ errors });

    const user = await userRepository.create(dto.toEntity());
    res.status(201).json(user);
  } catch (err) {
    if (err.code === "23505") {
      return res.status(409).json({ message: "Email already exists" });
    }
    next(err);
  }
};

// PUT /users/:id
const updateUser = async (req, res, next) => {
  try {
    const dto = new UpdateUserDto(req.body);
    const errors = dto.validate();
    if (errors.length > 0) return res.status(400).json({ errors });

    const existing = await userRepository.findById(req.params.id);
    if (!existing) return res.status(404).json({ message: "User not found" });

    const user = await userRepository.update(req.params.id, dto.toEntity());
    res.json(user);
  } catch (err) {
    if (err.code === "23505") {
      return res.status(409).json({ message: "Email already exists" });
    }
    next(err);
  }
};

// DELETE /users/:id
const deleteUser = async (req, res, next) => {
  try {
    const user = await userRepository.remove(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    next(err);
  }
};

module.exports = { getAllUsers, getUserById, createUser, updateUser, deleteUser };
