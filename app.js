const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routes');
const app = express();
const path = require('path');
const nunjucks = require('nunjucks');
const db = require('./models/database')
//let env = nunjucks.configure('views', { noCache: true });

app.set('view engine', 'html');
app.engine('html', nunjucks.render);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', route)

db.sync({force: false}).then(()=>{app.listen(3000, function () {
  console.log('puerto 3000 conectado!');
})});

module.exports = app;
