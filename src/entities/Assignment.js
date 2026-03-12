const { EntitySchema } = require("typeorm");

const Assignment = new EntitySchema({
  name: "Assignment",
  tableName: "assignments",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    title: {
      type: "varchar",
      length: 200,
      nullable: false,
    },
    description: {
      type: "text",
      nullable: true,
    },
    dueDate: {
      name: "due_date",
      type: "date",
      nullable: true,
    },
    createdAt: {
      name: "created_at",
      type: "timestamp",
      createDate: true,
    },
  },
  relations: {
    // Many assignments → One user
    user: {
      type: "many-to-one",
      target: "User",
      joinColumn: { name: "user_id" },
      nullable: false,
      onDelete: "CASCADE",
      eager: false,
    },
  },
});

module.exports = Assignment;
