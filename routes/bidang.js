var express = require('express');
var passport = require('passport');
var router = express.Router();
var models = require('../models');

router.get(
    '/all',
    passport.authenticate('bearer', {session: false}),
    getBidang()
);
router.post(
    '/create',
    passport.authenticate('bearer', {session: false}),
    createBidang()
);
router.delete(
    '/:nama/delete',
    passport.authenticate('bearer', {session: false}),
    deleteBidang()
);

function getBidang() {
  return function(req, res) {
    if (req.user.length >= 1 && req.user[0].dataValues.is_super_user === true) {
      models.bidang.findAll().then(function(results) {
        res.status(200).json({
          status: 'success',
          message: 'retrieve bidang',
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

function createBidang() {
  return function(req, res) {
    if (req.user.length >= 1 && req.user[0].dataValues.is_super_user === true) {
      models.bidang.create(
          req.body.bidang
      ).then(function() {
        res.status(200).json({
          status: 'success',
          message: 'new bidang added',
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

function deleteBidang() {
  return function(req, res) {
    if (req.user.length >= 1 && req.user[0].dataValues.is_super_user === true) {
      models.bidang.destroy({
        where: {
          nama: req.params.nama,
        },
      }).then(function(bidang) {
        if (bidang) {
          res.status(200).json({
            status: 'success',
            message: 'bidang deleted',
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
