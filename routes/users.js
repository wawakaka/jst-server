var express = require('express');
var router = express.Router();
var models = require('../models');

router.get('/:idUser', getUser());
router.get('/all', getAllUser());
router.post('/create', createUser());
router.put('/:idUser/edit', editUser());

function getUser() {
  return function(req, res) {
    models.User.findById(req.params.idUser).then(function(users) {
      if (users) {
        res.status(200).json({
          status: 'success',
          message: 'new user added',
          data: users,
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

function getAllUser() {
  return function(req, res) {
    models.User.all({
      include: [
        {
          model: models.Kelas,
          as: 'kelas',
        }],
    }).then(function(users) {
      res.status(200).json({
        status: 'success',
        message: 'retrieve user',
        data: users,
      });
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
    }).then(function() {
      res.status(200).json({
        status: 'success',
        message: 'new user added',
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
