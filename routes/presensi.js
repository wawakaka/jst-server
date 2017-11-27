var express = require('express');
var router = express.Router();
var models = require('../models');

router.get('/:id', getPresensi());
router.post('/update/:id', updatePresensi());

function getPresensi() {
  return function(req, res) {
    models.presensi.findAll({
      where: {
        jadwal_kela_id: req.params.id,
      },
    }).then(function(results) {
      if (results) {
        res.status(200).json({
          status: 'success',
          message: 'retrieve presensi',
          data: results,
        });
      }
      else if (res.status(404)) {
        res.status(404).json({
          status: 'failed',
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

function updatePresensi() {
  return function(req, res) {
    models.presensi.destroy({
      where: {
        jadwal_kela_id: req.params.id,
      },
    }).then(function(result1) {
      if (result1 || res.status(404)) {
        models.presensi.bulkCreate(
            req.body.presensi
        ).then(function(result) {
          if (res.status(200)) {
            res.status(200).json({
              status: 'success',
              message: 'presensi updated',
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
