const connection = require('../../database/connection');
const express = require('express');
const router = express.Router();

//{{Controller}} routes
const {{Controller}}Controller = require('../../controllers/{{controller}}/{{controller}}');
router.post( '/{{Controller}}/add/', {{Controller}}Controller.add);
router.get( '/{{Controller}}/get/', {{Controller}}Controller.get);

module.exports = router;
