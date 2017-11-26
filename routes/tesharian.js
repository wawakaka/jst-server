var express = require('express');
var router = express.Router();
var models = require('../models');

router.get('/all', getAllTesHarian());

function getAllTesHarian() {
  return function(req, res) {
    models.tes_harian.findAll({
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
      res.send(err);
    });
  };
}

module.exports = router;
