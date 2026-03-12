// DTO for POST /auth/register
const { Role } = require("../enums/enums");

class RegisterDto {
  constructor({ name, email, password, role }) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.role = role || Role.USER; // default to "user"
  }

  validate() {
    const errors = [];

    if (!this.name || !this.name.trim())
      errors.push("name is required");

    if (!this.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email))
      errors.push("a valid email is required");

    if (!this.password || this.password.length < 6)
      errors.push("password must be at least 6 characters");

    const validRoles = Object.values(Role);
    if (!validRoles.includes(this.role))
      errors.push(`role must be one of: ${validRoles.join(", ")}`);

    return errors;
  }

  toEntity() {
    return {
      name: this.name.trim(),
      email: this.email.trim().toLowerCase(),
      password: this.password, // will be hashed in repository
      role: this.role,
    };
  }
}

module.exports = RegisterDto;
