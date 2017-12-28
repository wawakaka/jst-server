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

function getBidang() {
  return function(req, res) {
    if (req.user.length >= 1) {
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

function createBidang() {
  return function(req, res) {
    if (req.user.length >= 1) {
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
