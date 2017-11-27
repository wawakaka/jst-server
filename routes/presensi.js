var express = require('express');
var router = express.Router();
var models = require('../models');
var db = require('../rawqueries/queries');

router.get('/:id', getPresensi());
router.post('/add', db.addNewPresensi());

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

module.exports = router;
