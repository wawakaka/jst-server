const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');
const Strategy = require('passport-http-bearer').Strategy;
const models = require('./models');
const index = require('./routes/index');
const user = require('./routes/user');
const bidang = require('./routes/bidang');
const siswa = require('./routes/siswa');
const kelas = require('./routes/kelas');
const tesHarian = require('./routes/tesharian');
const hasilTesHarian = require('./routes/hasiltesharian');
const presensi = require('./routes/presensi');
const jadwalKelas = require('./routes/jadwalkelas');
const sekolah = require('./routes/sekolah');
const kegiatan = require('./routes/kegiatan');
const pengeluaran = require('./routes/pengeluaran');

// Configure the Bearer strategy for use by Passport.
//
// The Bearer strategy requires a `verify` function which receives the
// credentials (`token`) contained in the request.  The function must invoke
// `cb` with a user object, which will be set at `req.user` in route handlers
// after authentication.
passport.use(new Strategy(
    (token, cb) => {
      models.user.findByToken(token, (err, user) => {
        if (err) return cb(err);
        if (!user) return cb(null, false);
        return cb(null, user);
      });
    }),
);

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/user', user);
app.use('/bidang', bidang);
app.use('/siswa', siswa);
app.use('/kelas', kelas);
app.use('/tesharian', tesHarian);
app.use('/hasiltesharian', hasilTesHarian);
app.use('/presensi', presensi);
app.use('/jadwalkelas', jadwalKelas);
app.use('/sekolah', sekolah);
app.use('/kegiatan', kegiatan);
app.use('/pengeluaran', pengeluaran);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
