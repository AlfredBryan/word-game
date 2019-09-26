const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Users = require('../models/users.js');
const helper = require('../middleware/helper');

class user {
  /**
   * TODO: maybe add user image
   * create user account
   * @param {object} req - api request
   * @param {object} res - api response
   * @param {function} next - next middleware function
   * @return {json}
   */
  static async createAccount(req, res, next) {
    const {
      username,
      email,
      gender,
    } = req.body;
    let { password } = req.body;
    password = bcrypt.hashSync(password, 10);

    const data = new Users({
      username,
      email,
      gender,
      password,
    });
    const result = await data.save();

    if (!result) {
      const err = new Error();
      err.message = 'error occured';
      err.statusCode = 500;
      return next(err);
    }

    return res.status(201).json({
      message: 'user account created successfully',
      statusCode: 201,
    });
  }

  /**
   * Log user in
   * @param {object} req - api request
   * @param {object} res - api response
   * @param {function} next - next middleware function
   * @return {json}
   */
  static async loginUser(req, res, next) {
    const { email, password } = req.body;
    const result = await Users.findOne({
      email,
    });

    if (!result) {
      const err = new Error();
      err.message = 'invalid email or password';
      err.statusCode = 401;
      return next(err);
    }

    const compare = await bcrypt.compare(password, result.password);

    if (!compare) {
      const err = new Error();
      err.message = 'invalid email or password';
      err.statusCode = 401;
      return next(err);
    }

    // sign user token
    const token = jwt.sign({
      id: result.id,
      level: result.level,
    },
    process.env.SECRET_KEY, { expiresIn: '30d' });

    // unset user password
    result.password = undefined;

    return res.status(200).json({
      message: 'logged in',
      statusCode: 200,
      token,
      result,
    });
  }

  /**
   * get user profile
   * @param {object} req - api request
   * @param {object} res - api response
   * @param {function} next - next middleware function
   * @return {json}
   */
  static async getProfile(req, res, next) {
    const token = helper(req);
    const profile = await Users.findOne({
      _id: token.id,
    });

    if (!profile) {
      const err = new Error();
      err.message = 'User does not exist';
      err.statusCode = 404;
      return next(err);
    }
    profile.password = undefined;

    return res.status(201).json({
      message: 'User profile',
      profile,
      statusCode: 200,
    });
  }
}
module.exports = user;
