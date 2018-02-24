var express = require('express');
var passport = require('passport');
var router = express.Router();
var models = require('../models');

router.get(
    '/all',
    passport.authenticate('bearer', {session: false}),
    getSekolah()
);
router.post(
    '/create',
    passport.authenticate('bearer', {session: false}),
    createSekolah()
);
router.delete(
    '/:nama/delete',
    passport.authenticate('bearer', {session: false}),
    deleteSekolah()
);

function getSekolah() {
  return function(req, res) {
    if (req.user.length >= 1 && req.user[0].dataValues.is_super_user === true) {
      models.sekolah.findAll().then(function(results) {
        res.status(200).json({
          status: 'success',
          message: 'retrieve sekolah',
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

function createSekolah() {
  return function(req, res) {
    if (req.user.length >= 1 && req.user[0].dataValues.is_super_user === true) {
      models.sekolah.create(
          req.body.sekolah
      ).then(function() {
        res.status(200).json({
          status: 'success',
          message: 'new sekolah added',
          data: true,
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

function deleteSekolah() {
  return function(req, res) {
    if (req.user.length >= 1 && req.user[0].dataValues.is_super_user === true) {
      models.sekolah.destroy({
        where: {
          nama: req.params.nama,
        },
      }).then(function(bidang) {
        if (bidang) {
          res.status(200).json({
            status: 'success',
            message: 'sekolah deleted',
            data: true,
          });
        } else {
          res.status(404).json({
            status: 'failed',
            message: 'not found ',
          });
        }
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

module.exports = router;
