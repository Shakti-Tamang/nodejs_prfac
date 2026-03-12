// DTO for POST /assignments
class AssignmentDto {
  constructor({ title, description, dueDate, userId }) {
    this.title       = title;
    this.description = description || null;
    this.dueDate     = dueDate     || null;
    this.userId      = userId;
  }

  validate() {
    const errors = [];

    if (!this.title || typeof this.title !== "string" || !this.title.trim())
      errors.push("title is required and must be a non-empty string");

    if (!this.userId || isNaN(parseInt(this.userId)))
      errors.push("userId is required and must be a valid integer");

    if (this.dueDate && isNaN(Date.parse(this.dueDate)))
      errors.push("dueDate must be a valid date (YYYY-MM-DD)");

    return errors;
  }

  toEntity() {
    return {
      title:       this.title.trim(),
      description: this.description,
      dueDate:     this.dueDate,
    };
  }
}

module.exports = AssignmentDto;