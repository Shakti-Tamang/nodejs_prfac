const bcrypt = require("bcrypt");
const AppDataSource = require("../config/data-source");
const User = require("../entities/User");

const getUserRepo = () => AppDataSource.getRepository(User);

const SALT_ROUNDS = 10;

// Register: hash password then save to DB
const register = async (userData) => {
  const repo = getUserRepo();

  const exists = await repo.findOneBy({ email: userData.email });
  if (exists) {
    const err = new Error("Email already registered");
    err.status = 409;
    throw err;
  }

  const hashedPassword = await bcrypt.hash(userData.password, SALT_ROUNDS);
  const user = repo.create({ ...userData, password: hashedPassword });
  const saved = await repo.save(user);

  // Never return the password
  const { password, ...safeUser } = saved;
  return safeUser;
};

// Login: find user, compare password, return user (no password)
const login = async (email, password) => {
  const repo = getUserRepo();

  const user = await repo.findOneBy({ email });
  if (!user) {
    const err = new Error("Invalid email or password");
    err.status = 401;
    throw err;
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    const err = new Error("Invalid email or password");
    err.status = 401;
    throw err;
  }

  const { password: _, ...safeUser } = user;
  return safeUser;
};

module.exports = { register, login };
