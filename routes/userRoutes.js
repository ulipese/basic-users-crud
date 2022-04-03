const router = require("express").Router();
const controller = require("../controllers/UserControllers");

router
  .get("/", controller.get)
  .get("/adm", controller.getAdm)
  .post("/adm", controller.postAdm)
  .get("/user", controller.getUser)
  .post("/user", controller.postUser)
  .get("/users", controller.getUsers)
  .post("/users", controller.updateUser)
  .get("/users/:userId", controller.getOneUser)
  .post("/users/delete", controller.delete);

module.exports = router;
