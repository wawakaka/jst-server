var express = require('express');
var router = express.Router();
var models = require('../models');

router.get('/:id', getHasilTesHarian());
router.post('/update/:id', updateHasilTesHarian());

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

function updateHasilTesHarian() {
  return function(req, res) {
    models.hasil_tes_harian.destroy({
      where: {
        tes_harian_id: req.params.id,
      },
    }).then(function(result1) {
      if (result1 || res.status(404)) {
        models.hasil_tes_harian.bulkCreate(
            req.body.hasil_tes_harian
        ).then(function(result) {
          if (res.status(200)) {
            res.status(200).json({
              status: 'success',
              message: 'hasil tes harian updated',
              data: true,
            });
          }
        }).catch(function(err) {
          res.json({
            status: 'failed to add',
            message: 'error ' + err,
          });
          res.send(err);
        });
      }
    }).catch(function(err) {
      res.json({
        status: 'failed to delete',
        message: 'error ' + err,
      });
      res.send(err);
    });
  };
}

module.exports = router;
