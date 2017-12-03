var express = require('express');
var router = express.Router();
var models = require('../models');

router.get('/all', getAllSiswa());
router.get('/:idSiswa', getSiswaById());
router.post('/create', createSiswa());
router.put('/:idSiswa/edit', editSiswa());
router.put('/:idSiswa/update', updateStatusSiswa());

function getAllSiswa() {
  return function(req, res) {
    models.siswa.findAll({
      include: [
        {
          model: models.hasil_tes_harian,
          as: 'hasil_tes_harian',
        },
        {
          model: models.laporan_akhir,
          as: 'laporan_akhir',
        },
      ],
    }).then(function(siswas) {
      if (siswas) {
        res.status(200).json({
          status: 'success',
          message: 'retrieve kelas',
          data: siswas,
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

function getSiswaById() {
  return function(req, res) {
    models.siswa.findOne({
      where: {
        id: req.params.idSiswa,
      },
      include: [
        {
          model: models.hasil_tes_harian,
          as: 'hasil_tes_harian',
        },
        {
          model: models.laporan_akhir,
          as: 'laporan_akhir',
        },
      ],
    }).then(function(siswas) {
      if (siswas) {
        res.status(200).json({
          status: 'success',
          message: 'retrieve kelas',
          data: siswas,
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

function createSiswa() {
  return function(req, res) {
    models.siswa.create(
        req.body.siswa,
        {
          include: [
            {
              model: models.sekolah,
            },
          ],
        }
    ).then(function(siswas) {
      res.status(200).json({
        status: 'success',
        message: 'new siswa added',
        data: siswas,
      });
    }).catch(function(err) {
      res.send(err);
    });
  };
}

function editSiswa() {
  return function(req, res) {
    models.siswa.findById(req.params.id).then(function(siswas) {
      if (siswas) {
        siswas.update(
            req.body.siswa,
            {
              include: [
                {
                  model: models.hasil_tes_harian,
                  as: 'hasil_tes_harian',
                },
                {
                  model: models.laporan_akhir,
                  as: 'laporan_akhir',
                },
              ],
            }
        );
      }
      else {
        res.status(404).json({
          status: 'failed',
          message: 'not found',
        });
      }
    }).catch(function(err) {
      res.send(err);
    });
  };
}

function updateStatusSiswa() {
  return function(req, res) {
    models.siswa.findById(req.params.id).then(function(siswas) {
      if (siswas) {
        siswas.update({
          active: false,
        });
        res.status(200).json({
          status: 'success',
          message: 'Siswa updated',
        });
      }
      else {
        res.status(404).json({
          status: 'failed',
          message: 'not found',
        });
      }
    }).catch(function(err) {
      res.send(err);
    });
  };
};

module.exports = router;
