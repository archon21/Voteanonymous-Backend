const router = require('express').Router();
const User = require('../db/models/user');
module.exports = router;

router.post('/login', (req, res, next) => {
  const { userData } = req.body;
  User.findOne({ where: { email: userData.email } })
    .then(user => {
      if (!user) {
        console.log('No such user found:', userData.email);
        res.status(401).send('Wrong username and/or password');
      } else if (!user.correctPassword(userData.password)) {
        console.log('Incorrect password for user:', userData.email);
        res.status(401).send('Wrong username and/or password');
      } else {
        req.login(user, err => (err ? next(err) : res.json(user)));
      }
    })
    .catch(next);
});

router.post('/signup', (req, res, next) => {
  const { userData } = req.body;
  User.create(userData)
    .then(user => {
      req.login(user, err => (err ? next(err) : res.json(user)));
    })
    .catch(err => {
      if (err.name === 'SequelizeUniqueConstraintError') {
        res.status(401).send('User already exists');
      } else {
        next(err);
      }
    });
});

router.post('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.sendStatus(200);
});

router.get('/me', (req, res) => {
  res.json(req.user);
});

// router.use('/google', require('./google'))
