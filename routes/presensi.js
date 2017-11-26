var express = require('express');
var router = express.Router();
var models = require('../models');

router.get('/:id', getPresensi());
router.post('/add', createNewKelas());

function getPresensi() {
  return function(req, res) {
    models.sequelize.query(
        'SELECT "jadwal_kela_id", "siswa_id" FROM "presensi" WHERE "jadwal_kela_id" = ' +
        req.params.id,
        {type: models.sequelize.QueryTypes.SELECT}).then(function(results) {
      if (results) {
        res.status(200).json({
          status: 'success',
          message: 'retrieve presensi',
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
      res.send(err);
    });
  };
}

function createNewKelas() {
  return function(req, res) {
    models.sequelize.query(
        'INSERT INTO "presensi" ( "jadwal_kela_id", "siswa_id") VALUES ( ' +
        req.body.jadwal_kela_id + ',\'' + req.body.siswa_id + '\' )',
        {type: models.sequelize.QueryTypes.INSERT}).then(function(results) {
      res.status(200).json({
        status: 'success',
        message: 'presensi added',
        data: results,
      });
    }).catch(function(err) {
      res.send(err);
    });
  };
}

module.exports = router;
