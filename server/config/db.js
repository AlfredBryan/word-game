let dbURL;
if (process.env.NODE_ENV === 'production') dbURL = '';

else dbURL = 'mongodb://localhost:27017/word-game';


const connect = () {
  mongoose.connect(dbUrl, {
    useNewUrlParser: true,
  })
    .then(() => console.log('DB on check'))
    .catch(err => console.log(err));
}

module.exports = connect;
