const express = require('express');
const passport = require('passport');
const router = express.Router();
const models = require('../models');
const Json2csvParser = require('json2csv').Parser;
const fields = ['nama'];
const json2csvParser = new Json2csvParser({fields});

router.get(
    '/all',
    passport.authenticate('bearer', {session: false}),
    getAllEvent(),
);
router.get(
    '/:id',
    passport.authenticate('bearer', {session: false}),
    getEvent(),
);
router.post(
    '/create',
    passport.authenticate('bearer', {session: false}),
    createEvent(),
);
router.put(
    '/:id/update',
    passport.authenticate('bearer', {session: false}),
    updateEvent(),
);
router.delete(
    '/:id/delete',
    passport.authenticate('bearer', {session: false}),
    deleteEvent(),
);

function getAllEvent() {
  return (req, res) => {
    if (req.user.length >= 1) {
      models.event.findAll({
        include: [
          {
            model: models.kelas,
            as: 'list_kelas',
          },
          {
            model: models.pengeluaran,
            as: 'list_pengeluaran',
          },
        ],
      }).then(results => {
        res.status(200).json({
          status: 'success',
          message: 'retrieve event',
          data: results,
        });
      }).catch(err => {
        res.json({
          status: 'failed',
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

function getEvent() {
  return (req, res) => {
    if (req.user.length >= 1) {
      models.event.find({
        where: {
          id: req.params.id,
        },
        include: [
          {
            model: models.kelas,
            as: 'list_kelas',
          },
          {
            model: models.pengeluaran,
            as: 'list_pengeluaran',
          },
        ],
      }).then(results => {
        res.status(200).json({
          status: 'success',
          message: 'retrieve event',
          data: results,
        });
      }).catch(err => {
        res.json({
          status: 'failed',
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

function createEvent() {
  return (req, res) => {
    if (req.user.length >= 1 && req.user[0].dataValues.is_super_user === true) {
      models.event.create(
          req.body.event,
          {
            include: [
              {
                model: models.kelas,
                as: 'list_kelas',
              },
              {
                model: models.pengeluaran,
                as: 'list_pengeluaran',
              },
            ],
          },
      ).then(() => {
        res.status(200).json({
          status: 'success',
          message: 'new event added',
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

function updateEvent() {
  return (req, res) => {
    if (req.user.length >= 1 && req.user[0].dataValues.is_super_user === true) {
      models.event.findById(req.params.id).then(event => {
        if (event) {
          event.update(req.body.event).then(() => {
            res.status(200).json({
              status: 'success',
              message: 'event updated',
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

function deleteEvent() {
  return (req, res) => {
    if (req.user.length >= 1 && req.user[0].dataValues.is_super_user === true) {
      models.event.destroy({
        where: {
          id: req.params.id,
        },
      }).then(bidang => {
        if (bidang) {
          res.status(200).json({
            status: 'success',
            message: 'event deleted',
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
