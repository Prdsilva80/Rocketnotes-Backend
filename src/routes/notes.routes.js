const { Router } = require("express");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const NotesController = require("../controllers/NotesController");

const notesRoutes = Router();

notesRoutes.use(ensureAuthenticated); // usa o middleware de authentication em todos os rotes
const notesController = new NotesController();

notesRoutes.get("/", notesController.index);
notesRoutes.post("/", notesController.create);
notesRoutes.get("/:id", notesController.show);
notesRoutes.delete("/:id", notesController.delete);

module.exports = notesRoutes;
