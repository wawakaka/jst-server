const express = require('express');
const passport = require('passport');
const router = express.Router();
const models = require('../models');

router.get(
    '/all',
    passport.authenticate('bearer', {session: false}),
    getAllKelas(),
);
router.get(
    '/:email',
    passport.authenticate('bearer', {session: false}),
    getKelas(),
);
router.get(
    '/event/:event_id',
    passport.authenticate('bearer', {session: false}),
    getKelasByEvent(),
);
router.post(
    '/create',
    passport.authenticate('bearer', {session: false}),
    createNewKelas(),
);
router.put(
    '/:id/update',
    passport.authenticate('bearer', {session: false}),
    updateKelas(),
);
router.put(
    '/:id/updatestatus',
    passport.authenticate('bearer', {session: false}),
    updateStatusKelas(),
);

function getAllKelas() {
  return (req, res) => {
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
      }).then(kelas => {
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

function getKelas() {
  return (req, res) => {
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
      }).then(kelas => {
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

function getKelasByEvent() {
  return (req, res) => {
    if (req.user.length >= 1) {
      models.kelas.findAll({
        where: {
          event_id: req.params.event_id,
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
      }).then(kelas => {
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

function createNewKelas() {
  return (req, res) => {
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
          },
      ).then(() => {
        res.status(200).json({
          status: 'success',
          message: 'new kelas added',
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

function updateKelas() {
  return (req, res) => {
    if (req.user.length >= 1 && req.user[0].dataValues.is_super_user === true) {
      models.kelas.findById(req.params.id).then(kelas => {
        if (kelas) {
          kelas.update(req.body.kelas).then(() => {
            res.status(200).json({
              status: 'success',
              message: 'kelas updated',
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

function updateStatusKelas() {
  return (req, res) => {
    if (req.user.length >= 1 && req.user[0].dataValues.is_super_user === true) {
      models.kelas.findById(req.params.id).then(kelas => {
        if (kelas) {
          kelas.update({
            is_active: !kelas.is_active,
          }).then(() => {
            res.status(200).json({
              status: 'success',
              message: 'kelas status updated',
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

//todo changes all system error to common error message at release

module.exports = router;
