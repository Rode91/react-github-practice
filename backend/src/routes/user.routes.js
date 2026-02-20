const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { validateCreateUser } = require('../middlewares/user.validator');

router.get('/', userController.getUsers);
router.post('/', validateCreateUser, userController.createUser);

module.exports = router;
