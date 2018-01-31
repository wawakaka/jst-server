var express = require('express');
var passport = require('passport');
var router = express.Router();
var models = require('../models');

router.get('/:id',
    passport.authenticate('bearer', {session: false}),
    getDetailPengeluaran()
);
router.post('/add',
    passport.authenticate('bearer', {session: false}),
    createDetailPengeluaran()
);
router.put('/:id/update',
    passport.authenticate('bearer', {session: false}),
    updateDetailPengeluaran()
);
router.delete('/:id/delete',
    passport.authenticate('bearer', {session: false}),
    deleteDetailPengeluaran()
);

function getDetailPengeluaran() {
  return function(req, res) {
    if (req.user.length >= 1) {
      models.detail_pengeluaran.findAll({
        where: {
          id: req.params.id,
        },
      }).then(function(data) {
        if (data) {
          res.status(200).json({
            status: 'success',
            message: 'retrieve detail pengeluaran',
            data: data,
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
function createDetailPengeluaran() {
  return function(req, res) {
    if (req.user.length >= 1) {
      models.detail_pengeluaran.create(
          req.body.detail_pengeluaran
      ).then(function() {
        res.status(200).json({
          status: 'success',
          message: 'new detail pengeluaran added',
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

function updateDetailPengeluaran() {
  return function(req, res) {
    if (req.user.length >= 1) {
      models.detail_pengeluaran.findById(req.params.id).
          then(function(data) {
            if (data) {
              data.update(
                  req.body.detail_pengeluaran
              ).then(function() {
                res.status(200).json({
                  status: 'success',
                  message: 'detail pengeluaran updated',
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
          }).
          catch(function(err) {
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

function deleteDetailPengeluaran() {
  return function(req, res) {
    if (req.user.length >= 1) {
      models.detail_pengeluaran.destroy({
        where: {
          id: req.params.id,
        },
      }).then(function() {
        res.status(200).json({
          status: 'success',
          message: 'detail pengeluaran deleted',
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
