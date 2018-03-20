const express = require('express');
const passport = require('passport');
const router = express.Router();
const models = require('../models');

router.get('/:kelas',
    passport.authenticate('bearer', {session: false}),
    getAllJadwal()
);
router.get('/:kelas',
    passport.authenticate('bearer', {session: false}),
    getJadwal()
);
router.post('/add',
    passport.authenticate('bearer', {session: false}),
    createJadwal()
);
router.put('/:id/update',
    passport.authenticate('bearer', {session: false}),
    updateJadwal()
);
router.delete('/:id/delete',
    passport.authenticate('bearer', {session: false}),
    deleteJadwal()
);
router.get('/user/:kelasid',
    passport.authenticate('bearer', {session: false}),
    getJadwalKelasUser()
);

function getAllJadwal() {
  return (req, res) => {
    if (req.user.length >= 1) {
      models.jadwal_kelas.findAll().then(jadwal => {
        if (jadwal) {
          res.status(200).json({
            status: 'success',
            message: 'retrieve jadwal',
            data: jadwal,
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

function getJadwal() {
  return (req, res) => {
    if (req.user.length >= 1) {
      models.jadwal_kelas.findAll({
        where: {
          kela_id: req.params.kelas,
        },
      }).then(jadwal => {
        if (jadwal) {
          res.status(200).json({
            status: 'success',
            message: 'retrieve jadwal',
            data: jadwal,
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
function createJadwal() {
  return (req, res) => {
    if (req.user.length >= 1 && req.user[0].dataValues.is_super_user === true) {
      models.jadwal_kelas.create(
          req.body.jadwal_kelas
      ).then(() => {
        res.status(200).json({
          status: 'success',
          message: 'new jadwal added',
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

function updateJadwal() {
  return (req, res) => {
    if (req.user.length >= 1 && req.user[0].dataValues.is_super_user === true) {
      models.jadwal_kelas.findById(req.params.id).then(jadwal => {
        if (jadwal) {
          jadwal.update(req.body.jadwal_kelas).then(() => {
            res.status(200).json({
              status: 'success',
              message: 'jadwal_kelas updated',
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

function deleteJadwal() {
  return (req, res) => {
    if (req.user.length >= 1 && req.user[0].dataValues.is_super_user === true) {
      models.jadwal_kelas.destroy({
        where: {
          id: req.params.id,
        },
      }).then(() => {
        res.status(200).json({
          status: 'success',
          message: 'jadwal deleted',
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

function getJadwalKelasUser() {
  return (req, res) => {
    if (req.user.length >= 1) {
      models.kelas.find({
        where: {
          id: req.params.kelasid,
        },
      }).then(kelas => {
        console.log(kelas);
        if (kelas) {
          models.user.find({
            where: {
              email: kelas.user_email,
            },
          }).then(user => {
            res.status(200).json({
              status: 'success',
              message: 'retrieve user',
              data: user,
            });
          });
        }
        else if (res.status(404)) {
          res.status(404).json({
            status: 'failed',
            message: 'not found',
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

//todo changes all system error to common error message at release

module.exports = router;
