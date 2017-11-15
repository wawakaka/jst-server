var express = require('express');
var router = express.Router();
var models = require('../models');

router.get('/:email', getKelas());
router.post('/:email', createNewKelas());

function getKelas() {
  return function(req, res) {
    models.kelas.findAll({
      where: {
        user_email: req.params.email,
      },
      include: [
        {
          model: models.jadwal_kelas,
          as: 'jadwal_kelas',
        },
        {
          model: models.siswa,
          as: 'siswa',
        },
      ],
    }).then(function(kelas) {
      if (kelas) {
        res.status(200).json({
          status: 'success',
          message: 'retrieve kelas',
          data: kelas,
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
    models.kelas.create(
        req.body.kelas,
        {
          include: [
            {
              model: models.jadwal_kelas,
              as: 'jadwal_kelas',
            },
            {
              model: models.siswa,
              as: 'siswa',
            },
          ],
        }
    ).then(function(kelas) {
      res.status(200).json({
        status: 'success',
        message: 'new kelas added',
        data: kelas,
      });
    }).catch(function(err) {
      res.send(err);
    });
  };
}

module.exports = router;
