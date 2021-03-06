const express = require('express');
const passport = require('passport');
const router = express.Router();
const models = require('../models');
const Json2csvParser = require('json2csv').Parser;
const fields = ['nama'];
const json2csvParser = new Json2csvParser({fields});

router.get('/:id/download',
    downloadCsv()
);
router.get(
    '/:id',
    passport.authenticate('bearer', {session: false}),
    getPresensi(),
);
router.post(
    '/:id/update',
    passport.authenticate('bearer', {session: false}),
    updatePresensi(),
);

function downloadCsv() {
  return (req, res) => {
    models.presensi.findAll({
      where: {
        jadwal_kela_id: req.params.id,
      },
    }).then(results => {
      const csv = json2csvParser.parse(results);
      res.setHeader('Content-disposition',
          'attachment; filename=presensi.csv');
      res.set('Content-Type', 'text/csv');
      res.status(200).send(csv);
    }).catch(err => {
      res.json({
        status: 'failed',
        message: `error ${err}`,
      });
      res.send(err);
    });
  };
}

function getPresensi() {
  return (req, res) => {
    if (req.user.length >= 1) {
      models.presensi.findAll({
        where: {
          jadwal_kela_id: req.params.id,
        },
      }).then(results => {
        if (results) {
          res.status(200).json({
            status: 'success',
            message: 'retrieve presensi',
            data: results,
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

function updatePresensi() {
  return (req, res) => {
    if (req.user.length >= 1) {
      models.presensi.destroy({
        where: {
          jadwal_kela_id: req.params.id,
        },
      }).then(result1 => {
        if (result1 || res.status(404)) {
          models.presensi.bulkCreate(
              req.body.presensi,
          ).then(result => {
            if (res.status(200)) {
              res.status(200).json({
                status: 'success',
                message: 'presensi updated',
                data: true,
              });
            }
          }).catch(err => {
            res.json({
              status: 'failed to add',
              message: `error ${err}`,
            });
            res.send(err);
          });
        }
      }).catch(err => {
        res.json({
          status: 'failed to delete',
          message: `error ${err}`,
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

module.exports = router;
