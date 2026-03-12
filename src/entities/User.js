const { EntitySchema } = require("typeorm");
const { Role } = require("../enums/enums");

// This defines the "users" table in PostgreSQL via TypeORM
// synchronize:true in DataSource will auto-create this table
const User = new EntitySchema({
  name: "User",
  tableName: "users",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    name: {
      type: "varchar",
      length: 100,
      nullable: false,
    },
    email: {
      type: "varchar",
      length: 150,
      unique: true,
      nullable: false,
    },
    password: {
      type: "varchar",
      length: 255,
      nullable: false,
    },
    role: {
      type: "varchar",
      length: 20,
      default: Role.USER,   // every new user is "user" by default
      nullable: false,
    },
    createdAt: {
      name: "created_at",
      type: "timestamp",
      createDate: true,
    },
  },
  relations: {
    // One user → Many assignments
    assignments: {
      type: "one-to-many",
      target: "Assignment",
      inverseSide: "user",
      cascade: true,
      eager: false,
    },
  },
});

module.exports = User;

