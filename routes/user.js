let express = require('express'),
  router = express.Router(),
  object = require('../modules/objectsAndTypes'),
  crypto = require('crypto');

router.get('/:id', passport.authenticate('bearer', { session: false }), (req, res, next) => {
  object.get('User', req.params.id, 1)
    .then(response => {
      res.json({ status: true, content: response });
    })
    .catch(response => {
      res.json({ status: false, content: response });
    });
});

router.post('/save', (req, res, next) => {
  console.log(req.body);
  object.save([
<<<<<<< HEAD
    'email', 'password', 'firstName', 'lastName'
  ], req.query, 'User')
=======
    'email', 'password', 'firstName', 'lastName', 'birthday'
  ], req.query, 'user')
>>>>>>> 5a4134c258fa6317c3ded0c07583422cdafc37dd
    .then(response => {
      res.json({ status: true, content: response });
    })
    .catch(response => {
      res.json({ status: false, content: response });
    });
});

router.put('/save/:id', passport.authenticate('bearer', { session: false }), (req, res, next) => {
  let values = req.query;
  values.id = req.params.id;
  object.update([
<<<<<<< HEAD
    'email', 'password', 'firstName', 'lastName'
=======
    'email', 'token', 'password', 'firstName', 'lastName', 'birthday'
>>>>>>> 5a4134c258fa6317c3ded0c07583422cdafc37dd
  ], values, 'User')
    .then(response => {
      res.json({ status: true, content: response });
    })
    .catch(response => {
      res.json({ status: false, content: response });
    });
});

router.delete('/delete/:id', passport.authenticate('bearer', { session: false }), (req, res, next) => {
  object.delete('User', req.params.id)
    .then(response => {
      res.json({ status: true, content: response });
    })
    .catch(response => {
      res.json({ status: false, content: response });
    });
});

router.post('/login', (req, res, next) => {
  const password = crypto.createHmac('sha256', config.crypto.salt)
    .update(req.query.password)
    .digest('hex');

  models.User.findOne({
    where: {
      email: req.query.email,
      password: password,
    }
  }).then(user => {
    if (user) {
      const token = crypto.createHmac('sha256', config.crypto.salt)
        .update(`${user.id}-${user.email}-${Math.random()}`)
        .digest('hex')

      user.token = token;
      user.save();
      res.json({ status: true, content: user });
    } else {
      res.json({ status: false, content: 'usuario no esta' });
    }
  }).catch(message => {
    res.json({ status: false, content: 'error' });
  });
});

router.post('/logout', passport.authenticate('bearer', { session: false }), (req, res, next) => {
  req.session.user.token = null;
  req.session.user.save();
  res.json({ status: true, content: 'adios' });
});

module.exports = router;
