var express = require('express');
var passport = require('passport');
var router = express.Router();
var models = require('../models');

router.get(
    '/all',
    passport.authenticate('bearer', {session: false}),
    getAllSiswa()
);
router.get(
    '/:idSiswa',
    passport.authenticate('bearer', {session: false}),
    getSiswaById()
);
router.post(
    '/create',
    passport.authenticate('bearer', {session: false}),
    createSiswa()
);
router.put(
    '/:idSiswa/update',
    passport.authenticate('bearer', {session: false}),
    editSiswa()
);
router.put(
    '/:id/updatestatus',
    passport.authenticate('bearer', {session: false}),
    updateStatusSiswa()
);

function getAllSiswa() {
  return function(req, res) {
    if (req.user.length >= 1 && req.user[0].dataValues.is_super_user === true) {
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
    } else if (req.user.length < 1) {
      res.status(401).json({
        status: 'failed',
        message: 'authorization error',
      });
    } else {
      res.json({
        status: 'failed',
        message: 'error',
      });
    }
  };
}

function getSiswaById() {
  return function(req, res) {
    if (req.user.length >= 1 && req.user[0].dataValues.is_super_user === true) {
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
    } else if (req.user.length < 1) {
      res.status(401).json({
        status: 'failed',
        message: 'authorization error',
      });
    } else {
      res.json({
        status: 'failed',
        message: 'error',
      });
    }
  };
}

function createSiswa() {
  return function(req, res) {
    if (req.user.length >= 1 && req.user[0].dataValues.is_super_user === true) {
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
    } else if (req.user.length < 1) {
      res.status(401).json({
        status: 'failed',
        message: 'authorization error',
      });
    } else {
      res.json({
        status: 'failed',
        message: 'error',
      });
    }
  };
}

function editSiswa() {
  return function(req, res) {
    if (req.user.length >= 1 && req.user[0].dataValues.is_super_user === true) {
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
    } else if (req.user.length < 1) {
      res.status(401).json({
        status: 'failed',
        message: 'authorization error',
      });
    } else {
      res.json({
        status: 'failed',
        message: 'error',
      });
    }
  };
}

function updateStatusSiswa() {
  return function(req, res) {
    if (req.user.length >= 1 && req.user[0].dataValues.is_super_user === true) {
      models.siswa.findById(req.params.id).then(function(siswas) {
        if (siswas) {
          siswas.update({
            is_active: !siswas.is_active,
          });
          res.status(200).json({
            status: 'success',
            message: 'Siswa updated',
            data: true,
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
    } else if (req.user.length < 1) {
      res.status(401).json({
        status: 'failed',
        message: 'authorization error',
      });
    } else {
      res.json({
        status: 'failed',
        message: 'error',
      });
    }
  };
};

module.exports = router;
