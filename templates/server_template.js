const express = require('express');
const cors = require('cors');
const config = require('./config.json');
const routes = require('./routes');

const app = express();
app.use(cors());
app.use(express.json());

for(let route in routes){
  app.use(routes[route]);
};

console.log("ouvindo em " + config.porta);
app.listen(config.porta);

module.exports = app;
