require("express-async-errors");
require("dotenv/config");
const AppError = require("./utils/AppError");
const express = require("express");
const migrationsRun = require("./database/sqlite/migrations");
const uploadConfig = require("./configs/upload");
const routes = require("./routes");
const cors = require("cors");

const app = express(); // PORT LISTEN... 8080,8333,8004
app.use(cors());
app.use(express.json()); // Padrão no corpo da request é JSON
app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER));
app.use(routes);

migrationsRun(); //start Database
app.use((error, request, response, next) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message,
    });
  }

  console.error(error);
  return response.status(500).json({
    status: "error",
    message: "Internal server error",
  });
});

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));
