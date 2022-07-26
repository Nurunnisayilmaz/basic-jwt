const express = require('express');
const router = express.Router();

const {register,login,test} = require('../controllers/controller');
const {checkJwt} = require('../middlewares/authentication/auth')
const {checkpassword} = require('../middlewares/bcrypt/bcrypt')

router.post('/register', register);
router.post('/login',checkpassword, login);
router.post('/test',checkJwt,test);

module.exports = router;