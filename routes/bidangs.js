var express = require('express');
var router = express.Router();
var models = require('../models');

router.get('/all', getBidang());
router.post('/create', createBidang());

function getBidang() {
  return function(req, res) {
    models.Bidang.all().then(function(bidangs) {
      res.status(200).json({
        status: 'success',
        message: 'retrieve bidang',
        data: bidangs,
      });
    }).catch(function(err) {
      res.send(err);
    });
  };
}

function createBidang() {
  return function(req, res) {
    models.Bidang.create({
      nama: req.body.nama,
    }).then(function() {
      res.status(200).json({
        status: 'success',
        message: 'new bidang added',
      });
    }).catch(function(err) {
      res.send(err);
    });
  };
}

module.exports = router;
