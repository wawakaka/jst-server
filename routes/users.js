var express = require('express');
var router = express.Router();
var models = require('../models');

router.post('/login/:email', login());
router.get('/email/:email', getUserByEmail());
router.post('/create', createUser());
router.put('/:idUser/edit', editUser());

function login() {
  return function(req, res) {
    models.User.findById(req.params.email).then(function(users) {
      if (users) {
        res.status(200).json({
          status: 'success',
          message: 'login success',
          data: users,
        });
      }
      else if (res.status(404)) {
        models.User.create({
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

function getUserByEmail() {
  return function(req, res) {
    models.User.findById(req.params.email).then(function(users) {
      if (users) {
        res.status(200).json({
          status: 'success',
          message: 'retrieve user',
          data: users,
        });
      }
      else if (res.status(404)) {
        res.status(404).json({
          message: 'not found',
        });
      }
      else {
        res.json({
          status: 'failed',
          message: 'not found',
        });
      }
    }).catch(function(err) {
      res.send(err);
    });
  };
}

function createUser() {
  return function(req, res) {
    models.User.create({
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

function editUser() {
  return function(req, res) {
    models.User.findById(req.params.idUser).then(function(users) {
      if (users) {
        users.update({
          nama: req.body.nama,
        });
        res.status(200).json({
          status: 'success',
          message: 'user updated',
        });
      }
      else {
        res.status(404).json({
          status: 'failed',
          message: 'not found',
        });
      }
    }).catch(function(err) {
      res.send(err);
    });
  };
}

module.exports = router;
