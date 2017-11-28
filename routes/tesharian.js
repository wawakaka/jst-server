var express = require('express');
var router = express.Router();
var models = require('../models');

router.get('/:id', getTesHarian());
router.put('/:id', updateTesHarian());

function getTesHarian() {
  return function(req, res) {
    models.tes_harian.findAll({
      where: {
        jadwal_kela_id: req.params.id,
      },
      include: [
        {
          model: models.hasil_tes_harian,
          as: 'hasil_tes_harian',
        },
      ],
    }).then(function(results) {
      if (results) {
        res.status(200).json({
          status: 'success',
          message: 'retrieve tes_harian',
          data: results,
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

function updateTesHarian() {
  return function(req, res) {
    models.tes_harian.findById(req.params.id).then(function(results) {
      if (results) {
        results.update(
            req.body.tes_harian
        );
        res.status(200).json({
          status: 'success',
          message: 'tes harian updated',
          data: true,
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
        message: 'error' + err,
      });
      res.send(err);
    });
  };
}

module.exports = router;
