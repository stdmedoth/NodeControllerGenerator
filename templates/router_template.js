const connection = require('../../database/connection');
const express = require('express');
const router = express.Router();

//{{Controller}} routes
const {{Controller}}Controller = require('../../controllers/{{controller}}/{{controller}}');
router.post( '/{{Controller}}/add/', {{Controller}}Controller.add);
router.get( '/{{Controller}}/get/', {{Controller}}Controller.get);
router.post( '/{{Controller}}/delete/', {{Controller}}Controller.delete);
router.post( '/{{Controller}}/update/', {{Controller}}Controller.update);

module.exports = router;
