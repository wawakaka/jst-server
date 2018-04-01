const express = require('express');
const passport = require('passport');
const router = express.Router();
const models = require('../models');
const Json2csvParser = require('json2csv').Parser;
const fields = ['id', 'sesi_mulai', 'sesi_selesai', 'materi', 'keterangan'];
const json2csvParser = new Json2csvParser({fields});

router.get('/:jadwal_kela_id/download',
    passport.authenticate('bearer', {session: false}),
    downloadCsv());
router.get('/:jadwal_kela_id',
    passport.authenticate('bearer', {session: false}),
    getKegiatan(),
);
router.post('/add',
    passport.authenticate('bearer', {session: false}),
    createKegiatan(),
);
router.put('/:id/update',
    passport.authenticate('bearer', {session: false}),
    updateKegiatan(),
);
router.delete('/:id/delete',
    passport.authenticate('bearer', {session: false}),
    deleteKegiatan(),
);

function downloadCsv() {
  return (req, res) => {
    if (req.user.length >= 1 && req.user[0].dataValues.is_super_user === true) {
      models.kegiatan.findAll({
        where: {
          jadwal_kela_id: req.params.jadwal_kela_id,
        },
      }).then(results => {
        const csv = json2csvParser.parse(results);
        res.setHeader('Content-disposition',
            'attachment; filename=kegiatan.csv');
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

function getKegiatan() {
  return (req, res) => {
    if (req.user.length >= 1) {
      models.kegiatan.findAll({
        where: {
          jadwal_kela_id: req.params.jadwal_kela_id,
        },
      }).then(kegiatan => {
        if (kegiatan) {
          res.status(200).json({
            status: 'success',
            message: 'retrieve kegiatan',
            data: kegiatan,
          });
        }
        else if (res.status(404)) {
          res.status(404).json({
            status: 'failed',
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

//todo valid format datetime 2014-01-01T10:00:00+07:00
function createKegiatan() {
  return (req, res) => {
    if (req.user.length >= 1) {
      models.kegiatan.create(
          req.body.kegiatan,
      ).then(() => {
        res.status(200).json({
          status: 'success',
          message: 'new kegiatan added',
          data: true,
        });
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

function updateKegiatan() {
  return (req, res) => {
    if (req.user.length >= 1) {
      models.kegiatan.findById(req.params.id).then(kegiatan => {
        if (kegiatan) {
          kegiatan.update(req.body.kegiatan).then(() => {
            res.status(200).json({
              status: 'success',
              message: 'kegiatan updated',
              data: true,
            });
          }).catch(err => {
            res.json({
              status: 'failed',
              message: `error${err}`,
            });
            res.send(err);
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

function deleteKegiatan() {
  return (req, res) => {
    if (req.user.length >= 1) {
      models.kegiatan.destroy({
        where: {
          id: req.params.id,
        },
      }).then(() => {
        res.status(200).json({
          status: 'success',
          message: 'kegiatan deleted',
          data: true,
        });
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

//todo changes all system error to common error message at release

module.exports = router;
