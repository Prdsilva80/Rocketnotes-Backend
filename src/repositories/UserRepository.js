const sqliteConnection = require("../database/sqlite");

class UserRepository {
  async findByEmail(email) {
    const database = await sqliteConnection();
    const user = await database.get("SELECT * FROM users WHERE email = (?)", [
      email,
    ]); // (?) busca o vetor seguinte
    return user;
  }

  async create({ name, email, password }) {
    const database = await sqliteConnection();

    const userId = await database.run(
      "INSERT INTO users (name,email,password) VALUES (?,?,?)",
      [name, email, password]
    ); // SQL with JS

    return { id: userId };
  }
}

module.exports = UserRepository;
