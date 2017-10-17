var express = require('express');
var router = express.Router();
var models = require('../models');

/* GET users listing. */
// router.get('/', function (req, res, next) {
//   res.send('respond with a resource');
// });

router.get('/all', getAllUser());

function getAllUser() {
  return function(req, res) {
    models.User.all({
      include: [
        {
          model: models.Kelas,
          as: 'kelas',
        }],
    }).then(function(users) {
      res.status(200).send(users);
    }).catch(function(err) {
      res.send(err);
    });
  };
}

// router.get('/user/', function (req, res) {
//     models
//         .User
//         .all({
//             include: [{
//                 model: models.Kelas,
//                 as: 'kelas'
//             }]
//         })
//         .then(function (users) {
//             res.status(200).send(users);
//         })
//         .catch(function (err) {
//             res.send(err);
//         });
// });

module.exports = router;
