const router = require('express').Router();
const validator = require('../middleware/validator');
const authenticate = require('../middleware/authentication');
const userController = require('../controllers/user');
const gameController = require('../controllers/games');
const url = '/api/v1';

// REGISTRATION
router
  .route(`${url}/register`)
  .post(
    validator.checkBodyContains('email', 'username', 'gender', 'password', 'password2'),
    validator.checkBodyNotEmpty('username', 'email', 'gender', 'password', 'password2'),
    validator.checkBodyValidString('username', 'gender'),
    validator.checkBodyMinValue(3, 'username'),
    validator.checkBodyMinValue(4, 'gender'),
    validator.checkBodyMinValue(6, 'password'),
    validator.checkBodyMaxValue(30, 'username', 'password'),
    validator.checkBodyMaxValue(6, 'gender'),
    validator.checkGenderValid,
    validator.checkEmailValid,
    validator.checkUserNameExists,
    validator.checkEmailExists,
    validator.checkPasswordsMatch,
    userController.createAccount,
  );

// LOGIN
router
  .route(`${url}/login`)
  .post(
    validator.checkBodyContains('email', 'password'),
    validator.checkBodyNotEmpty('email', 'password'),
    validator.checkEmailValid,
    userController.loginUser,
);

// AVAILABLE GAMES
router
  .route(`${url}/games`)
  .get(
    authenticate.checkTokenExists,
    authenticate.checkTokenValid,
    gameController.getGames,
  );


  // CREATe GAME
router
  .route(`${url}/game`)
  .post(
    authenticate.checkTokenExists,
    authenticate.checkTokenValid,
    validator.checkBodyMaxValue(10, 'question'),
    gameController.createGame,
);
  
// Join GAME

// TODO: validate incoming game id

router
  .route(`${url}/join/:gameId`)
  .get(
    authenticate.checkTokenExists,
    authenticate.checkTokenValid,
    gameController.joinGame
  );

module.exports = router;
