// DTO for POST /auth/login

// Use the keyword class to create a class.

// Always add a method named constructor():
class LoginDto {
  constructor({ email, password }) {
    this.email = email;
    this.password = password;
  }

  validate() {
    const errors = [];

    if (!this.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email))
      errors.push("a valid email is required");

    if (!this.password)
      errors.push("password is required");

    return errors;
  }
}

module.exports = LoginDto;
