const path = require('path');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const compression = require('compression');
const session = require('express-session');
const passport = require('passport');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const db = require('./db');
const sessionStore = new SequelizeStore({ db });
const PORT = process.env.PORT || 8080;
const app = express();
const Blockchain = require('./classes/blockchain');
const TransactionPool = require('./classes/wallet/transaction-pool');
const P2pServer = require('./classes/app/p2p-server');

const tp = new TransactionPool();
const bc = new Blockchain();
const p2pServer = new P2pServer(bc, tp);

module.exports = { app, tp, bc, p2pServer };

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) =>
  db.models.user

    .findById(id)
    .then(user => done(null, user))
    .catch(done));

const createApp = () => {
  app.use(morgan('dev'));

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(compression());

  app.use(
    session({
      secret: process.env.SESSION_SECRET || 'my best friend is Cody',
      store: sessionStore,
      resave: false,
      saveUninitialized: false
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());

  app.use('/auth', require('./auth'));
  app.use('/api', require('./api'));

  app.use(express.static(path.join(__dirname, '..', 'public')));

  app.use((req, res, next) => {
    if (path.extname(req.path).length) {
      const err = new Error('Not found');
      err.status = 404;
      next(err);
    } else {
      next();
    }
  });

  app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public/index.html'));
  });

  app.use((err, req, res, next) => {
    console.error(err);
    console.error(err.stack);
    res.status(err.status || 500).send(err.message || 'Internal server error.');
  });
};

const startListening = () => {
  app.listen(PORT, () => console.log(`All clear on ${PORT}`));

  p2pServer.listen();
};

const syncDb = () => db.sync();

if (require.main === module) {
  sessionStore
    .sync()
    .then(syncDb)
    .then(createApp)
    .then(startListening);
} else {
  createApp();
}
