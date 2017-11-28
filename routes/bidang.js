var express = require('express');
var router = express.Router();
var models = require('../models');

router.get('/all', getBidang());
router.post('/create', createBidang());

function getBidang() {
  return function(req, res) {
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
  };
}

function createBidang() {
  return function(req, res) {
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
  };
}

module.exports = router;
