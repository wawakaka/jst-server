var express = require('express');
var router = express.Router();
var models = require('../models');

router.get('/all', getAllSiswa());
router.post('/create', createSiswa());
router.put('/:idSiswa/edit', editSiswa());
router.put('/:idSiswa/update', updateSiswaStatus());

function getAllSiswa() {
  return function(req, res) {
    models.Siswa.all({
      include: [
        {
          model: models.HasilTesHarian,
          as: 'hasilTesHarian',
        }],
    }).then(function(siswas) {
      res.status(200).json({
        status: 'success',
        message: 'retrieve user',
        data: siswas,
      });
    }).catch(function(err) {
      res.send(err);
    });
  };
}

function createSiswa() {
  return function(req, res) {
    models.Siswa.create({
      nama: req.body.namaSiswa,
      kelas: req.body.kelas,
    }).then(function() {
      res.status(200).json({
        status: 'success',
        message: 'new siswa added',
      });
    }).catch(function(err) {
      res.send(err);
    });
  };
}

function editSiswa() {
  return function(req, res) {
    models.Siswa.findById(req.params.idSiswa).then(function(siswas) {
      if (siswas) {
        siswas.update({
          nama: req.body.namaSiswa,
          kelas: req.body.kelas,
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
}

function updateSiswaStatus() {
  return function(req, res) {

    models.Siswa.findById(req.params.idSiswa).then(function(siswas) {
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
