const express = require('express');
const router = express.Router();
const isAuth = require('../middleware/isAuth');
const userController = require('../controllers/usersController');

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.post('/logout', userController.logoutUser);
router.get('/details', isAuth, userController.getUserDetails);
router.get('/details/id', userController.getUserDetailsFromId);
router.put('/update/:userId', userController.updateUser);

module.exports = router;
