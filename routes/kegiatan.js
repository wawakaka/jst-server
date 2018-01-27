var express = require('express');
var passport = require('passport');
var router = express.Router();
var models = require('../models');

router.get('/:jadwal_kela_id',
    passport.authenticate('bearer', {session: false}),
    getKegiatan()
);
router.post('/add',
    passport.authenticate('bearer', {session: false}),
    createKegiatan()
);
router.put('/:id/update',
    passport.authenticate('bearer', {session: false}),
    updateKegiatan()
);
router.delete('/:id/delete',
    passport.authenticate('bearer', {session: false}),
    deleteKegiatan()
);

function getKegiatan() {
  return function(req, res) {
    if (req.user.length >= 1) {
      models.kegiatan.findAll({
        where: {
          jadwal_kela_id: req.params.jadwal_kela_id,
        },
      }).then(function(kegiatan) {
        if (kegiatan) {
          res.status(200).json({
            status: 'success',
            message: 'retrieve kegiatan',
            data: kegiatan,
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
function createKegiatan() {
  return function(req, res) {
    if (req.user.length >= 1) {
      models.kegiatan.create(
          req.body.kegiatan
      ).then(function() {
        res.status(200).json({
          status: 'success',
          message: 'new kegiatan added',
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

function updateKegiatan() {
  return function(req, res) {
    if (req.user.length >= 1) {
      models.kegiatan.findById(req.params.id).then(function(kegiatan) {
        if (kegiatan) {
          kegiatan.update(req.body.kegiatan).then(function() {
            res.status(200).json({
              status: 'success',
              message: 'kegiatan updated',
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

function deleteKegiatan() {
  return function(req, res) {
    if (req.user.length >= 1) {
      models.kegiatan.destroy({
        where: {
          id: req.params.id,
        },
      }).then(function() {
        res.status(200).json({
          status: 'success',
          message: 'kegiatan deleted',
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
