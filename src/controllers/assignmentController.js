const assignmentRepository = require("../repositories/assignmentRepository");
const AssignmentDto        = require("../dto/assignment.dto");

// POST /assignments  — create assignment and link to a user
const createAssignment = async (req, res, next) => {
  try {
    const dto    = new AssignmentDto(req.body);
    const errors = dto.validate();
    if (errors.length > 0) return res.status(400).json({ errors });

    const assignment = await assignmentRepository.create(dto.toEntity(), dto.userId);
    if (!assignment) return res.status(404).json({ message: "User not found" });

    res.status(201).json(assignment);
  } catch (err) {
    next(err);
  }
};

// GET /assignments
const getAllAssignments = async (req, res, next) => {
  try {
    const assignments = await assignmentRepository.findAll();
    res.json(assignments);
  } catch (err) {
    next(err);
  }
};

// GET /assignments/:id
const getAssignmentById = async (req, res, next) => {
  try {
    const assignment = await assignmentRepository.findById(req.params.id);
    if (!assignment) return res.status(404).json({ message: "Assignment not found" });
    res.json(assignment);
  } catch (err) {
    next(err);
  }
};

// GET /assignments/user/:userId  — all assignments for a user
const getAssignmentsByUser = async (req, res, next) => {
  try {
    const assignments = await assignmentRepository.findByUser(req.params.userId);
    res.json(assignments);
  } catch (err) {
    next(err);
  }
};

module.exports = { createAssignment, getAllAssignments, getAssignmentById, getAssignmentsByUser };
