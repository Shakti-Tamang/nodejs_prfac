const { EntitySchema } = require("typeorm");

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
    createdAt: {
      name: "created_at",
      type: "timestamp",
      createDate: true,
    },
  },
});

module.exports = User;
