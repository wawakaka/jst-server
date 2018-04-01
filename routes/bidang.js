const express = require('express');
const passport = require('passport');
const router = express.Router();
const models = require('../models');
const Json2csvParser = require('json2csv').Parser;
const fields = ['nama'];
const json2csvParser = new Json2csvParser({fields});

router.get('/download',
    passport.authenticate('bearer', {session: false}),
    downloadCsv());
router.get(
    '/all',
    passport.authenticate('bearer', {session: false}),
    getBidang(),
);
router.post(
    '/create',
    passport.authenticate('bearer', {session: false}),
    createBidang(),
);
router.delete(
    '/:nama/delete',
    passport.authenticate('bearer', {session: false}),
    deleteBidang(),
);

function downloadCsv() {
  return (req, res) => {
    if (req.user.length >= 1 && req.user[0].dataValues.is_super_user === true) {
      models.bidang.findAll().then(results => {
        const csv = json2csvParser.parse(results);
        res.setHeader('Content-disposition',
            'attachment; filename=bidang.csv');
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

function getBidang() {
  return (req, res) => {
    if (req.user.length >= 1 && req.user[0].dataValues.is_super_user === true) {
      models.bidang.findAll().then(results => {
        res.status(200).json({
          status: 'success',
          message: 'retrieve bidang',
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

function createBidang() {
  return (req, res) => {
    if (req.user.length >= 1 && req.user[0].dataValues.is_super_user === true) {
      models.bidang.create(
          req.body.bidang,
      ).then(() => {
        res.status(200).json({
          status: 'success',
          message: 'new bidang added',
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

function deleteBidang() {
  return (req, res) => {
    if (req.user.length >= 1 && req.user[0].dataValues.is_super_user === true) {
      models.bidang.destroy({
        where: {
          nama: req.params.nama,
        },
      }).then(bidang => {
        if (bidang) {
          res.status(200).json({
            status: 'success',
            message: 'bidang deleted',
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
