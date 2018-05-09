const express = require('express');
const passport = require('passport');
const router = express.Router();
const models = require('../models');
const Json2csvParser = require('json2csv').Parser;
const fields = ['jadwal_kelas_id', 'siswa_id'];
const json2csvParser = new Json2csvParser({fields});

router.get(
    '/all',
    passport.authenticate('bearer', {session: false}),
    getAllBidangUser(),
);
router.get(
    '/:email',
    passport.authenticate('bearer', {session: false}),
    getBidangUser(),
);
router.post(
    '/create',
    passport.authenticate('bearer', {session: false}),
    createBidangUser(),
);
router.post(
    '/:id/update',
    passport.authenticate('bearer', {session: false}),
    updateBidangUser(),
);
router.delete(
    '/:id/delete',
    passport.authenticate('bearer', {session: false}),
    deleteBidangUser(),
);

function getAllBidangUser() {
  return (req, res) => {
    if (req.user.length >= 1 && req.user[0].dataValues.is_super_user === true) {
      models.bidang_user.findAll().then(results => {
        if (results) {
          res.status(200).json({
            status: 'success',
            message: 'retrieve bidang_user',
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

function getBidangUser() {
  return (req, res) => {
    if (req.user.length >= 1) {
      models.bidang_user.findAll({
        where: {
          user_email: req.params.email,
        },
      }).then(results => {
        if (results) {
          res.status(200).json({
            status: 'success',
            message: 'retrieve bidang_user',
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

function createBidangUser() {
  return (req, res) => {
    if (req.user.length >= 1 && req.user[0].dataValues.is_super_user === true) {
      models.bidang_user.create(
          req.body.bidang_user,
      ).then(() => {
        res.status(200).json({
          status: 'success',
          message: 'new bidang_user added',
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

function updateBidangUser() {
  return (req, res) => {
    if (req.user.length >= 1 && req.user[0].dataValues.is_super_user === true) {
      models.bidang_user.findAll({
        where: {
          id: req.params.id,
        },
      }).then(bu => {
        if (bu) {
          bu.update(req.body.bidang_user).then(() => {
            res.status(200).json({
              status: 'success',
              message: 'bidang_user updated',
              data: true,
            });
          }).catch(err => {
            res.json({
              status: 'failed',
              message: `error${err}`,
            });
            res.send(err);
          });
        } else if (res.status(404)) {
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

function deleteBidangUser() {
  return (req, res) => {
    if (req.user.length >= 1) {
      models.bidang_user.destroy({
        where: {
          id: req.params.id,
        },
      }).then(() => {
        res.status(200).json({
          status: 'success',
          message: 'bidang_user deleted',
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

module.exports = router;
