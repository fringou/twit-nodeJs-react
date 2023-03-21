const router = require('express').Router();
const authController = require('../controllers/auth.controller');
const userController = require('../controllers/user.controller');

//auth
router.post('/register', authController.signUp);
router.post('/login', authController.signIn);
router.get('/logout', authController.logout);

//user DB
router.get('/', userController.getAllUsers);

router.get('/:id', userController.userInfo);
router.put('/:id', userController.upDateUser);
router.delete('/:id', userController.deleteUser);

router.patch('/follow/:id', userController.follow);
router.patch('/unfollow/:id', userController.unfollow);

router.patch('/:id/like', userController.like);
router.patch('/:id/unlike', userController.unlike);

module.exports = router;