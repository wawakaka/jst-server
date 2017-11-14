var express = require('express');
var router = express.Router();
var models = require('../models');

router.get('/:email', getKelas());
router.post('/:email', createNewKelas());

function getKelas() {
  return function(req, res) {
    models.kelas.findAll({
      where: {
        UserEmail: req.params.email,
      },
      include: [
        {
          model: models.jadwal_kelas,
          as: 'jadwalKelas',
        },
        {
          model: models.siswa,
          as: 'siswa',
        },
        {
          model: models.sekolah,
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

function createNewKelas() {
  return function(req, res) {
    models.kelas.create(
        // {
        //   idKelas: null,
        //   isPrivate: req.body.isPrivate,
        //   BidangNamaBidang: req.body.BidangNamaBidang,
        //   UserEmail: req.body.UserEmail,
        //   jadwalKelas: {
        //     idJadwalKelas: null,
        //     tanggal: req.body.tanggal,
        //     KelaIdKelas: null,
        //   },
        //   siswa: req.body.siswa,
        //   Sekolahs: req.body.Sekolahs,
        // },
        req.body.kelas,
        {
          include: [
            {
              model: models.jadwal_kelas,
              as: 'jadwalKelas',
            },
            {
              model: models.siswa,
              as: 'siswa',
            },
            {
              model: models.sekolah,
            },
          ],
        }
    ).
        then(function(kelas) {
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
