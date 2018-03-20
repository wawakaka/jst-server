const express = require('express');
const passport = require('passport');
const router = express.Router();
const models = require('../models');

router.get(
    '/all',
    passport.authenticate('bearer', {session: false}),
    getSekolah()
);
router.post(
    '/create',
    passport.authenticate('bearer', {session: false}),
    createSekolah()
);
router.delete(
    '/:nama/delete',
    passport.authenticate('bearer', {session: false}),
    deleteSekolah()
);

function getSekolah() {
  return (req, res) => {
    if (req.user.length >= 1 && req.user[0].dataValues.is_super_user === true) {
      models.sekolah.findAll().then(results => {
        res.status(200).json({
          status: 'success',
          message: 'retrieve sekolah',
          data: results,
        });
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

function createSekolah() {
  return (req, res) => {
    if (req.user.length >= 1 && req.user[0].dataValues.is_super_user === true) {
      models.sekolah.create(
          req.body.sekolah
      ).then(() => {
        res.status(200).json({
          status: 'success',
          message: 'new sekolah added',
          data: true,
        });
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

function deleteSekolah() {
  return (req, res) => {
    if (req.user.length >= 1 && req.user[0].dataValues.is_super_user === true) {
      models.sekolah.destroy({
        where: {
          nama: req.params.nama,
        },
      }).then(bidang => {
        if (bidang) {
          res.status(200).json({
            status: 'success',
            message: 'sekolah deleted',
            data: true,
          });
        } else {
          res.status(404).json({
            status: 'failed',
            message: 'not found ',
          });
        }
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

module.exports = router;
