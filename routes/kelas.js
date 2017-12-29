var express = require('express');
var passport = require('passport');
var router = express.Router();
var models = require('../models');

router.get(
    '/all',
    passport.authenticate('bearer', {session: false}),
    getAllKelas()
);
router.get(
    '/:email',
    passport.authenticate('bearer', {session: false}),
    getKelas()
);
router.post(
    '/create',
    passport.authenticate('bearer', {session: false}),
    createNewKelas()
);
router.put(
    '/:id/update',
    passport.authenticate('bearer', {session: false}),
    updateKelas()
);

function getAllKelas() {
  return function(req, res) {
    if (req.user.length >= 1 && req.user[0].dataValues.is_super_user === true) {
      models.kelas.findAll({
        include: [
          {
            model: models.jadwal_kelas,
            as: 'jadwal_kelas',
          },
          {
            model: models.siswa,
            as: 'list_siswa',
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

function getKelas() {
  return function(req, res) {
    if (req.user.length >= 1) {
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
            as: 'list_siswa',
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

function createNewKelas() {
  return function(req, res) {
    if (req.user.length >= 1 && req.user[0].dataValues.is_super_user === true) {
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
                as: 'list_siswa',
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

function updateKelas() {
  return function(req, res) {
    if (req.user.length >= 1 && req.user[0].dataValues.is_super_user === true) {
      models.kelas.findById(req.params.id).then(function(kelas) {
        if (kelas) {
          kelas.update({
            is_active: !kelas.is_active,
          }).then(function() {
            res.status(200).json({
              status: 'success',
              message: 'kelas updated',
              data: true,
            });
          }).catch(function(err) {
            res.json({
              status: 'failed',
              message: 'error' + err,
            });
            res.send(err);
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

//todo changes all system error to common error message at release

module.exports = router;
