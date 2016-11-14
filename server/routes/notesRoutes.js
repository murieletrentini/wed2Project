var express = require('express');
var router = express.Router();
var notes = require('../controller/notesController.js');
var cookies = require('../util/cookies.js');

router.get("/", notes.showIndex);
router.post("/", notes.saveNote);
router.post("/addNewNote", notes.addNewNote);
router.get("/getNotes", notes.getNotes);
router.post("/editNote", notes.addNewNote);
router.get("/showFinished", notes.showFinished);
router.get("/changeStyle", cookies.changeStyle);

module.exports = router;
