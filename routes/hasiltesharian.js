var express = require('express');
var router = express.Router();
var models = require('../models');

router.get('/all', getAllHasilTesHarian());

function getAllHasilTesHarian() {
  return function(req, res) {
    models.hasil_tes_harian.findAll().then(function(results) {
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
      res.send(err);
    });
  };
}

module.exports = router;
