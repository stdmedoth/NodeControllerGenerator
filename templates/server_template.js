const express = require('express');
const cors = require('cors');
const config = require('./config.json');

{{required routes}}

const app = express();
app.use(cors());
app.use(express.json());

{{used routes}}

console.log("ouvindo em " + config.porta);
app.listen(config.porta);

module.exports = app;
