const express = require('express');
const passport = require('passport');
const router = express.Router();
const models = require('../models');
const Json2csvParser = require('json2csv').Parser;
const fields = ['id', 'nama', 'kelas', 'is_active'];
const json2csvParser = new Json2csvParser({fields});

router.get('/download',
    passport.authenticate('bearer', {session: false}),
    downloadCsv());
router.get(
    '/all',
    passport.authenticate('bearer', {session: false}),
    getAllSiswa(),
);
router.get(
    '/:idSiswa',
    passport.authenticate('bearer', {session: false}),
    getSiswaById(),
);
router.post(
    '/create',
    passport.authenticate('bearer', {session: false}),
    createSiswa(),
);
router.put(
    '/:idSiswa/update',
    passport.authenticate('bearer', {session: false}),
    editSiswa(),
);
router.put(
    '/:id/updatestatus',
    passport.authenticate('bearer', {session: false}),
    updateStatusSiswa(),
);

function downloadCsv() {
  return (req, res) => {
    if (req.user.length >= 1 && req.user[0].dataValues.is_super_user === true) {
      models.siswa.findAll().then(results => {
        const csv = json2csvParser.parse(results);
        res.setHeader('Content-disposition',
            'attachment; filename=siswa.csv');
        res.set('Content-Type', 'text/csv');
        res.status(200).send(csv);
      }).catch(err => {
        res.json({
          status: 'failed',
          message: `error ${err}`,
        });
        res.send(err);
      });
    } else if (req.user.length < 1 ||
        req.user[0].dataValues.is_super_user === false) {
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

function getAllSiswa() {
  return (req, res) => {
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
      }).then(siswas => {
        if (siswas) {
          res.status(200).json({
            status: 'success',
            message: 'retrieve siswa',
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
      }).catch(err => {
        res.json({
          status: 'failed',
          message: `error${err}`,
        });
        res.send(err);
      });
    } else if (req.user.length < 1 ||
        req.user[0].dataValues.is_super_user === false) {
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
  return (req, res) => {
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
      }).then(siswas => {
        if (siswas) {
          res.status(200).json({
            status: 'success',
            message: 'retrieve siswa',
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
      }).catch(err => {
        res.send(err);
      });
    } else if (req.user.length < 1 ||
        req.user[0].dataValues.is_super_user === false) {
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
  return (req, res) => {
    if (req.user.length >= 1 && req.user[0].dataValues.is_super_user === true) {
      models.siswa.create(
          req.body.siswa,
          {
            include: [
              {
                model: models.sekolah,
              },
            ],
          },
      ).then(() => {
        res.status(200).json({
          status: 'success',
          message: 'new siswa added',
          data: true,
        });
      }).catch(err => {
        res.send(err);
      });
    } else if (req.user.length < 1 ||
        req.user[0].dataValues.is_super_user === false) {
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
  return (req, res) => {
    if (req.user.length >= 1 && req.user[0].dataValues.is_super_user === true) {
      models.siswa.findById(req.params.idSiswa).then(siswas => {
        if (siswas) {
          siswas.update(
              req.body.siswa,
          ).then(() => {
            res.status(200).json({
              status: 'success',
              message: 'siswa updated',
              data: true,
            });
          }).catch(err => {
            res.status(404).json({
              status: 'failed',
              message: `error${err}`,
            });
            res.send(err);
          });
        }
        else {
          res.status(404).json({
            status: 'failed',
            message: 'not found',
          });
        }
      }).catch(err => {
        res.send(err);
      });
    } else if (req.user.length < 1 ||
        req.user[0].dataValues.is_super_user === false) {
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
  return (req, res) => {
    if (req.user.length >= 1 && req.user[0].dataValues.is_super_user === true) {
      models.siswa.findById(req.params.id).then(siswas => {
        if (siswas) {
          siswas.update({
            is_active: !siswas.is_active,
          }).then(() => {
            res.status(200).json({
              status: 'success',
              message: 'siswa updated',
              data: true,
            });
          }).catch(err => {
            res.status(404).json({
              status: 'failed',
              message: `error${err}`,
            });
            res.send(err);
          });
        }
        else {
          res.status(404).json({
            status: 'failed',
            message: 'not found',
          });
        }
      }).catch(err => {
        res.send(err);
      });
    } else if (req.user.length < 1 ||
        req.user[0].dataValues.is_super_user === false) {
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
