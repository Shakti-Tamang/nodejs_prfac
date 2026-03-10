const AppDataSource = require("../config/data-source");
const User = require("../entities/User");

// Returns the TypeORM repository for the User entity
const getUserRepo = () => AppDataSource.getRepository(User);

const findAll = async () => {
  return getUserRepo().find({ order: { id: "ASC" } });
};

const findById = async (id) => {
  return getUserRepo().findOneBy({ id: parseInt(id) });
};

const create = async (data) => {
  const repo = getUserRepo();
  const user = repo.create(data);    // creates a User instance
  return repo.save(user);            // INSERT INTO users ...
};

const update = async (id, data) => {
  const repo = getUserRepo();
  await repo.update({ id: parseInt(id) }, data);  // UPDATE users SET ...
  return repo.findOneBy({ id: parseInt(id) });     // return updated row
};

const remove = async (id) => {
  const repo = getUserRepo();
  const user = await repo.findOneBy({ id: parseInt(id) });
  if (!user) return null;
  await repo.remove(user);  // DELETE FROM users WHERE id = ...
  return user;
};

module.exports = { findAll, findById, create, update, remove };
