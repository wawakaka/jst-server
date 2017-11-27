var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise,
};
//todo rapihin nih!!!
var pgp = require('pg-promise')(options);
var con = {
  host: 'ec2-54-197-253-210.compute-1.amazonaws.com',
  port: 5432,
  database: 'd4b3b7r1a0rbjm',
  user: 'tkzlhwzjgrjtfi',
  password: 'a826b9b75487e7fc1a47030ae09fad6fd78cb6a78f2ecdfd830cf1eec4e30f9a',
  ssl: true,
};
var db = pgp(con);

// add query functions

function addNewPresensi() {
  return function(req, res) {
    db.any(
        'BEGIN;' +
        'DELETE FROM "presensi" WHERE "jadwal_kela_id" = ' +
        req.body.jadwal_kela_id + ';' +
        'INSERT INTO "presensi" ( "jadwal_kela_id", "siswa_id") VALUES ( ' +
        req.body.jadwal_kela_id + ',\'' + req.body.siswa_id + '\' );' +
        'COMMIT;'
    ).then(function() {
      res.status(200).json({
        status: 'success',
        message: 'success saving presensi',
        data: true,
      });
    }).catch(function(err) {
      res.send(err);
    });
  };
}

module.exports = {
  addNewPresensi: addNewPresensi,
};