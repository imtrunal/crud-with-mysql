const router = require("express").Router();
const userController = require("../controllers/user.controller");

router.post('/insert', userController.insertUser);
router.post("/update/:id", userController.updateUser);
router.get("/list", userController.viewData);
router.get("/profile/:id", userController.viewUserDetails);
router.delete("/delete/:id", userController.deleteUser);

module.exports = router;