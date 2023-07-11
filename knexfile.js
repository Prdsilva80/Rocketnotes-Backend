const path = require("path");

module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: path.resolve(__dirname, "src", "database", "database.db"),
    },

    pool: {
      afterCreate: (conn, cb) => conn.run("PRAGMA foreing_keys = OK", cb), //CallBACK cb CONNECTION CONN
    },

    migrations: {
      directory: path.resolve(
        __dirname,
        "src",
        "database",
        "knex",
        "migrations"
      ),
    },

    useNullAsDefault: true,
  },
};
