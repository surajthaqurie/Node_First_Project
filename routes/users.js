const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller');

router.get('/', userController.getUser);
router.post('/', userController.postUser);
router.put('/:id', userController.putUser);
router.delete('/:id', userController.deleteUser);
router.get('/:id', userController.getUserById);
exports = router;