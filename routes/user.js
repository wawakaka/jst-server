var express = require('express');
var passport = require('passport');
var router = express.Router();
var models = require('../models');

router.post('/login/:email', login());
router.post('/create', createUser());
router.put(
    '/:email',
    passport.authenticate('bearer', {session: false}),
    updateUser()
);
router.put(
    '/:email/activate',
    passport.authenticate('bearer', {session: false}),
    activateUser()
);
router.get(
    '/all',
    passport.authenticate('bearer', {session: false}),
    getAllUser()
);
//this is just example
router.get(
    '/:email',
    passport.authenticate('bearer', {session: false}),
    getUserByEmail()
);

function login() {
  return function(req, res) {
    models.user.findById(
        req.params.email
    ).then(function(users) {
      if (users) {
        res.status(200).json({
          status: 'success',
          message: 'login success',
          data: users,
        });
      }
      else if (res.status(404)) {
        models.user.create({
          nama: req.body.nama,
          email: req.body.email,
        }).then(function(users) {
          res.status(200).json({
            status: 'success',
            message: 'new user added',
            data: users,
          });
        }).catch(function(err) {
          res.send(err);
        });
      }
      else {
        res.json({
          status: 'failed',
          message: 'login failed',
        });
      }
    }).catch(function(err) {
      res.send(err);
    });
  };
}

function createUser() {
  return function(req, res) {
    models.user.create({
      nama: req.body.nama,
      email: req.body.email,
    }).then(function(users) {
      res.status(200).json({
        status: 'success',
        message: 'new user added',
        data: users,
      });
    }).catch(function(err) {
      res.send(err);
    });
  };
}

function updateUser() {
  return function(req, res) {
    if (req.user.length >= 1) {
      models.user.findById(req.params.email).then(function(users) {
        if (users) {
          users.update({
            nama: req.body.nama,
          }).then(function() {
            res.status(200).json({
              status: 'success',
              message: 'user updated',
            });
          });
        }
        else {
          res.status(404).json({
            status: 'failed',
            message: 'not found',
          });
        }
      }).catch(function(err) {
        res.json({
          status: 'failed',
          message: 'error ' + err,
        });
        res.send(err);
      });
    } else if (req.user.length < 1) {
      res.status(401).json({
        status: 'failed',
        message: 'authorization error',
      });
    } else {
      res.json({
        status: 'failed',
        message: 'error',
      });
    }
  };
}

function activateUser() {
  return function(req, res) {
    if (req.user.length >= 1 && req.user[0].dataValues.is_super_user === true) {
      models.user.findById(req.params.email).then(function(users) {
        if (users) {
          users.update({
            is_active: !users.is_active,
          }).then(function() {
            res.status(200).json({
              status: 'success',
              message: 'user is activated now',
            });
          });
        }
        else {
          res.status(404).json({
            status: 'failed',
            message: 'not found',
          });
        }
      }).catch(function(err) {
        res.json({
          status: 'failed',
          message: 'error ' + err,
        });
        res.send(err);
      });
    } else if (req.user.length < 1
        || req.user[0].dataValues.is_super_user === false) {
      res.status(401).json({
        status: 'failed',
        message: 'authorization error',
      });
    } else {
      res.json({
        status: 'failed',
        message: 'error',
      });
    }
  };
}

function getAllUser() {
  return function(req, res) {
    if (req.user.length >= 1 && req.user[0].dataValues.is_super_user === true) {
      models.user.findAll().then(function(results) {
        res.status(200).json({
          status: 'success',
          message: 'retrieve user',
          data: results,
        });
      }).catch(function(err) {
        res.json({
          status: 'failed',
          message: 'error ' + err,
        });
        res.send(err);
      });
    } else if (req.user.length < 1 ||
        req.user[0].dataValues.is_super_user === false) {
      res.status(401).json({
        status: 'failed',
        message: 'authorization error',
      });
    } else {
      res.json({
        status: 'failed',
        message: 'error',
      });
    }
  };
}

//todo this is example of using bearer token
function getUserByEmail() {
  return function(req, res) {
    if (req.user.length >= 1) {
      res.status(200).json({
        status: 'success',
        message: 'user exist',
        data: req.user,
      });
    } else if (req.user.length < 1) {
      res.status(401).json({
        status: 'failed',
        message: 'authorization error',
      });
    } else {
      res.json({
        status: 'failed',
        message: 'error',
      });
    }
  };
}

module.exports = router;
