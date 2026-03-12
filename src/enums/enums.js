// Plain JS enums using frozen objects (prevents accidental mutation)
const Role = Object.freeze({
  ADMIN: "admin",
  USER: "user",
});

module.exports = { Role };
 