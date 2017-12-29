var express = require('express');
var passport = require('passport');
var router = express.Router();
var models = require('../models');

router.get('/:kelas',
    passport.authenticate('bearer', {session: false}),
    getJadwal()
);
router.post('/add',
    passport.authenticate('bearer', {session: false}),
    createJadwal()
);
router.delete('/:tanggal/delete',
    passport.authenticate('bearer', {session: false}),
    deleteJadwal()
);

function getJadwal() {
  return function(req, res) {
    if (req.user.length >= 1) {
      models.jadwal_kelas.findAll({
        where: {
          kela_id: req.params.kelas,
        },
      }).then(function(jadwal) {
        if (jadwal) {
          res.status(200).json({
            status: 'success',
            message: 'retrieve jadwal',
            data: jadwal,
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

//todo valid format datetime 2014-01-01T10:00:00+07:00
function createJadwal() {
  return function(req, res) {
    if (req.user.length >= 1 && req.user[0].dataValues.is_super_user === true) {
      models.jadwal_kelas.create(
          req.body.jadwal_kelas
      ).then(function(jadwal) {
        res.status(200).json({
          status: 'success',
          message: 'new jadwal added',
          data: jadwal,
        });
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

function deleteJadwal() {
  return function(req, res) {
    if (req.user.length >= 1 && req.user[0].dataValues.is_super_user === true) {
      models.jadwal_kelas.destroy({
        where: {
          tanggal: req.params.tanggal,
        },
      }).then(function() {
        res.status(200).json({
          status: 'success',
          message: 'jadwal deleted',
          data: true,
        });
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

//todo changes all system error to common error message at release

module.exports = router;
