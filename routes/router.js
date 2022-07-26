const express = require('express');
const router = express.Router();

const {register,login,test} = require('../controllers/controller');
const {checkJwt} = require('../middlewares/authentication/auth')

router.post('/register', register);
router.post('/login', login);
router.post('/test',checkJwt,test);

module.exports = router;