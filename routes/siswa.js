var express = require('express');
var router = express.Router();
var models = require('../models');

router.get('/all', getAllSiswa());
router.post('/create', createSiswa());
router.put('/:idSiswa/edit', editSiswa());
router.put('/:idSiswa/update', updateStatusSiswa());

function getAllSiswa() {
  return function(req, res) {
    models.Siswa.findAll({
      include: [
        {
          model: models.hasiltestharian,
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
      nama: req.body.nama_siswa,
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
    models.Siswa.findById(req.params.id).then(function(siswas) {
      if (siswas) {
        siswas.update({
          nama: req.body.nama_siswa,
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

function updateStatusSiswa() {
  return function(req, res) {
    models.Siswa.findById(req.params.id).then(function(siswas) {
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
