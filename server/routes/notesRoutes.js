var express = require('express');
var router = express.Router();
var notes = require('../controller/notesController.js');

router.get("/", notes.showIndex);
router.post("/addNewNote", notes.addNewNote);
router.post("/getNotes", notes.getNotes);


module.exports = router;
