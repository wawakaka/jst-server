var express = require('express');
var router = express.Router();
var models = require('../models');

router.get('/:email', getKelas());

function getKelas() {
  return function(req, res) {
    models.Kelas.find({
      where: {
        UserEmail: req.params.email,
      },
      include: [
        {
          model: models.JadwalKelas,
          as: 'jadwalKelas',
        },
        {
          model: models.Siswa,
          as: 'siswa',
        },
        {
          model: models.Sekolah,
        },
      ],
    }).then(function(users) {
      if (users) {
        res.status(200).json({
          status: 'success',
          message: 'retrieve kelas',
          data: users,
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
