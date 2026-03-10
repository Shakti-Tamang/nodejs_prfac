// DTO = Data Transfer Object
// Validates and shapes the incoming request body for POST /users

class CreateUserDto {
  constructor({ name, email }) {
    this.name = name;
    this.email = email;
  }

  // Returns an array of error messages, empty if valid
  validate() {
    const errors = [];

    if (!this.name || typeof this.name !== "string" || !this.name.trim()) {
      errors.push("name is required and must be a non-empty string");
    }

    if (!this.email || typeof this.email !== "string" || !this.email.trim()) {
      errors.push("email is required");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)) {
      errors.push("email must be a valid email address");
    }

    return errors;
  }

  // Returns only the safe fields to persist
  toEntity() {
    return {
      name: this.name.trim(),
      email: this.email.trim().toLowerCase(),
    };
  }
}

module.exports = CreateUserDto;
