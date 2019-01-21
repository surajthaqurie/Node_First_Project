const express = require('express');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const userController = require('../controller/user.controller');

const router = express.Router();
router.get('/', userController.getUser);
router.post('/', userController.postUser);
router.put('/:id', userController.putUser);
router.delete('/:id',[auth,admin], userController.deleteUser); // if more than on authencation than we used [];
router.get('/:id',auth, userController.getUserById);

module.exports = router;