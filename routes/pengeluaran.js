const express = require('express');
const passport = require('passport');
const router = express.Router();
const models = require('../models');

router.get('/all',
    passport.authenticate('bearer', {session: false}),
    getAllPengeluaran()
);
router.get('/:id',
    passport.authenticate('bearer', {session: false}),
    getPengeluaran()
);
router.post('/add',
    passport.authenticate('bearer', {session: false}),
    createPengeluaran()
);
router.put('/:id/update',
    passport.authenticate('bearer', {session: false}),
    updatePengeluaran()
);
router.delete('/:id/delete',
    passport.authenticate('bearer', {session: false}),
    deletePengeluaran()
);

function getAllPengeluaran() {
  return (req, res) => {
    if (req.user.length >= 1 && req.user[0].dataValues.is_super_user === true) {
      models.pengeluaran.findAll().then(pengeluaran => {
        if (pengeluaran) {
          res.status(200).json({
            status: 'success',
            message: 'retrieve pengeluaran',
            data: pengeluaran,
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

function getPengeluaran() {
  return (req, res) => {
    if (req.user.length >= 1) {
      models.pengeluaran.findAll({
        where: {
          event_id: req.params.id,
        },
      }).then(pengeluaran => {
        if (pengeluaran) {
          res.status(200).json({
            status: 'success',
            message: 'retrieve pengeluaran',
            data: pengeluaran,
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

//todo valid format datetime 2014-01-01T10:00:00+07:00
function createPengeluaran() {
  return (req, res) => {
    if (req.user.length >= 1) {
      models.pengeluaran.create(
          req.body.pengeluaran
      ).then(() => {
        res.status(200).json({
          status: 'success',
          message: 'new pengeluaran added',
          data: true,
        });
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

function updatePengeluaran() {
  return (req, res) => {
    if (req.user.length >= 1 && req.user[0].dataValues.is_super_user === true) {
      models.pengeluaran.findById(req.params.id).then(pengeluaran => {
        if (pengeluaran) {
          pengeluaran.update(req.body.pengeluaran).then(() => {
            res.status(200).json({
              status: 'success',
              message: 'pengeluaran updated',
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

function deletePengeluaran() {
  return (req, res) => {
    if (req.user.length >= 1) {
      models.pengeluaran.destroy({
        where: {
          id: req.params.id,
        },
      }).then(() => {
        res.status(200).json({
          status: 'success',
          message: 'pengeluaran deleted',
          data: true,
        });
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

//todo changes all system error to common error message at release

module.exports = router;
