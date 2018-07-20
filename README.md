# JST
<p align="center">
  <a href="https://travis-ci.org/wawakaka/jst-server"><img src="https://travis-ci.org/wawakaka/jst-server.svg?branch=master"></a>
  <a href="https://david-dm.org/wawakaka/jst-server" title="dependencies status"><img src="https://david-dm.org/wawakaka/jst-server/status.svg"/></a>
  <a href="https://david-dm.org/wawakaka/jst-server?type=dev" title="devDependencies status"><img src="https://david-dm.org/wawakaka/jst-server/dev-status.svg"/></a>
</p>

# Before you run this app

- You need to have Node js installed

- You need to have postgresql installed otherwise you need to change file `/models/index.js` to change to other database

- You need to add this to your environment variables</br>
  `DB="your database name"`</br>
  `DB_USER="your database username"`</br>
  `DB_PASS="your database password"`</br>
  `DB_HOST="your database address"`</br>

- Run `npm install` to get all dependency

- Run 'npm run start' to start this app

- To run this app as a service you need to install PM2</br>
  with this command `npm install pm2 -g`</br>
  and run this command `pm2 start bin/www`
