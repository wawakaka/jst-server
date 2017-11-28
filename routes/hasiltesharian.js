var express = require('express');
var router = express.Router();
var models = require('../models');

router.get('/:id', getHasilTesHarian());
router.post('/:id', addHasilTesHarian());

function getHasilTesHarian() {
  return function(req, res) {
    models.hasil_tes_harian.findAll({
      where: {
        tes_harian_id: req.params.id,
      },
    }).then(function(results) {
      if (results) {
        res.status(200).json({
          status: 'success',
          message: 'retrieve hasil_tes_harian',
          data: results,
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
          message: 'error',
        });
      }
    }).catch(function(err) {
      res.json({
        status: 'failed',
        message: 'error' + err,
      });
      res.send(err);
    });
  };
}

function addHasilTesHarian() {
  return function(req, res) {
    models.hasil_tes_harian.create(
        req.body.hasil_tes_harian
    ).then(function(results) {
      if (results) {
        res.status(200).json({
          status: 'success',
          message: 'hasil_tes_harian created',
          data: true,
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
          message: 'error',
        });
      }
    }).catch(function(err) {
      res.json({
        status: 'failed',
        message: 'error' + err,
      });
      res.send(err);
    });
  };
}

module.exports = router;
