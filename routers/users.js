const router = require('express').Router();
const auth = require('../controllers/auth');
const {verifyToken } = require('../middleware');
const {
  validateSignupRequest,
  authRequestValidated,
  validateSigninRequest,
} = require('../validators/auth');

router.post(
  '/joinin',
  validateSignupRequest,
  authRequestValidated,
  auth.signup
);
router.post(
  '/login',
  validateSigninRequest,
  authRequestValidated,
  auth.signin
);
router.post('/logout', verifyToken, auth.signout);





module.exports = router;
