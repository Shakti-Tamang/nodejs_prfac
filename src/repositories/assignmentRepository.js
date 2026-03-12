const AppDataSource = require("../config/data-source");
const Assignment   = require("../entities/Assignment");
const User         = require("../entities/User");

const getAssignmentRepo = () => AppDataSource.getRepository(Assignment);
const getUserRepo       = () => AppDataSource.getRepository(User);

// Create assignment and link to a user
const create = async ({ title, description, dueDate }, userId) => {
  const userRepo = getUserRepo();

  // Find the user — throws-safe: controller handles null
  const user = await userRepo.findOneBy({ id: parseInt(userId) });
  if (!user) return null;

  const repo       = getAssignmentRepo();
  const assignment = repo.create({ title, description, dueDate, user });
  return repo.save(assignment);   // INSERT with user_id FK set
};

// Fetch all assignments (with user info)
const findAll = async () => {
  return getAssignmentRepo().find({
    relations: ["user"],
    order: { id: "ASC" },
  });
};

// Fetch one assignment by id
const findById = async (id) => {
  return getAssignmentRepo().findOne({
    where: { id: parseInt(id) },
    relations: ["user"],
  });
};

// Fetch all assignments that belong to a user
const findByUser = async (userId) => {
  return getAssignmentRepo().find({
    where: { user: { id: parseInt(userId) } },
    relations: ["user"],
    order: { id: "ASC" },
  });
};

module.exports = { create, findAll, findById, findByUser };
