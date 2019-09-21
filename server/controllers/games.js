const helper = require('../middleware/helper');
// const Users = require('../models/users.js');
const Games = require('../models/games');

class game {
  /**
   * get all available game
   * @param {object} req - api request
   * @param {object} res - api response
   * @param {function} next - next middleware function
   * @return {json}
   */
  static async getGames(req, res, next) {
    // get all games that are still pending
    const games = await Games.find({
      status: 'pending',
    })
      .populate('user', 'username');

    if (games.length < 1) {
      const err = new Error();
      err.message = 'No available game at the moment';
      err.statusCode = 200;
      return next(err);
    }

    return res.status(200).json({
      message: 'games available',
      games,
      statusCode: 200,
    });
  }

  /**
   * create game
   * @param {object} req - api request
   * @param {object} res - api response
   * @param {function} next - next middleware function
   * @return {json}
   */
  static async createGame(req, res, next) {
    const { description, question } = req.body;
    const token = helper(req);
    const createGame = new Games({
      user: token.id,
      description,
      question,
    });

    const result = await createGame.save();

    if (!result) {
      const err = new Error();
      err.message = 'Error occured';
      err.statusCode = 500;
      return next(err);
    }

    return res.status(201).json({
      message: 'game created',
      statusCode: 201,
    });
  }
}

module.exports = game;
