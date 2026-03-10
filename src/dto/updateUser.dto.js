// DTO for PUT /users/:id — all fields optional but at least one required

class UpdateUserDto {
  constructor({ name, email }) {
    this.name = name;
    this.email = email;
  }

  validate() {
    const errors = [];

    if (!this.name && !this.email) {
      errors.push("At least one of name or email must be provided");
    }

    if (
      this.email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)
    ) {
      errors.push("email must be a valid email address");
    }

    return errors;
  }

  toEntity() {
    const update = {};
    if (this.name) update.name = this.name.trim();
    if (this.email) update.email = this.email.trim().toLowerCase();
    return update;
  }
}

module.exports = UpdateUserDto;
