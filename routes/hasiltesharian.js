const express = require('express');
const passport = require('passport');
const router = express.Router();
const models = require('../models');

router.get('/:id',
    passport.authenticate('bearer', {session: false}),
    getHasilTesHarian(),
);
router.put('/:id/updatebulk',
    passport.authenticate('bearer', {session: false}),
    updateHasilTesHarian(),
);
router.put('/:id/update',
    passport.authenticate('bearer', {session: false}),
    updateSingleHasilTesHarian(),
);

function getHasilTesHarian() {
  return (req, res) => {
    if (req.user.length >= 1) {
      models.hasil_tes_harian.findAll({
        where: {
          tes_harian_id: req.params.id,
        },
      }).then(results => {
        if (results) {
          res.status(200).json({
            status: 'success',
            message: 'retrieve hasil_tes_harian',
            data: results,
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

function updateHasilTesHarian() {
  return (req, res) => {
    if (req.user.length >= 1) {
      models.hasil_tes_harian.destroy({
        where: {
          tes_harian_id: req.params.id,
        },
      }).then(results => {
        if (results || res.status(404)) {
          models.hasil_tes_harian.bulkCreate(
              req.body.hasil_tes_harian,
          ).then(() => {
            if (res.status(200)) {
              res.status(200).json({
                status: 'success',
                message: 'hasil tes harian updated',
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

function updateSingleHasilTesHarian() {
  return (req, res) => {
    if (req.user.length >= 1) {
      models.hasil_tes_harian.findById(req.params.id).then(results => {
        if (results) {
          results.update(
              req.body.hasil_tes_harian,
          ).then(() => {
            res.status(200).json({
              status: 'success',
              message: 'hasil tes harian updated',
              data: true,
            });
          }).catch(err => {
            res.status(404).json({
              status: 'failed',
              message: `error${err}`,
            });
            res.send(err);
          });
        }
        else {
          res.status(404).json({
            status: 'failed',
            message: 'not found',
          });
        }
      }).catch(err => {
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
