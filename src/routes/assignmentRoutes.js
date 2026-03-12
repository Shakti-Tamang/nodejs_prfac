const express = require("express");
const router  = express.Router();
const {
  createAssignment,
  getAllAssignments,
  getAssignmentById,
  getAssignmentsByUser,
} = require("../controllers/assignmentController");
const authenticate = require("../middleware/authenticate");
const authorize    = require("../middleware/authorize");
const { Role }     = require("../enums/enums");

/**
 * @swagger
 * tags:
 *   name: Assignments
 *   description: Assignment management — requires Bearer JWT token
 */

// All routes require a valid JWT
router.use(authenticate);

/**
 * @swagger
 * /assignments:
 *   post:
 *     summary: Create an assignment and link it to a user
 *     tags: [Assignments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateAssignmentRequest'
 *     responses:
 *       201:
 *         description: Assignment created and linked to user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Assignment'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorMessage'
 *       403:
 *         description: Forbidden — Admin role required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorMessage'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorMessage'
 */
router.post("/", authorize(Role.ADMIN), createAssignment);

/**
 * @swagger
 * /assignments:
 *   get:
 *     summary: Get all assignments (with user info)
 *     tags: [Assignments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of assignments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Assignment'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorMessage'
 */
router.get("/", authorize(Role.ADMIN, Role.USER), getAllAssignments);

/**
 * @swagger
 * /assignments/user/{userId}:
 *   get:
 *     summary: Get all assignments for a specific user
 *     tags: [Assignments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: User ID
 *     responses:
 *       200:
 *         description: List of assignments for the user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Assignment'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorMessage'
 */
router.get("/user/:userId", authorize(Role.ADMIN, Role.USER), getAssignmentsByUser);

/**
 * @swagger
 * /assignments/{id}:
 *   get:
 *     summary: Get a single assignment by ID
 *     tags: [Assignments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Assignment ID
 *     responses:
 *       200:
 *         description: Assignment found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Assignment'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorMessage'
 *       404:
 *         description: Assignment not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorMessage'
 */
router.get("/:id", authorize(Role.ADMIN, Role.USER), getAssignmentById);

module.exports = router;
