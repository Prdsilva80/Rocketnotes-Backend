const { Router } = require("express");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const UserAvatarController = require("../controllers/UserAvatarController");
const UserController = require("../controllers/UsersController");
const multer = require("multer");
const uploadConfig = require("../configs/upload");
const usersRoutes = Router();
const upload = multer(uploadConfig.MULTER);

function myMiddleware(request, response, next) {
  console.log("você passou pelo middleware");
  if (!request.body.isAdmin) {
    return response.json({ message: "User unathorized" });
  }
  next();
}
const userController = new UserController();
const userAvatarController = new UserAvatarController();

usersRoutes.post("/", userController.create);
usersRoutes.put("/", ensureAuthenticated, userController.update);
usersRoutes.patch(
  "/avatar",
  ensureAuthenticated,
  upload.single("avatar"),
  userAvatarController.update
);

module.exports = usersRoutes;
