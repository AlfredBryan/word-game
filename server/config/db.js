const mongoose = require('mongoose');
let dbUrl;
if (process.env.NODE_ENV === 'production') dbUrl = '';

else dbUrl = 'mongodb://localhost:27017/word-game';


const connect = () => {
  mongoose.connect(dbUrl, {
    useNewUrlParser: true,
  })
    .then(() => console.log('DB on check'))
    .catch(err => console.log(err));
}

module.exports = connect;
