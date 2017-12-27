var express = require('express');
var router = express.Router();
var models = require('../models');

router.get('/:id', getUpdatedTesHarian());
router.post('/:id', getTesHarian());
router.put('/:id', updateTesHarian());

function getUpdatedTesHarian() {
  return function(req, res) {
    models.tes_harian.find({
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
      } else {
        res.json({
          status: 'failed',
          message: 'error',
        });
      }
    }).catch(function(err) {
      res.json({
        status: 'failed',
        message: 'error ' + err,
      });
      res.send(err);
    });
  };
}

function getTesHarian() {
  return function(req, res) {
    models.tes_harian.find({
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
      else if (res.status(404)) {
        models.tes_harian.create(
            req.body.tes_harian,
            {
              include: [
                {
                  model: models.hasil_tes_harian,
                  as: 'hasil_tes_harian',
                },
              ],
            }
        ).then(function(results) {
          res.status(200).json({
            status: 'success',
            message: 'new tes harian added',
            data: results,
          });
        }).catch(function(err) {
          res.json({
            status: 'failed',
            message: 'error' + err,
          });
          res.send(err);
        });
      }
      else {
        res.json({
          status: 'failed',
          message: 'error',
          data: results,
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
